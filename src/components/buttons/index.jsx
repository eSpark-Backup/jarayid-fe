import { Button as MuiButton } from "@mui/material";

const Button = ({ children, ...rest }) => {
  return <MuiButton disableRipple {...rest}>{children}</MuiButton>;
};

export default Button;
