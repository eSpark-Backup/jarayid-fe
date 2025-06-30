import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 769,
      lg: 1281,
      xl: 1921,
    },
  },
  palette: {
    primary: {
      main: "#333333",
      light: "#8F8F8F",
      dark: "#000000",
    },
  },
  typography: {
    fontFamily: "'Gilroy', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "46px",
          background: "#3281CA",
          boxShadow: "8px 8px 24px 0px #0000001F",
          color: "#FFFFFF",
          textTransform: "capitalize",
          borderRadius: "0px",
          fontSize: "16px",
          fontWeight: "400",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: "0px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            background: "#3281CA",
            boxShadow: "8px 8px 24px 0px #0000001F",
            color: "#FFFFFF",
          },
        },
      },
    },
  },
});
