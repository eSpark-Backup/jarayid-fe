import { useSelector } from "react-redux";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { close, picEdit, userAvatar } from "../../assets";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import CustomInput from "../input";
import { useUpdateUserMutation } from "../../services/auth";
import { toast } from "react-toastify";
import { getFont } from "../../utils";
import { useTranslation } from "react-i18next";

const sharedInputStyles = {
  mt: 0,
  mb: 0,
  my: 0,
  "&.MuiFormControl-root": {
    marginTop: 0,
    marginBottom: 0,
    marginY: 0,
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "transparent",
    borderRadius: 0,
    height: "40px",
    fontSize: { xs: getFont("15px"), md: getFont("26px") },
    color: "#4B5563",
    border: "none",
    padding: 0,
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& input": {
    padding: 0,
  },
};

const EditProfileModal = ({ handleClose }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(user.image);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [editName, setEditName] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const language = useSelector((state) => state.language);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      mobile: user?.phoneNumber || "",
      location: user?.country,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const objToSend = {
        name: values?.name,
        phoneNumber: values?.mobile,
        country: values?.location,
        image: file,
      };
      const cleanedObj = Object.fromEntries(
        Object.entries(objToSend).filter(
          ([_, v]) => v !== null && v !== undefined && v !== ""
        )
      );
      const formData = new FormData();
      for (const key in cleanedObj) {
        formData.append(key, cleanedObj[key]);
      }
      updateUser(formData).then((res) => {
        if (res?.data) {
          toast.success(res?.data?.message);
          handleClose();
          return;
        }
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
      });
    },
  });

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFile(file);
      setAvatar(imageURL);
    }
  };

  const handleNameClick = () => {
    setEditName(true);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      component={"form"}
      onSubmit={formik.handleSubmit}
    >
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
              sx={{
                color: "#1F2937",
                fontSize: getFont("26.06px"),
                fontWeight: "400",
              }}
            >
              {user?.name || "Your name"}
            </Typography>
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: getFont("22.06px"),
                fontWeight: "400",
              }}
            >
              {user?.email}
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
            alignItems: { xs: "flex-start", sm: "center" },
            pb: "20px",
            borderBottom: "1.63px solid #F3F4F6",
            flexDirection: {
              xs: "column",
              sm: language === "ar" ? "row-reverse" : "row",
            },
            rowGap: editName ? "0px" : "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: getFont("15px"), md: getFont("26px") },
              color: "#1F2937",
            }}
          >
            {t("Name")}
          </Typography>
          {editName ? (
            <Box sx={{ width: { xs: "100%", sm: "220px" } }}>
              <CustomInput
                placeholder={t("your name")}
                type={"text"}
                sx={sharedInputStyles}
                name={"name"}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={() => {
                  setEditName(false);
                  formik.handleBlur({ target: { name: "name" } });
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                modal={true}
                autoFocus={true}
              />
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: { xs: getFont("15px"), md: getFont("26px") },
                color: "#4B5563",
              }}
              onClick={handleNameClick}
            >
              {formik.values.name || t("your name")}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            pb: "20px",
            borderBottom: "1.63px solid #F3F4F6",
            flexDirection: {
              xs: "column",
              sm: language === "ar" ? "row-reverse" : "row",
            },
            rowGap: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: getFont("15px"), md: getFont("26px") },
              color: "#1F2937",
            }}
          >
            {t("Email account")}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: getFont("15px"), md: getFont("26px") },
              color: "#4B5563",
            }}
          >
            {user?.email}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            pb: "20px",
            borderBottom: "1.63px solid #F3F4F6",
            flexDirection: {
              xs: "column",
              sm: language === "ar" ? "row-reverse" : "row",
            },
            rowGap: editMobile ? "0px" : "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: getFont("15px"), md: getFont("26px") },
              color: "#1F2937",
            }}
          >
            {t("Mobile number")}
          </Typography>
          {editMobile ? (
            <Box sx={{ width: { xs: "100%", sm: "220px" } }}>
              <CustomInput
                autoFocus
                placeholder={t("Add number")}
                type={"text"}
                sx={sharedInputStyles}
                name={"mobile"}
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  setEditMobile(false);
                  formik.handleBlur(e);
                }}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                modal={true}
              />
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: { xs: getFont("15px"), md: getFont("26px") },
                color: "#4B5563",
              }}
              onClick={() => setEditMobile(true)}
            >
              {formik.values.mobile || t("Add number")}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            pb: "20px",
            flexDirection: {
              xs: "column",
              sm: language === "ar" ? "row-reverse" : "row",
            },
            rowGap: editLocation ? "0px" : "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: getFont("15px"), md: getFont("26px") },
              color: "#1F2937",
            }}
          >
            {t("Location")}
          </Typography>
          {editLocation ? (
            <Box sx={{ width: { xs: "100%", sm: "220px" } }}>
              <CustomInput
                autoFocus
                placeholder={t("Add location")}
                type={"text"}
                sx={sharedInputStyles}
                name={"location"}
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  setEditLocation(false);
                  formik.handleBlur(e);
                }}
                error={
                  formik.touched.location && Boolean(formik.errors.location)
                }
                helperText={formik.touched.location && formik.errors.location}
                modal={true}
              />
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: { xs: getFont("15px"), md: getFont("26px") },
                color: "#4B5563",
              }}
              onClick={() => setEditLocation(true)}
            >
              {formik.values.location || t("Add location")}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: language === "ar" ? "flex-start" : "flex-end",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "234.19px" }, height: "58.64px" }}>
          <Button
            loading={isLoading}
            disabled={isLoading}
            variant="contained"
            disableRipple
            type="submit"
          >
            {t("Save Change")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfileModal;
