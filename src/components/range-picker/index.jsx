import React from "react";
import DatePicker from "react-datepicker";
import { Box } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = React.forwardRef(({ placeholder, value, onClick }, ref) => (
  <Box
    onClick={onClick}
    ref={ref}
    sx={{
      backgroundColor: "#fff",
      borderRadius: "8px",
      width: "200px",
      height: "40px",
      border: "1px solid #E2E0E5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "14px",
      color: "#3C3A41",
    }}
  >
    {value === "" ? placeholder : value}
  </Box>
));

const DateRangePicker = ({
  placeholder,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      }}
      customInput={<CustomInput placeholder={placeholder} />}
      placeholderText="Select date range"
    />
  );
};

export default DateRangePicker;
