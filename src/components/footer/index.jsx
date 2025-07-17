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
          md: language === "ar" ? "row-reverse" : "row",
        },
        mb: { xs: "150px", md: "0px" },
        rowGap: "15px",
      }}
      component={"footer"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          width: { xs: "100%", md: "30%" },
        }}
      >
        <Box component={"img"} src={logo2} alt="Logo" loading="lazy" />
        <Typography
          sx={{
            fontSize: { xs: "9px", md: "9px", lg: "16px" },
            color: "#fff",
            textAlign: language === "ar" ? "right" : "unset",
          }}
          component={"p"}
        >
          {t("footer1")}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "9px", md: "9px", lg: "16px" },
            color: "#fff",
            textAlign: language === "ar" ? "right" : "unset",
          }}
          component={"p"}
        >
          {t("footer2")}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "9px", md: "9px", lg: "16px" },
            color: "#fff",
            textAlign: language === "ar" ? "right" : "unset",
          }}
          component={"h3"}
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
      <Box sx={{ width: { xs: "100%", md: "28%" } }}>
        <Typography
          sx={{
            fontSize: { xs: "11px", lg: "20px" },
            color: "#FFFFFF",
            textAlign: language === "ar" ? "right" : "unset",
          }}
          component={"h2"}
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
            <Box
              component={"img"}
              src={pick1}
              sx={{ width: { xs: "90px", lg: "auto" } }}
              alt={"News"}
              loading="lazy"
            />
            <Stack>
              <Typography
                sx={{
                  fontSize: { xs: "8px", lg: "15px" },
                  color: "#FFFFFFB2",
                  textAlign: language === "ar" ? "right" : "unset",
                }}
                component={"h3"}
              >
                {language == "ar" ? "السياسة" : "POLITICS"}
              </Typography>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: "8px", lg: "14px" },
                  textAlign: language === "ar" ? "right" : "unset",
                }}
                component={"p"}
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
            <Box
              component={"img"}
              src={pick2}
              sx={{ width: { xs: "90px", lg: "auto" } }}
              alt={"News"}
              loading="lazy"
            />
            <Stack>
              <Typography
                sx={{
                  fontSize: { xs: "8px", lg: "15px" },
                  color: "#FFFFFFB2",
                  textAlign: language === "ar" ? "right" : "unset",
                }}
                component={"h3"}
              >
                {language == "ar" ? "السياسة" : "DESIGN"}
              </Typography>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: "8px", lg: "14px" },
                  textAlign: language === "ar" ? "right" : "unset",
                }}
                component={"p"}
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
            <Box
              component={"img"}
              src={pick1}
              sx={{ width: { xs: "90px", lg: "auto" } }}
              alt={"News"}
              loading="lazy"
            />
            <Stack>
              <Typography
                sx={{
                  fontSize: { xs: "8px", lg: "15px" },
                  color: "#FFFFFFB2",
                  textAlign: language === "ar" ? "right" : "unset",
                }}
                component={"h3"}
              >
                {language == "ar" ? "السياسة" : "Travel"}
              </Typography>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: "8px", lg: "14px" },
                  textAlign: language === "ar" ? "right" : "unset",
                }}
                component={"p"}
              >
                {t("tipPart1")} <br /> {t("tipPart2")}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: { xs: "100%", md: "30%" } }}>
        <Typography
          sx={{
            fontSize: { xs: "11px", lg: "20px" },
            color: "#FFFFFF",
            textAlign: language === "ar" ? "right" : "unset",
          }}
          component={"h2"}
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
                  fontSize: { xs: "9px", lg: "16px" },
                  fontWeight: "400",
                  color: "#FFFFFF",
                  pr: language === "ar" ? "15px" : "0px",
                  pl: language === "ar" ? "0px" : "10px",
                }}
                component={"h3"}
              >
                {t(item)}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "9px", lg: "16px" },
                  fontWeight: "400",
                  color: "#FFFFFF",
                  pr: language !== "ar" ? "10px" : "0px",
                  pl: language === "ar" ? "10px" : "0px",
                }}
                component={"h4"}
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
          component={"h6"}
        >
          {t("Show all")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
