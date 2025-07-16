import { Box, Divider, Stack, Typography } from "@mui/material";
import { logo2, pick1, pick2 } from "../../assets";
import { categoriesFooter } from "../../constant";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const language = useSelector((state) => state.language);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: "#1D4167",
        p: { xs: "25px 20px", lg: "25px 90px" },
        display: "flex",
        justifyContent: "space-between",
        flexDirection: {
          xs: "column",
          lg: language === "ar" ? "row-reverse" : "row",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          width: { xs: "100%", lg: "30%" },
        }}
      >
        <img src={logo2} alt="Logo" />
        <Typography
          sx={{
            fontSize: "16px",
            color: "#fff",
            textAlign: language === "ar" ? "right" : "unset",
          }}
        >
          {t("footer1")}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#fff",
            textAlign: language === "ar" ? "right" : "unset",
          }}
        >
          {t("footer2")}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#fff",
            textAlign: language === "ar" ? "right" : "unset",
          }}
        >
          {language === "ar" ? (
            <>
              info@example.com: {t("email")}
              <br />
              +91 54679865287: {t("phone")}
            </>
          ) : (
            <>
              {t("email")}: info@example.com
              <br />
              {t("phone")}: +91 54679865287
            </>
          )}
        </Typography>
      </Box>
      <Box sx={{ width: { xs: "100%", lg: "28%" } }}>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#FFFFFF",
            textAlign: language === "ar" ? "right" : "unset",
          }}
        >
          {t("picks")}
        </Typography>
        <Divider
          sx={{ backgroundColor: "#8F8F8F33", height: "3px", mt: "4px" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
          <Box
            sx={{
              display: "flex",
              columnGap: "0px",
              alignItems: "center",
              flexDirection: language === "ar" ? "row-reverse" : "row",
            }}
          >
            <img src={pick1} alt="Image" />
            <Stack>
              <Typography
                sx={{
                  fontSize: "15px",
                  color: "#FFFFFFB2",
                  textAlign: language === "ar" ? "right" : "unset",
                }}
              >
                {language == "ar" ? "السياسة" : "POLITICS"}
              </Typography>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: "14px",
                  textAlign: language === "ar" ? "right" : "unset",
                }}
              >
                {t("tipPart1")} <br /> {t("tipPart2")}
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              columnGap: "0px",
              alignItems: "center",
              flexDirection: language === "ar" ? "row-reverse" : "row",
            }}
          >
            <img src={pick2} alt="Image" />
            <Stack>
              <Typography
                sx={{
                  fontSize: "15px",
                  color: "#FFFFFFB2",
                  textAlign: language === "ar" ? "right" : "unset",
                }}
              >
                {language == "ar" ? "السياسة" : "DESIGN"}
              </Typography>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: "14px",
                  textAlign: language === "ar" ? "right" : "unset",
                }}
              >
                {t("tipPart1")} <br /> {t("tipPart2")}
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              columnGap: "0px",
              alignItems: "center",
              flexDirection: language === "ar" ? "row-reverse" : "row",
            }}
          >
            <img src={pick1} alt="Image" />
            <Stack>
              <Typography
                sx={{
                  fontSize: "15px",
                  color: "#FFFFFFB2",
                  textAlign: language === "ar" ? "right" : "unset",
                }}
              >
                {language == "ar" ? "السياسة" : "Travel"}
              </Typography>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: "14px",
                  textAlign: language === "ar" ? "right" : "unset",
                }}
              >
                {t("tipPart1")} <br /> {t("tipPart2")}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: { xs: "100%", lg: "30%" } }}>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#FFFFFF",
            textAlign: language === "ar" ? "right" : "unset",
          }}
        >
          {t("Categories")}
        </Typography>
        <Divider
          sx={{ backgroundColor: "#8F8F8F33", height: "3px", mt: "4px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            mt: "15px",
          }}
        >
          {categoriesFooter?.map((item, index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: language === "ar" ? "row-reverse" : "row",
                textTransform: "uppercase",
              }}
              key={index}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#FFFFFF",
                  pr: language === "ar" ? "15px" : "0px",
                  pl: language === "ar" ? "0px" : "10px",
                }}
              >
                {t(item)}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#FFFFFF",
                  pr: language !== "ar" ? "10px" : "0px",
                  pl: language === "ar" ? "10px" : "0px",
                }}
              >
                452
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography
          sx={{
            color: "#FFFFFF",
            fontSize: "14px",
            mt: "15px",
            textAlign: language === "ar" ? "right" : "unset",
            pr: language === "ar" ? "25px" : "0px",
          }}
        >
          {t("Show all")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
