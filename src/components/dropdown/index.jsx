import { useEffect, useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { dropdownArrow } from "../../assets";

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "8px 16px",
  height: "40px",
  border: "1px solid #E2E0E5",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "none",
  "& .MuiSelect-select": {
    padding: "0 8px 0 0 !important",
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    fontSize: "14px",
    color: "#3C3A41",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const CustomIcon = () => (
  <img src={dropdownArrow} alt="arrow" style={{ width: 18, height: 18 }} />
);

const Dropdown = ({ placeholder, options, value, onChange }) => {
  const [mainOptions, setMainOptions] = useState([
    {
      label: placeholder,
      value: placeholder,
    },
    ...options,
  ]);
  useEffect(() => {
    setMainOptions([
      {
        label: placeholder,
        value: placeholder,
      },
      ...options,
    ]);
  }, [options]);
  return (
    <FormControl sx={{ width: "100%" }}>
      <CustomSelect
        aria-placeholder="Role"
        value={value === "" ? placeholder : value}
        onChange={onChange}
        IconComponent={CustomIcon}
        MenuProps={{
          PaperProps: {
            sx: {
              border: "1px solid #E2E0E5 !important",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08) !important",
              mt: 1,
              padding: "0px 8px !important",
            },
          },
        }}
      >
        {mainOptions.map((option, ind) => (
          <MenuItem
            sx={{ display: ind === 0 ? "none" : "block", border: "none" }}
            key={option.value}
            value={option?.value}
          >
            {option?.label}
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
};

export default Dropdown;
