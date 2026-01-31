import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import {
  CustomCheckbox,
  CustomInput,
  SubHeader,
  WordsInput,
} from "../../../components";
import { useEffect, useState } from "react";
import { dropdownArrow, upArrow } from "../../../assets";
import { timeOptions, wordInputStyles } from "../../../constant";
import { toast } from "react-toastify";
import {
  useGetRssSummarizationQuery,
  useUpdateRssSummarizationMutation,
} from "../../../services/rss-summarization";
import { useSelector } from "react-redux";

const sectionStyle = {
  border: "0.5px solid #9c939385",
  borderRadius: "14px",
  p: "15px",
  display: "flex",
  flexDirection: "column",
  rowGap: "5px",
  backgroundColor: "#D9D9D91A",
};

const RssSummarization = () => {
  const [wordsValue, setWordsValue] = useState([
    { key: "word_range_15_60", label: "15-60 Words", value: 0 },
    { key: "word_range_61_300", label: "61-300 Words", value: 0 },
    { key: "word_range_301_1000", label: "301-1000 Words", value: 0 },
    { key: "word_range_over_1000", label: "Over 1000 Words", value: 0 },
  ]);
  const [modelsContent, setModelsContent] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState();
  const [activeModel, setActiveModel] = useState(
    modelsContent?.find((item) => item?.value === selectedModel)
  );
  const [time, setTime] = useState("");
  const [timeOpen, setTimeOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTime, setActiveTime] = useState(
    timeOptions?.find((item) => item?.value === selectedTime)
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [treshold, setTreshold] = useState(0);
  const { category } = useSelector((state) => state?.category);
  const [catOptions, setCatOptions] = useState(
    category?.map((cat) => {
      return { label: cat?.name, value: cat?.id };
    }) || []
  );
  const [selectedCat, setSelectedCat] = useState([]);
  useEffect(() => {
    setCatOptions(
      category?.map((cat) => {
        return { label: cat?.name, value: cat?.id };
      }) || []
    );
  }, [category]);

  const handleCheckboxChange = (item, event) => {
    setSelectedCat([...selectedCat, item?.label]);
  };

  const handleChange = (value, key) => {
    setWordsValue((prev) =>
      prev.map((item) => (item.key === key ? { ...item, value } : item))
    );
  };

  const handleModelSelect = (value) => {
    setSelectedModel(value);
    setActiveModel(modelsContent?.find((item) => item?.value === value));
    setModelOpen(false);
  };

  const handleTimeSelect = (value) => {
    setSelectedTime(value);
    setActiveTime(timeOptions?.find((item) => item?.value === value));
    setTimeOpen(false);
  };

  const {
    data: rssData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRssSummarizationQuery();

  useEffect(() => {
    if (isSuccess) {
      setTime(rssData?.data?.settings?.day_number);
      setTreshold(rssData?.data?.settings?.threshold);
      setSelectedTime(rssData?.data?.settings?.time_limit);
      setActiveTime(
        timeOptions?.find(
          (item) => item?.value === rssData?.data?.settings?.time_limit
        )
      );
      setWordsValue((prev) =>
        prev.map((item) => ({
          ...item,
          value: rssData.data.settings[item.key] ?? item.value,
        }))
      );
      setSelectedModel(rssData?.data?.settings?.gpt_model);
      setModelsContent([
        {
          label: rssData?.data?.settings?.gpt_model,
          value: rssData?.data?.settings?.gpt_model,
        },
      ]);
      setActiveModel({
        label: rssData?.data?.settings?.gpt_model,
        value: rssData?.data?.settings?.gpt_model,
      });
      setSelectedCat(rssData?.data?.settings?.category);
      return;
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error, rssData]);

  const [updateRss, { isLoading: updateLoading }] =
    useUpdateRssSummarizationMutation();

  const handleUpdate = () => {
    const wordsObject = Object.fromEntries(
      wordsValue.map(({ key, value }) => [key, Number(value)])
    );
    const bodyToSend = {
      ...wordsObject,
      category: selectedCat,
      day_number: Number(time),
      time_limit: selectedTime,
      threshold: treshold,
      gpt_model: selectedModel,
    };
    updateRss(bodyToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
      }
    });
  };

  return (
    <>
      <SubHeader
        title={"RSS Summarization"}
        // rightNode={
        //   <Button
        //     disabled={updateLoading}
        //     loading={updateLoading}
        //     variant="contained"
        //     color="primary"
        //     sx={{
        //       width: { xs: "100%", sm: "auto" },
        //       minWidth: "125px",
        //       height: "35px",
        //       backgroundColor: "#007BFF",
        //       fontSize: "12px",
        //       textTransform: "none",
        //     }}
        //     onClick={handleUpdate}
        //   >
        //     Save
        //   </Button>
        // }
      />
      <Paper variant="adminPaper" sx={{ mt: "20px" }}>
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              minHeight: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", pb: "20px" }}
            >
              <TextField
                label="Category Type"
                defaultValue="Select"
                value={selectedCat?.length > 0 ? selectedCat?.join(", ") : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={dropdownArrow}
                        alt="dropdown"
                        style={{ width: 20, height: 20 }}
                      />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
                sx={{
                  boxShadow: "0px 2px 2px 0px #0000000D",
                  width: "380.58px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px !important",
                    cursor: "pointer !important",
                    "& fieldset": {
                      borderColor: "#D2D5DA",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D2D5DA",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#D2D5DA",
                    },
                  },
                }}
                InputLabelProps={{ shrink: true }}
                onClick={handleClick}
              />
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: { xs: "100%", sm: "380.58px" },
                    maxHeight: "300px",
                    px: "10px",
                    py: "10px",
                    mt: "10px",
                    border: "1px solid #D2D5DA !important",
                  },
                }}
              >
                <Grid container rowSpacing={2} columnSpacing={1.5}>
                  {catOptions.map((option) => {
                    return (
                      <Grid size={3} key={option?.value}>
                        <FormControlLabel
                          control={
                            <CustomCheckbox
                              name={option?.value}
                              checked={selectedCat?.some(
                                (item) => item === option.label
                              )}
                              onChange={(event) =>
                                handleCheckboxChange(option, event)
                              }
                            />
                          }
                          label={option?.label}
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "12px",
                            },
                          }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Popover>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, lg: 3.5 }} sx={sectionStyle}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#101828",
                    textAlign: "center",
                  }}
                >
                  Summarization Rules
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#101828",
                    textAlign: "center",
                  }}
                >
                  Enter the percentage by which to reduce the article length
                  based on word count.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: "20px",
                    pb: "10px",
                  }}
                >
                  {wordsValue?.map((item) => (
                    <WordsInput
                      label={item?.label}
                      value={item?.value}
                      handleChange={handleChange}
                      name={item?.key}
                      index={item?.key}
                      key={item?.key}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, lg: 5 }} sx={sectionStyle}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#101828",
                    textAlign: "center",
                  }}
                >
                  Chat GPT Options
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#101828",
                    textAlign: "center",
                  }}
                >
                  Select Model:
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#EAF4FF",
                    border: "1px solid #D1E5FA",
                    borderRadius: "5px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "42.37px",
                    mt: "10px",
                    px: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => setModelOpen(!modelOpen)}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", md: "12px", lg: "15.05px" },
                      fontWeight: "600",
                      color: "#101828",
                    }}
                  >
                    {activeModel?.value}
                  </Typography>
                  <Box
                    component={"img"}
                    src={upArrow}
                    alt="Icon"
                    sx={{
                      transform: modelOpen ? "rotate(0deg)" : "rotate(180deg)",
                    }}
                  />
                </Box>
                {modelOpen && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    {modelsContent?.map((item, index) => (
                      <Box
                        sx={{
                          backgroundColor: "#EAF4FF",
                          border: "1px solid #D1E5FA",
                          borderRadius: "5px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "42.37px",
                          px: "15px",
                          cursor: "pointer",
                        }}
                        key={index}
                        onClick={() => handleModelSelect(item?.value)}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "10px", md: "12px", lg: "15.05px" },
                            fontWeight: "600",
                            color: "#101828",
                          }}
                        >
                          {item?.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Grid>
              <Grid size={{ xs: 12, lg: 3.5 }} sx={sectionStyle}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#101828",
                    textAlign: "center",
                  }}
                >
                  Time Limit
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#101828",
                    textAlign: "center",
                  }}
                >
                  Display Articles published within the last
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    columnGap: "10px",
                    mt: "15px",
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "45%", lg: "43%" },
                      height: "42.37px",
                    }}
                  >
                    <CustomInput
                      placeholder={"Value"}
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      sx={wordInputStyles}
                      modal={true}
                      type="number"
                      dir="ltr"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      width: { xs: "45%", lg: "43%" },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "42.37px",
                        border: "1px solid #D1E5FA",
                        backgroundColor: "#EAF4FF",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        columnGap: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => setTimeOpen(!timeOpen)}
                    >
                      <Typography
                        sx={{
                          fontSize: "17px",
                          color: "#101828",
                          fontWeight: "600",
                        }}
                      >
                        {activeTime?.label}
                      </Typography>
                      <Box
                        component="img"
                        src={upArrow}
                        alt="Icon"
                        sx={{
                          transform: timeOpen
                            ? "rotate(0deg)"
                            : "rotate(180deg)",
                        }}
                      />
                    </Box>
                    {timeOptions
                      ?.filter((time) => time?.value !== selectedTime)
                      ?.map((item, index) => (
                        <Box
                          sx={{
                            width: "100%",
                            height: "42.37px",
                            border: "1px solid #D1E5FA",
                            backgroundColor: "#EAF4FF",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            columnGap: "10px",
                            cursor: "pointer",
                            visibility: timeOpen ? "visible" : "hidden",
                          }}
                          key={index}
                          onClick={() => handleTimeSelect(item?.value)}
                        >
                          <Typography
                            sx={{
                              fontSize: "17px",
                              color: "#101828",
                              fontWeight: "600",
                            }}
                          >
                            {item?.label}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: "50px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#101828",
                      fontWeight: "600",
                    }}
                  >
                    Set Threshold
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#101828" }}>
                    Display Articles published within the last
                  </Typography>
                  <Box
                    sx={{
                      width: { xs: "45%", lg: "43%" },
                      height: "42.37px",
                    }}
                  >
                    <CustomInput
                      placeholder={"Value"}
                      value={treshold}
                      onChange={(e) => setTreshold(e.target.value)}
                      sx={wordInputStyles}
                      modal={true}
                      type="number"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: "20px" }}
            >
              <Button
                disabled={updateLoading}
                loading={updateLoading}
                variant="contained"
                color="primary"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  minWidth: "125px",
                  height: "35px",
                  backgroundColor: "#007BFF",
                  fontSize: "12px",
                  textTransform: "none",
                }}
                onClick={handleUpdate}
              >
                Save
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </>
  );
};

export default RssSummarization;
