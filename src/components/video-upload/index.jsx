import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  CircularProgress,
} from "@mui/material";
import AddIcon from "../../assets/icons/plus-icon.svg";
import Dropdown from "../dropdown";
import { isObjectSame, isObjectValid } from "../../utils";
import { blackTrash } from "../../assets";
import { isEqual } from "lodash";

const VideoUpload = ({
  resetSignal,
  title,
  handleAddYouTubeVideo,
  addingLoading,
  youtubeVideos,
  isDeleteLoading,
  handleDelete,
  handleEditYoutubeVideo,
  isEditLoading,
}) => {
  const [showAdd, setShowAdd] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    url: "",
  });

  useEffect(() => {
    setFormData({
      title: "",
      category: "",
      url: "",
    });
    setShowAdd(true);
  }, [resetSignal]);

  const { category } = useSelector((state) => state?.category);
  const [catOptions, setCatOptions] = useState(
    category?.map((cat) => {
      return { label: cat?.name, value: cat?.id };
    }) || []
  );
  useEffect(() => {
    setCatOptions(
      category?.map((cat) => {
        return { label: cat?.name, value: cat?.id };
      }) || []
    );
  }, [category]);

  const [dataForm, setDataForm] = useState([]);

  useEffect(() => {
    console.log("test");
    const youtubeDataForm = youtubeVideos?.length
      ? youtubeVideos
          .filter((item) =>
            tabValue === 0
              ? item?.deviceType === "WEB"
              : item?.deviceType === "MOBILE"
          )
          ?.map((item) => {
            return {
              id: item?.id,
              form: {
                title: item?.title,
                category: item?.categoryId,
                url: item?.youtubeUrl,
              },
            };
          })
      : [];
    if (!isEqual(youtubeDataForm, dataForm)) {
      setDataForm(youtubeDataForm);
    }
  }, [youtubeVideos, tabValue]);

  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 1, fontSize: "30px", color: "#101828" }}
      >
        {title}
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2, borderBottom: "2px solid #0000001A" }}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#007BFF",
            height: "3px",
          },
        }}
      >
        <Tab
          label="Web"
          sx={{ fontSize: "20px", fontWeight: 600, color: "#101828" }}
        />
        <Tab
          label="App"
          sx={{ fontSize: "20px", fontWeight: 600, color: "#101828" }}
        />
      </Tabs>

      <Grid
        container
        spacing={2}
        direction={isSmallScreen ? "column" : "row"}
        alignItems="center"
      >
        {youtubeVideos?.length > 0 &&
          youtubeVideos
            .filter((item) =>
              tabValue === 0
                ? item?.deviceType === "WEB"
                : item?.deviceType === "MOBILE"
            )
            .map((video, index) => (
              <Grid key={index} item xs={12} sm="auto">
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    maxWidth: 228,
                    width: "100%",
                    borderRadius: "11px",
                    backgroundColor: "#F5F5F5",
                    border: "1px solid #E5E5E5",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    {isDeleteLoading ? (
                      <CircularProgress size={10} />
                    ) : (
                      <img
                        onClick={() => handleDelete(video?.id)}
                        style={{ cursor: "pointer" }}
                        src={blackTrash}
                        alt="trash"
                      />
                    )}
                  </Box>
                  <Field
                    label="Title"
                    value={
                      dataForm?.find((item) => item?.id === video?.id)?.form
                        ?.title
                    }
                    onChange={(value) =>
                      setDataForm((prev) =>
                        prev.map((item) =>
                          item.id === video.id
                            ? {
                                ...item,
                                form: {
                                  ...item.form,
                                  title: value,
                                },
                              }
                            : item
                        )
                      )
                    }
                  />
                  <Field
                    dropdown
                    placeholder=""
                    options={catOptions}
                    label="Choose Category"
                    value={
                      dataForm?.find((item) => item?.id === video?.id)?.form
                        ?.category
                    }
                    onChange={(value) =>
                      setDataForm((prev) =>
                        prev.map((item) =>
                          item.id === video.id
                            ? {
                                ...item,
                                form: {
                                  ...item.form,
                                  category: value,
                                },
                              }
                            : item
                        )
                      )
                    }
                  />
                  <Field
                    label="Attached YouTube Link"
                    value={
                      dataForm?.find((item) => item?.id === video?.id)?.form
                        ?.url
                    }
                    onChange={(value) =>
                      setDataForm((prev) =>
                        prev.map((item) =>
                          item.id === video.id
                            ? {
                                ...item,
                                form: {
                                  ...item.form,
                                  url: value,
                                },
                              }
                            : item
                        )
                      )
                    }
                    multiline
                    rows={3}
                  />
                  <Button
                    onClick={() =>
                      handleEditYoutubeVideo(video?.id, {
                        title: dataForm?.find((item) => item?.id === video?.id)
                          ?.form?.title,
                        youtubeUrl: dataForm?.find(
                          (item) => item?.id === video?.id
                        )?.form?.url,
                        contentType:
                          title === "Shorts" ? "SHORTS" : "FULL_VIDEO",
                        categoryId: dataForm?.find(
                          (item) => item?.id === video?.id
                        )?.form?.category,
                        deviceType: tabValue === 1 ? "MOBILE" : "WEB",
                      })
                    }
                    loading={isEditLoading}
                    disabled={
                      isEditLoading ||
                      !dataForm?.find((item) => item?.id === video?.id)?.form ||
                      !isObjectValid(
                        dataForm?.find((item) => item?.id === video?.id)?.form
                      ) ||
                      isObjectSame(
                        dataForm?.find((item) => item?.id === video?.id)?.form,
                        {
                          title: video?.title,
                          category: video?.categoryId,
                          url: video?.youtubeUrl,
                        }
                      )
                    }
                    sx={{
                      width: "93px",
                      height: "29px",
                      fontSize: "12.39px",
                    }}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </Paper>
              </Grid>
            ))}

        {(!showAdd ||
          !youtubeVideos.filter((item) =>
            tabValue === 0
              ? item?.deviceType === "WEB"
              : item?.deviceType === "MOBILE"
          )?.length > 0) && (
          <Grid item xs={12} sm="auto">
            <Paper
              elevation={2}
              sx={{
                p: 2,
                maxWidth: 228,
                width: "100%",
                borderRadius: "11px",
                backgroundColor: "#F5F5F5",
                border: "1px solid #E5E5E5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Field
                label="Title"
                value={formData?.title}
                onChange={(value) =>
                  setFormData((prev) => {
                    return { ...prev, title: value };
                  })
                }
              />
              <Field
                dropdown
                placeholder=""
                options={catOptions}
                label="Choose Category"
                value={formData?.category}
                onChange={(value) =>
                  setFormData((prev) => {
                    return { ...prev, category: value };
                  })
                }
              />
              <Field
                label="Attached YouTube Link"
                value={formData?.url}
                onChange={(value) =>
                  setFormData((prev) => {
                    return { ...prev, url: value };
                  })
                }
                multiline
                rows={3}
              />
              <Button
                onClick={() =>
                  handleAddYouTubeVideo({
                    title: formData?.title,
                    youtubeUrl: formData?.url,
                    contentType: title === "Shorts" ? "SHORTS" : "FULL_VIDEO",
                    categoryId: formData?.category,
                    deviceType: tabValue === 1 ? "MOBILE" : "WEB",
                  })
                }
                loading={addingLoading}
                disabled={addingLoading || !isObjectValid(formData)}
                sx={{ width: "93px", height: "29px", fontSize: "12.39px" }}
                variant="contained"
              >
                Save
              </Button>
            </Paper>
          </Grid>
        )}

        {showAdd &&
          youtubeVideos.filter((item) =>
            tabValue === 0
              ? item?.deviceType === "WEB"
              : item?.deviceType === "MOBILE"
          )?.length > 0 && (
            <Grid
              item
              xs={12}
              sm="auto"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <img
                onClick={() => setShowAdd(false)}
                style={{ cursor: "pointer" }}
                src={AddIcon}
                alt="Add"
                width="73px"
                height="73px"
              />
            </Grid>
          )}
      </Grid>
    </Box>
  );
};

const Field = ({
  label,
  value,
  onChange,
  dropdown,
  options,
  placeholder,
  multiline = false,
  rows = 1,
}) => (
  <Box sx={{ width: "100%" }}>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 500,
        mb: 0.5,
        fontSize: "12px",
        color: "#000000",
      }}
    >
      {label}
    </Typography>
    {dropdown ? (
      <Dropdown
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#FFFEFE",
            "& fieldset": { border: "none" },
            alignItems: multiline ? "start" : "center",
          },
          "& .MuiInputBase-input": {
            padding: multiline ? "8px 14px" : "0 14px",
          },
        }}
      />
    ) : (
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        multiline={multiline}
        rows={rows}
        sx={{
          "& .MuiOutlinedInput-root": {
            minHeight: "30px",
            borderRadius: "8px",
            backgroundColor: "#FFFEFE",
            "& fieldset": { border: "none" },
            alignItems: multiline ? "start" : "center",
          },
          "& .MuiInputBase-input": {
            padding: multiline ? "8px 14px" : "0 14px",
          },
        }}
      />
    )}
  </Box>
);

export default VideoUpload;
