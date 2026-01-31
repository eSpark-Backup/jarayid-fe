import { Box, Typography } from "@mui/material";
import CustomInput from "../input";
import { wordInputStyles } from "../../constant";

const WordsInput = ({ label, value, handleChange, name, index }) => {
  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", md: "70%", lg: "80%" },
          border: "0.5px solid #E8D5D5",
          borderRadius: "7px",
          height: "91.83px",
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "14px", color: "#101828", fontWeight: "600" }}
        >
          {label}
        </Typography>
        <Box sx={{ width: "50%", height: "42.37px" }}>
          <CustomInput
            placeholder={"Value"}
            type={"number"}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            sx={wordInputStyles}
            modal={true}
            name={name}
            autoFocus={true}
            dir={"ltr"}
          />
        </Box>
      </Box>
    </>
  );
};

export default WordsInput;
