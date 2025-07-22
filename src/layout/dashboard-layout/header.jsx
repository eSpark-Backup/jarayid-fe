import { Avatar, Box, InputAdornment, Typography } from "@mui/material";
import CustomInput from "../../components/input";
import LanguageToggler from "../../components/lang-toggler";
import { blueSearch, downArrow } from "../../assets";

const Header = () => {
  return (
    <Box
      sx={{
        height: "69px",
        width: "100%",
        padding: "10px 106px 10px 21px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "13px",
      }}
    >
      <CustomInput
        InputProps={{
          startAdornment: (
            <InputAdornment position={"start"}>
              <img src={blueSearch} alt="" style={{ width: 26, height: 26 }} />
            </InputAdornment>
          ),
        }}
        placeholder="Search here..."
        sx={{
          width: "326px",
          height: "49px",
          color: "#A098AE",
          padding: "12px",
          input: {
            height: "100%",
            padding: 0,
            color: "#A098AE",
            fontSize: "14.7px",
            fontWeight: 700,
          },
          borderRadius: "16.33px",
          background: "#F5EFFC",
          fieldset: {
            borderRadius: "16.33px",
            border: "none",
            outline: "none",
          },
          border: "none",
          outline: "none",
        }}
      />
      <Box
        sx={{
          backgroundColor: "#053E7C",
          borderRadius: "5px",
          p: "5px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "136px",
          height: "35px",
          cursor: "pointer",
        }}
        // onClick={handleClick}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "10px",
            alignItems: "center",
          }}
        >
          <Avatar
            // src={}
            sx={{ width: "24px", height: "24px" }}
            alt="profile"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "2px",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "15.51px",
                fontWeight: "500",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "70px",
                whiteSpace: "nowrap",
                lineHeight: "10px",
              }}
            >
              {"Your name"}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: "7.89px",
                fontWeight: "500",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "70px",
                whiteSpace: "nowrap",
              }}
            >
              {"john dow"}
            </Typography>
          </Box>
        </Box>
        <img src={downArrow} alt="Icon" />
      </Box>
    </Box>
  );
};

export default Header;
