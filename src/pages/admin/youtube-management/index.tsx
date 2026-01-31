import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import VideoUpload from "../../../components/video-upload";
import SubHeader from "../../../components/sub-header";
import {
  useAddYoutubeVideoMutation,
  useDeleteYoutubeVideoMutation,
  useEditYoutubeVideoMutation,
  useGetAllYoutubeVideoQuery,
} from "../../../services/youtube";
import { toast } from "react-toastify";
import { isObjectValid } from "../../../utils";

const YoutubeManagement = () => {
  const [loadingId, setLoadingId] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const {
    data: data2,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAllYoutubeVideoQuery({ page: 1, pageSize: 20 });

  useEffect(() => {
    if (isSuccess) {
      setYoutubeVideos(data2?.data?.items);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data2]);

  const [addYoutubeVideo, { isLoading: addingLoading }] =
    useAddYoutubeVideoMutation();
  const handleAddYouTubeVideo = (body) => {
    if (!isObjectValid(body)) {
      toast.error("Please fill all fields");
      return;
    }
    addYoutubeVideo(body).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        setResetSignal((prev) => prev + 1);
        refetch();
        return;
      }
    });
  };

  const [editYoutubeVideo, { isLoading: isEditLoading }] =
    useEditYoutubeVideoMutation();
  const handleEditYoutubeVideo = (id, body) => {
    if (!isObjectValid(body)) {
      toast.error("Please fill all fields");
      return;
    }
    setLoadingId(id);
    editYoutubeVideo({ id, credentials: body }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        setLoadingId(null);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
        setLoadingId(null);
        return;
      }
    });
  };

  const [deleteVideo, { isLoading: isDeleteLoading }] =
    useDeleteYoutubeVideoMutation();
  const handleDelete = (id) => {
    setLoadingId(id);
    deleteVideo(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        setLoadingId(null);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
        setLoadingId(null);
        return;
      }
    });
  };
  return (
    <>
      <SubHeader title="Youtube Management" />
      <Box
        sx={{
          width: "100%",
          display: (isLoading || isFetching) && "flex",
          justifyContent: "center",
          backgroundColor: "#FFFEFE",
          p: { xs: "10px 16px", sm: "10px 32px" },
          borderRadius: 2,
          mt: "20px",
        }}
      >
        {" "}
        {isLoading || isFetching ? (
          <CircularProgress />
        ) : (
          <>
            <VideoUpload
              youtubeVideos={youtubeVideos?.filter(
                (item) => item?.contentType === "SHORTS"
              )}
              handleAddYouTubeVideo={handleAddYouTubeVideo}
              addingLoading={addingLoading}
              isDeleteLoading={isDeleteLoading}
              handleDelete={handleDelete}
              isEditLoading={isEditLoading}
              handleEditYoutubeVideo={handleEditYoutubeVideo}
              resetSignal={resetSignal}
              loadingId={loadingId}
              title="Shorts"
            />
            <VideoUpload
              youtubeVideos={youtubeVideos?.filter(
                (item) => item?.contentType === "FULL_VIDEO"
              )}
              handleAddYouTubeVideo={handleAddYouTubeVideo}
              addingLoading={addingLoading}
              isDeleteLoading={isDeleteLoading}
              handleDelete={handleDelete}
              isEditLoading={isEditLoading}
              handleEditYoutubeVideo={handleEditYoutubeVideo}
              resetSignal={resetSignal}
              loadingId={loadingId}
              title="Full Videos Link"
            />
          </>
        )}
      </Box>
    </>
  );
};

export default YoutubeManagement;
