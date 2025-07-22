import React, { useState } from "react";
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

const mockUser = {
  isLoggedIn: true,
  name: "Fariha",
  avatar: "https://i.pravatar.cc/150?img=5",
};

const CommentBox = () => {
  const { t, i18n } = useTranslation();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);

  React.useEffect(() => {
    const initialComments = [
      {
        id: 1,
        name: "Ayaan",
        avatar: "https://i.pravatar.cc/150?img=1",
        text: t("Comments.initial.0"),
        date: "2 hours ago",
      },
      {
        id: 2,
        name: "Sara",
        avatar: "https://i.pravatar.cc/150?img=12",
        text: t("Comments.initial.1"),
        date: "1 hour ago",
      },
      {
        id: 3,
        name: "Ali",
        avatar: "https://i.pravatar.cc/150?img=8",
        text: t("Comments.initial.2"),
        date: t("Comments.justNow"),
      },
    ];

    setComments(initialComments);
  }, [i18n.language, t]); 

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      name: mockUser.name,
      avatar: mockUser.avatar,
      text: newComment,
      date: t("Comments.justNow"),
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const displayedComments = showAll ? comments : comments.slice(0, 2);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        {t("Comments.title", { count: comments.length })}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {mockUser.isLoggedIn ? (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="flex-start"
          mb={1}
        >
          <Avatar src={mockUser.avatar} />
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
        {displayedComments.map((comment) => (
          <Paper key={comment.id} elevation={2} sx={{ p: 1, borderRadius: 2 }}>
            <Stack direction="row" spacing={2}>
              <Avatar src={comment.avatar} />
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{comment.name}</Typography>
                <Typography
                  sx={{ fontSize: "0.8rem", color: "text.secondary", mb: 0.5 }}
                >
                  {comment.date}
                </Typography>
                <Typography>{comment.text}</Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {comments.length > 2 && (
        <Button
          onClick={() => setShowAll((prev) => !prev)}
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
          {showAll ? t("Comments.seeLess") : t("Comments.seeMore")}
        </Button>
      )}
    </Box>
  );
};

export default CommentBox;
