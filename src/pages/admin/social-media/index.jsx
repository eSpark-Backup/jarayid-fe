import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "../../../assets/icons/add-icon.svg";
import DownArrow from "../../../assets/icons/arrow-down.svg";
import UpArrow from "../../../assets/icons/arrow-up.svg";
import CheckOff from "../../../assets/icons/check-off.svg";
import CheckOn from "../../../assets/icons/check-on.svg";
import CategoryDropdown from "../../../components/category-tab";
import { socialOptions } from "../../../constant";
import {
  useAddSocialMediaMutation,
  useDeleteSocialMediaMutation,
  useGetSocialMediaQuery,
} from "../../../services/social-media";
import { isObjectValid } from "../../../utils";
import { deleteSocial } from "../../../assets";
import DeleteModal from "../../../components/delete-modal";

const textFieldBaseStyle = {
  height: "42px",
  borderRadius: "5px",
  border: "1px solid #D1E5FA",
  px: "10px",
  color: "#8C8E90",
  "&:focus": { outline: "none" },
};

export default function SocialMediaForm() {
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [social, setSocial] = useState("");
  const [items, setItems] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);

  const [showSocialDropdown, setShowSocialDropdown] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState({});
  const toggleSocial = (option) => {
    setSocial(option);
  };

  const {
    data: data2,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetSocialMediaQuery({ page: 1, pageSize: 50 });

  useEffect(() => {
    if (isSuccess) {
      setItems(data2?.data?.socialMediaLinks, "sdasda");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data2]);

  const [addSocialMedia, { isLoading: addingLoading }] =
    useAddSocialMediaMutation();
  const handleAddSocialMedia = () => {
    const body = {
      categoryName: category,
      link,
      socialMedia: social,
      isActive: true,
    };
    if (!isObjectValid(body)) {
      toast.error("Please fill all fields");
      return;
    }
    addSocialMedia(body).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
        return;
      }
    });
  };

  const [deleteSocialMedia, { isLoading: deleteLoading }] =
    useDeleteSocialMediaMutation();

  const handleDelete = (item) => {
    setDeleteModal(item);
  };

  const handleDeleteFinal = () => {
    deleteSocialMedia(deleteModal?.id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
        setDeleteModal(null);
        return;
      }
    });
  };

  return (
    <Box
      sx={{
        p: 2,
        minHeight: "623px",
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        gap="5px"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <TextField
          placeholder="Link Here"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          variant="standard"
          sx={{ width: "100%" }}
          InputProps={{
            disableUnderline: true,
            sx: {
              ...textFieldBaseStyle,
              fontStyle: "italic",
              width: "100%",
              backgroundColor: "#EAF4FF",
            },
          }}
        />
        <Box
          sx={{ position: "relative", minWidth: { xs: "100%", lg: "145px" } }}
        >
          <Box
            sx={{
              width: "100%",
              height: "42px",
              border: "1px solid #D1E5FA",
              borderRadius: "5px",
              backgroundColor: "#EAF4FF",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              px: 1,
              cursor: "pointer",
              color: social ? "#000" : "#6C727F",
            }}
            onClick={() => setShowSocialDropdown((prev) => !prev)}
          >
            <span
              style={{
                width: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {social || "Social Media"}
            </span>
            <img
              src={showSocialDropdown ? UpArrow : DownArrow}
              alt="toggle"
              style={{
                width: "14px",
                height: "14px",
                objectFit: "contain",
              }}
            />
          </Box>

          {showSocialDropdown && (
            <ClickAwayListener onClickAway={() => setShowSocialDropdown(false)}>
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 20,
                  top: "100%",
                  left: 0,
                  backgroundColor: "#EAF4FF",
                  border: "1px solid #D1E5FA",
                  borderRadius: "5px",
                  p: 2,
                  mt: "5px",
                  width: { xs: "100%", lg: "145px" },
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {socialOptions?.map((option) => (
                  <Box
                    key={option?.value}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#6C727F",
                      width: "130px",
                    }}
                  >
                    <img
                      src={social === option?.value ? CheckOn : CheckOff}
                      alt="checkbox"
                      style={{
                        cursor: "pointer",
                        width: 18,
                        height: 18,
                        marginRight: 8,
                      }}
                      onClick={() => toggleSocial(option?.value)}
                    />
                    {option?.label}
                  </Box>
                ))}
              </Box>
            </ClickAwayListener>
          )}
        </Box>

        <Box sx={{ position: "relative", width: { xs: "100%", lg: "414px" } }}>
          <CategoryDropdown
            width={{ xs: "100%", lg: "414px" }}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedText={category}
            setSelectedText={setCategory}
          />
        </Box>
        {addingLoading ? (
          <Box
            sx={{
              minWidth: "63px",
              minHeight: "44px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={16} />
          </Box>
        ) : (
          <img
            src={AddIcon}
            alt="Add"
            onClick={handleAddSocialMedia}
            style={{ cursor: "pointer" }}
          />
        )}
      </Stack>

      <Box width="100%">
        {isLoading || isFetching ? (
          <LinearProgress sx={{ mt: 2 }} />
        ) : items?.length > 0 ? (
          items?.map((item, index) => (
            <Stack
              sx={{
                width: "100%",
                background: { xs: "#D1E5FA", lg: "transparent" },
                padding: { xs: "10px", lg: "0px" },
              }}
              alignItems="center"
              key={index}
              direction={{ xs: "column", lg: "row" }}
              justifyContent="flex-start"
              gap="5px"
              mt={1}
            >
              <Box
                sx={{
                  ...textFieldBaseStyle,
                  width: "100%",
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "flex-start" },
                  background: "#FFF",
                  minHeight: "42px",
                }}
              >
                {item?.link}
              </Box>
              <Box
                sx={{
                  ...textFieldBaseStyle,
                  width: { xs: "100%", lg: "145px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#FFF",
                }}
              >
                {item?.socialMedia}
              </Box>
              <Box
                sx={{
                  ...textFieldBaseStyle,
                  width: { xs: "100%", lg: "414px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#FFF",
                }}
              >
                {item?.categoryName}
              </Box>
              <img
                src={deleteSocial}
                alt="Add"
                onClick={() => handleDelete(item)}
                style={{ cursor: "pointer", width: "63px", height: "44px" }}
              />
            </Stack>
          ))
        ) : (
          <Typography
            fontSize={20}
            fontWeight={900}
            mt="50px"
            textAlign="center"
          >
            No Social Media Added
          </Typography>
        )}
      </Box>
      <DeleteModal
        open={deleteModal}
        handleClose={() => setDeleteModal(null)}
        handleCancel={() => setDeleteModal(null)}
        handleConfirm={handleDeleteFinal}
        heading="Are you sure you want to Delete?"
        desc={`Are you sure you want to delete this social media`}
        confirmText="Delete"
        loading={deleteLoading}
      />
    </Box>
  );
}
