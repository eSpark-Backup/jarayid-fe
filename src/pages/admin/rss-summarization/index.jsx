import {
  Box,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { CustomCheckbox, CustomInput, WordsInput } from "../../../components";
import { useEffect, useState } from "react";
import { dropdownArrow, upArrow } from "../../../assets";
import { modelsContent, timeOptions, wordInputStyles } from "../../../constant";

const sectionStyle = {
  border: "0.5px solid #9C9393",
  borderRadius: "14px",
  p: "15px",
  display: "flex",
  flexDirection: "column",
  rowGap: "5px",
  backgroundColor: "#D9D9D91A",
};

const RssSummarization = () => {
  const labels = [
    "15-60 Words",
    "61-300 Words",
    "301-1000 Words",
    "Over 1000 Words",
  ];

  const [wordsValue, setWordsValue] = useState(Array(labels?.length).fill(50));
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(1);
  const [activeModel, setActiveModel] = useState(
    modelsContent?.filter((item) => item?.id === selectedModel)
  );
  const [time, setTime] = useState("02");
  const [timeOpen, setTimeOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(1);
  const [activeTime, setActiveTime] = useState(
    timeOptions?.filter((item) => item?.id === selectedTime)
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [treshold, setTreshold] = useState(50);

  const [countries, setCOuntries] = useState({
    Morocco: false,
    Algeria: false,
    Yemen: false,
    Bahrain: false,
    Lebanon: false,
    Syria: false,
    Sudan: false,
    Tunisia: false,
    Iraq: false,
    Kuwait: false,
    Oman: false,
    Libya: false,
    Qatar: false,
    "Word News": false,
    Tech: false,
    Fashion: false,
    Economy: false,
    Sports: false,
    Health: false,
  });

  const options = Object.keys(countries);
  console.log(options);

  const handleCheckboxChange = (event) => {
    console.log(event);
    const { name, checked: isChecked } = event.target;
    setCOuntries((prev) => ({
      ...prev,
      [name]: isChecked,
    }));
  };

  const handleChange = (value, index) => {
    const newValues = [...wordsValue];
    newValues[index] = value;
    setWordsValue(newValues);
  };

  const handleModelSelect = (id) => {
    setSelectedModel(id);
    setActiveModel(modelsContent?.filter((item) => item?.id === id));
    setModelOpen(false);
  };

  const handleTimeSelect = (id) => {
    setSelectedTime(id);
    setActiveTime(timeOptions?.filter((item) => item?.id === id));
    setTimeOpen(false);
  };

  return (
    <>
      <Typography
        sx={{ fontSize: "30px", color: "#3F3F40", fontWeight: "600" }}
      >
        RSS Summarization
      </Typography>
      <Paper variant="adminPaper" sx={{ mt: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pb: "20px" }}>
          <TextField
            label="Category Type"
            defaultValue="Select"
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
                // overflowY: "auto",
                px: "10px",
                py: "10px",
                mt: "10px",
                border: "1px solid #D2D5DA !important",
              },
            }}
          >
            <Grid container rowSpacing={2} columnSpacing={1.5}>
              {options.map((option) => (
                <Grid size={3} key={option}>
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        name={option}
                        checked={countries[option]}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={option}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "12px", // or your desired size
                      },
                    }}
                  />
                </Grid>
              ))}
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
              Enter the percentage by which to reduce the article length based
              on word count.
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
              {labels?.map((item, index) => (
                <WordsInput
                  label={item}
                  value={wordsValue[index]}
                  handleChange={handleChange}
                  name={index}
                  index={index}
                  key={index}
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
                {activeModel[0]?.value}
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
                    onClick={() => handleModelSelect(item?.id)}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "10px", md: "12px", lg: "15.05px" },
                        fontWeight: "600",
                        color: "#101828",
                      }}
                    >
                      {item?.value}
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
                    {activeTime[0]?.value}
                  </Typography>
                  <Box
                    component="img"
                    src={upArrow}
                    alt="Icon"
                    sx={{
                      transform: timeOpen ? "rotate(0deg)" : "rotate(180deg)",
                    }}
                  />
                </Box>
                {timeOptions
                  ?.filter((time) => time?.id !== selectedTime)
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
                      onClick={() => handleTimeSelect(item?.id)}
                    >
                      <Typography
                        sx={{
                          fontSize: "17px",
                          color: "#101828",
                          fontWeight: "600",
                        }}
                      >
                        {item?.value}
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
                sx={{ fontSize: "18px", color: "#101828", fontWeight: "600" }}
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
      </Paper>
    </>
  );
};

export default RssSummarization;
