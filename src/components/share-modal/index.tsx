import { Box, Typography } from "@mui/material";
import {
  facebook,
  instagram,
  tiktok,
  twitter,
  whatsapp,
  youtube,
} from "../../assets";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFont } from "../../utils";
import { useTranslation } from "react-i18next";

const ShareModal = ({ heading }) => {
  const items = [
    { logo: facebook, name: "Facebook", key: "facebook" },
    { logo: instagram, name: "Instagram", key: "instagram" },
    { logo: tiktok, name: "Tiktok", key: "tiktok" },
    { logo: twitter, name: "Thread", key: "twitter" },
    { logo: whatsapp, name: "Whatsapp", key: "whatsapp" },
    { logo: youtube, name: "Youtube", key: "youtube" },
  ];

  const links = useSelector((state) => state.socialLinks.links);
  const [myLinks, setMyLinks] = useState({});
  const language = useSelector((state) => state.language);
  const { t } = useTranslation();

  useEffect(() => {
    const platformMap = {
      TWITTER: "twitter",
      X: "twitter",
      FACEBOOK: "facebook",
      INSTAGRAM: "instagram",
      LINKEDIN: "linkedin",
      YOUTUBE: "youtube",
      TIKTOK: "tiktok",
    };

    const socialLinksObj = links.reduce((acc, item) => {
      if (item.isActive && item.socialMedia) {
        const key = platformMap[item.socialMedia.toUpperCase()];
        if (key) {
          acc[key] = item.link;
        }
      }
      return acc;
    }, {});

    setMyLinks(socialLinksObj);
  }, [links]);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: getFont("32px"),
          fontWeight: "600",
          textAlign: language === "ar" ? "right" : "left",
        }}
      >
        {t(heading)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "30px",
          flexDirection: language === "ar" ? "row-reverse" : "row",
        }}
      >
        {items?.map((item, index) => {
          const link = myLinks[item.key];

          return (
            <Box
              key={index}
              sx={{
                display: link ? "flex" : "none",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                rowGap: "7px",
              }}
            >
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    component={"img"}
                    src={item?.logo}
                    sx={{
                      width: {
                        xs: "24px",
                        sm: "32px",
                        md: "48px",
                        lg: "69.36px",
                      },
                      height: {
                        xs: "24px",
                        sm: "32px",
                        md: "48px",
                        lg: "69.36px",
                      },
                    }}
                    alt={item?.name}
                    loading="lazy"
                  />
                  <Typography
                    sx={{
                      fontSize: getFont("10px"),
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {item?.name}
                  </Typography>
                </a>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ShareModal;
