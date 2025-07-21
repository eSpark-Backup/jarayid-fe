import { Avatar, Box, Button, Typography } from "@mui/material";
import { close, picEdit, userAvatar } from "../../assets";
import { useRef, useState } from "react";

const EditProfileModal = ({ handleClose }) => {
  const [avatar, setAvatar] = useState(userAvatar);
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatar(imageURL);
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          pb: "40px",
          borderBottom: "1.63px solid #E5E7EB",
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "25px",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ position: "relative", width: "114px", height: "114px" }}>
            <Avatar
              sx={{ width: "114px", height: "114px" }}
              alt="Avatar"
              src={avatar}
            />

            <Box
              sx={{
                position: "absolute",
                boxShadow: "0px 1.63px 6.52px 0px #1A0F011F",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bottom: "0px",
                right: "0px",
                cursor: "pointer",
              }}
              onClick={handleEditClick}
            >
              <Box
                component="img"
                src={picEdit}
                alt="Edit Icon"
                loading="lazy"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
            <Typography
              sx={{ color: "#1F2937", fontSize: "26.06px", fontWeight: "400" }}
            >
              Your name
            </Typography>
            <Typography
              sx={{ color: "#6B7280", fontSize: "22.06px", fontWeight: "400" }}
            >
              yourname@gmail.com
            </Typography>
          </Box>
        </Box>
        <Box
          component={"img"}
          src={close}
          alt="Close Icon"
          sx={{ cursor: "pointer" }}
          onClick={handleClose}
        />
      </Box>
      <Box
        sx={{
          mt: "20px",
          display: "flex",
          flexDirection: "column",
          rowGap: "39px",
          pb: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: "10px",
            borderBottom: "1.63px solid #F3F4F6",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "15px", md: "26px" }, color: "#1F2937" }}
          >
            Name
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "15px", md: "26px" }, color: "#4B5563" }}
          >
            your name
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: "10px",
            borderBottom: "1.63px solid #F3F4F6",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "15px", md: "26px" }, color: "#1F2937" }}
          >
            Email account
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "15px", md: "26px" }, color: "#4B5563" }}
          >
            yourname@gmail.com
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: "10px",
            borderBottom: "1.63px solid #F3F4F6",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "15px", md: "26px" }, color: "#1F2937" }}
          >
            Mobile number
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "15px", md: "26px" }, color: "#4B5563" }}
          >
            Add number
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "15px", md: "26px" }, color: "#1F2937" }}
          >
            Location
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "15px", md: "26px" }, color: "#4B5563" }}
          >
            USA
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ width: { xs: "100%", md: "234.19px" }, height: "58.64px" }}>
          <Button variant="contained" disableRipple>
            Save Change
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfileModal;
