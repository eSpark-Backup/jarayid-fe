import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const OutlineSelect = ({
  label,
  required,
  value,
  onChange,
  options = [],
  placeholder = "",
  rest,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        shrink
        sx={{
          fontSize: "12px",
          fontWeight: "bold",
          color: "#121826",
        }}
      >
        <Box component="span" display="flex" alignItems="center">
          {label}
          {required && (
            <Typography
              component="span"
              sx={{ fontSize: "18px", color: "#FF0000", ml: 0.5 }}
            >
              *
            </Typography>
          )}
        </Box>
      </InputLabel>

      <Select
        value={value === "" ? placeholder : value}
        onChange={onChange}
        displayEmpty
        notched
        label={label}
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
        sx={{
          borderRadius: "8px",
          "& .MuiSelect-select": {
            fontSize: "14px",
            color: value ? "#121826" : "#9E9E9E",
          },
        }}
        {...rest}
      >
        {[{ label: placeholder, value: placeholder }, ...options].map(
          (option, idx) => (
            <MenuItem
              key={idx}
              value={option.value}
              sx={{ display: idx === 0 ? "none" : "block", border: "none" }}
            >
              {option.label}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default OutlineSelect;
