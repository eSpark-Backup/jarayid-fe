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
      variants: [
        {
          props: { variant: "contained" },
          style: {
            borderRadius: "9.77px",
            color: "#FFFFFF",
            background: "#007BFF",
            boxShadow: "none",
            "&:hover": {
              background: "#007BFF",
              color: "#FFFFFF",
              border: "none",
              boxShadow: "none",
            },
          },
        },
        {
          props: { variant: "delete" },
          style: {
            background: "#DF1C41",
            border: "none",
            borderRadius: "12px",
            color: "#FFFFFF",
            "&:hover": {
              border: "none",
              color: "#FFFFFF",
              background: "#DF1C41",
              boxShadow: "none",
            },
          },
          props: { variant: "outlined" },
          style: {
            backgroundColor: "transparent",
            border: "1px solid #3281CA",
            color: "#3281CA",
            "&:hover": {
              backgroundColor: "#3281CA",
              color: "#FFF",
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            backgroundColor: "transparent",
            color: "#3281CA",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#F0F7FF",
            },
          },
        },
        {
          props: { variant: "gradient" },
          style: {
            height: "40px",
            borderRadius: "10px",
            background:
              "linear-gradient(180deg, #007BFF 32.36%, #004A99 97.76%)",
            color: "#FFF",
            border: "1.12px solid #EBE5E5",
            fontSize: "17px",
            "&:hover": {
              background:
                "linear-gradient(180deg, #007BFF 32.36%, #004A99 97.76%)",
              color: "#FFF",
              border: "1.12px solid #EBE5E5",
            },
          },
        },
      ],
    },
    MuiChip: {
      variants: [
        {
          props: { variant: "straight" },
          style: {
            padding: "0",
            width: "99.5px",
            backgroundColor: "#F3EEEE",
            border: "1px solid #01000142",
            fontSize: "17.96px",
            fontWeight: "400",
            borderRadius: "0px",
            height: "39px",
            "& .MuiChip-label": {
              padding: 0,
            },
            ":hover": {
              backgroundColor: "#F3EEEE",
              border: "1px solid #01000142",
            },
          },
        },
        {
          props: { variant: "rounded" },
          style: {
            padding: "0",
            width: "200px",
            backgroundColor: "#F3EEEE",
            border: "1px solid #EBE5E5",
            borderRadius: "10.08px",
            fontSize: "17.96px",
            fontWeight: "400",
            height: "40px",
            "& .MuiChip-label": {
              padding: 0,
            },
          },
        },
        {
          props: { variant: "blue" },
          style: {
            padding: "0",
            width: "51.51px",
            backgroundColor: "#004A99",
            border: "none",
            borderRadius: "8.73px",
            fontSize: "7.96px",
            fontWeight: "400",
            height: "15.71px",
            "& .MuiChip-label": {
              padding: 0,
              color: "white",
            },
          },
        },
        {
          props: { variant: "transparent" },
          style: {
            padding: "0",
            width: "51.51px",
            backgroundColor: "#ffffffff",
            border: "none",
            borderRadius: "8.73px",
            fontSize: "7.96px",
            fontWeight: "400",
            height: "15.71px",
            "& .MuiChip-label": {
              padding: 0,
              color: "#6E6F70",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            padding: "0",
            width: "56.51px",
            backgroundColor: "#ffffffff",
            border: "1.23px solid #007BFF45",
            borderRadius: "9.6px",
            fontSize: "7.96px",
            fontWeight: "400",
            height: "17.71px",
            "& .MuiChip-label": {
              padding: 0,
              color: "#004A99",
            },
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "9px",
          padding: "15px",
          boxShadow: "none !important",
          backgroundColor: "#FFFFFF",
          border: "none !important",
        },
      },
      variants: [
        {
          props: "adminPaper",
          style: {
            borderRadius: "16.97px",
            padding: "15px",
            border: "0.85px solid #F8F9FA",
            boxShadow: "0px 1px 4px 0px #00000040",
          },
        },
      ],
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          height: "40px",
          borderBottom: "1px solid #8F8F8F",
          color: "#383535",
          fontSize: "15.96px",
          display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          columnGap: "9px",
        },
      },
    },
  },
});
