import { Box, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFontType } from "../../store/slices/font-type";
import CheckOn from "../../assets/icons/check-on.svg";
import CheckOff from "../../assets/icons/check-off.svg";
import { getFont } from "../../utils";
import { useTranslation } from "react-i18next";

const FontSizeModal = () => {
  const dispatch = useDispatch();
  const { fontType } = useSelector((state) => state?.font);
  const language = useSelector((state) => state.language);
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        sx={{
          fontSize: getFont("32px"),
          fontWeight: "600",
          textAlign: language === "ar" ? "right" : "left",
        }}
      >
        {t("Font Size")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          mt: "30px",
        }}
      >
        {["regular", "large"].map((fontSize) => {
          return (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap="20px"
              onClick={() => dispatch(setFontType(fontSize))}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={fontSize === fontType ? CheckOn : CheckOff}
                alt="checkbox"
                style={{
                  cursor: "pointer",
                  width: 35,
                  height: 35,
                }}
              />
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: fontSize === "large" ? "66px" : "45px",
                  fontWeight: fontSize === "large" ? "900" : "400",
                }}
              >
                {t(fontSize)}
              </Typography>
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
};

export default FontSizeModal;
