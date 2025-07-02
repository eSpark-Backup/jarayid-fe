import { TextField, InputAdornment, Typography, Box } from "@mui/material";

const CustomInput = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  helperText = "",
  iconSrc = "",
  error = false,
  label = "",ei
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            mb: "-12px",
            mt: 2,
          }}
        >
          {label}
        </Typography>
      )}
      <TextField
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        margin="normal"
        helperText={helperText}
        error={error}
        variant="outlined"
        InputLabelProps={{ shrink: false }}
        InputProps={{
          startAdornment: iconSrc ? (
            <InputAdornment position="start">
              <img
                src={iconSrc}
                alt=""
                style={{ width: 12, height: 13, marginRight: 8 }}
              />
            </InputAdornment>
          ) : null,
          sx: {
            height: 48,
          },
        }}
      />
    </Box>
  );
};

export default CustomInput;
