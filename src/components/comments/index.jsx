import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePostCommentMutation } from "../../services/feed";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { logout } from "../../store/slices/auth";

dayjs.extend(relativeTime);
const mockUser = {
  isLoggedIn: true,
  name: "Fariha",
  avatar: "https://i.pravatar.cc/150?img=5",
};

const CommentBox = ({ data, total, hasMore, handleMore }) => {
  const { t, i18n } = useTranslation();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [commentData, { isLoading }] = usePostCommentMutation();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data?.length > 0) {
      setComments((prevComments) => {
        const existingIds = new Set(prevComments.map((comment) => comment.id));
        const newComments = data.filter(
          (comment) => !existingIds.has(comment.id)
        );
        return [...prevComments, ...newComments];
      });
    } else {
      setComments([]);
    }
  }, [data]);

  useEffect(() => {
    setCount(total);
  }, [total]);

  // useEffect(() => {
  //   console.log(comments);
  // }, [comments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const comment = {
        articleId: pathname?.slice(1),
        content: newComment,
      };

      const response = await commentData(comment).unwrap();
      toast.success("Comment Added Successfully");
      const myComment = {
        id: response?.data?.comment?.id,
        name: response?.data?.comment?.user?.name || "User",
        avatar: response?.data?.comment?.user?.image,
        text: response?.data?.comment?.content,
        date: dayjs(response?.data?.comment?.createdAt).fromNow(),
      };
      setComments([myComment, ...comments]);
      setCount(count + 1);
      setNewComment("");
      console.log("Comment added:", response);
    } catch (error) {
      console.error("Failed to post comment:", error?.data?.message);
      if (error?.data?.message === "You are banned from commenting") {
        toast.error(error?.data?.message);
        dispatch(logout());
        setNewComment("");
      }
    }
  };

  // const displayedComments = showAll ? comments : comments.slice(0, 2);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        {t("Comments.title", { count })}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {user ? (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="flex-start"
          mb={1}
        >
          <Avatar src={user?.image} alt="User" />
          <TextField
            variant="outlined"
            fullWidth
            multiline
            minRows={4}
            placeholder={t("Comments.placeholder")}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              bgcolor: "#f9f9f9",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                padding: "10px",
              },
            }}
          />
          <Button
            onClick={handleAddComment}
            variant="gradient"
            sx={{
              my: 1,
              fontSize: "12px",
              width: { xs: "70px", sm: "80px" },
              height: { xs: "35px", sm: "34px" },
            }}
            loading={isLoading}
          >
            {t("Comments.post")}
          </Button>
        </Stack>
      ) : (
        <Typography color="textSecondary" mb={3}>
          🔒 {t("Comments.loginToComment")}
        </Typography>
      )}

      <Stack>
        {comments?.map((comment) => (
          <Paper key={comment?.id} elevation={2} sx={{ p: 1, borderRadius: 2 }}>
            <Stack direction="row" spacing={2}>
              <Avatar src={comment?.avatar} />
              <Box>
                <Typography sx={{ fontWeight: 600 }}>
                  {comment?.name}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.8rem", color: "text.secondary", mb: 0.5 }}
                >
                  {comment?.date}
                </Typography>
                <Typography>{comment?.text}</Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {hasMore && (
        <Button
          onClick={handleMore}
          disableRipple
          sx={{
            mt: 2,
            color: "#0061ff",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.9rem",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "white",
              color: "#0061ff",
              boxShadow: "none",
            },
            "&:focus": {
              outline: "none",
            },
          }}
        >
          {/* {showAll ? t("Comments.seeLess") : t("Comments.seeMore")} */}
          {hasMore && t("Comments.seeMore")}
        </Button>
      )}
    </Box>
  );
};

export default CommentBox;
