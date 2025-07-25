import React from "react";
import { Box } from "@mui/material";
import VideoUpload from "../../../components/video-upload";
import SubHeader from "../../../components/sub-header";

const YoutubeManagement = () => {
  return (
    <>
      <SubHeader title="Youtube Management" />
      <Box
        sx={{
          backgroundColor: "#FFFEFE",
          p: { xs: "10px 16px", sm: "10px 32px" },
          borderRadius: 2,
          mt: "20px",
        }}
      >
        <VideoUpload title="Shorts" />
        <VideoUpload title="Full Videos Link" />
      </Box>
    </>
  );
};

export default YoutubeManagement;
