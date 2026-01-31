import { Box, TextField, Typography } from "@mui/material";

const OutlineInput = ({
  label,
  required,
  placeholder,
  value,
  onChange,
  name,
  multiline,
  rows,
  rest,
}) => {
  return (
    <TextField
      name={name}
      label={
        <Box component="span" display="flex" alignItems="center">
          <Typography
            component="span"
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#121826",
            }}
          >
            {label}
          </Typography>
          {required && (
            <Typography
              sx={{
                fontSize: "18px",
                color: "#FF0000",
              }}
              component="span"
              ml={0.5}
            >
              *
            </Typography>
          )}
        </Box>
      }
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      InputLabelProps={{
        shrink: true,
        sx: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#121826",
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#6C727F",
          opacity: 1,
          fontSize: "14px",
        },
      }}
      multiline={multiline || false}
      rows={rows}
      {...rest}
    />
  );
};

export default OutlineInput;
