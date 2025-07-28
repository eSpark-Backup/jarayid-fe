import React from "react";
import { SubHeader } from "../../../components";
import { Box, Typography } from "@mui/material";
import LinkIcon from "../../../assets/icons/link-icon.svg";

const OpenAIKey = () => {
  return (
    <>
      <SubHeader title="Open AI Key" />
      <Box
        sx={{
          height: "303px",
          backgroundColor: "#FFFFFF",
          borderRadius: "19px",
          mt: "25px",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            border: "1px solid #EAE7EC",
            borderRadius: "19px",
            textAlign: "center",
            height: "281px",
            width: "100%",
            display: "flex",
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={LinkIcon}
            alt="Link Icon"
            style={{ marginBottom: "10px" }}
          />
          <Typography color="#CACCD4" fontSize="16px" variant="body2">
            Add Your Open AI key here
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default OpenAIKey;
