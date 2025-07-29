import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { upload } from "../../assets";

const OutlinedFileInput = ({ onChange, label, required, placeholder }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          height: "56px",
          padding: "16.5px 14px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            background: "#FFF",
            top: "-14px",
            left: "13px",
          }}
          component="span"
          display="flex"
          alignItems="center"
        >
          <Typography
            component="span"
            sx={{
              fontSize: "10px",
              fontWeight: "bold",
              color: "#121826",
              background: "#FFF",
            }}
          >
            {label}
          </Typography>

          {required && (
            <Typography
              sx={{
                fontSize: "18px",
                color: "#FF0000",
              }}
              component="span"
              ml={0.5}
            >
              *
            </Typography>
          )}
        </Box>
        <Typography
          sx={{
            color: placeholder === "Choose file" ? "#6C727F" : "#121826",
            opacity: 1,
            fontSize: "14px",
            width: "70%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {placeholder}
        </Typography>
        <img src={upload} alt="upload" />
      </Box>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default OutlinedFileInput;
