import { Box, Typography } from "@mui/material";
import {
  facebook,
  instagram,
  tiktok,
  twitter,
  whatsapp,
  youtube,
} from "../../assets";

const ShareModal = () => {
  const items = [
    { logo: facebook, name: "Facebook" },
    { logo: instagram, name: "Instagram" },
    { logo: tiktok, name: "Tiktok" },
    { logo: twitter, name: "Thread" },
    { logo: whatsapp, name: "Whatsapp" },
    { logo: youtube, name: "Youtube" },
  ];
  return (
    <Box>
      <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
        Share Jarayid
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "30px",
        }}
      >
        {items?.map((item, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              rowGap: "7px",
            }}
          >
            <Box
              component={"img"}
              src={item?.logo}
              sx={{
                width: { xs: "24px", sm: "32px", md: "48px", lg: "69.36px" },
                height: { xs: "24px", sm: "32px", md: "48px", lg: "69.36px" },
              }}
              alt={item?.name}
              loading="lazy"
            />
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
              {item?.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShareModal;
