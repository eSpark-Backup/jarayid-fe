import { Box, Skeleton, Typography } from "@mui/material";
import {
  comment,
  facebook,
  instagram,
  like,
  save,
  tiktok,
  twitter,
  whatsapp,
  youtube,
} from "../../assets";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useToggleReadLaterMutation } from "../../services/feed";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

const SocialBox = ({ newsCard, detailPage, shareLinks, id }) => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language);
  const [toggleReadLater, { isLoading }] = useToggleReadLaterMutation();
  const navigate = useNavigate();
  const links = useSelector((state) => state.socialLinks.links);
  const [myLinks, setMyLinks] = useState({});

  const toArabicDigits = (str) => str.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

  const handleToggle = async () => {
    try {
      const response = await toggleReadLater({ id }).unwrap();
      toast.success(response?.message);
    } catch (error) {
      console.error("Error toggling read later:", error);
      toast.error("Something went wrong");
    }
  };

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: { xs: newsCard ? "2px" : "10px", md: "10px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: { xs: "3px", md: "4px", lg: "9px" },
        }}
      >
        {newsCard ? (
          <>
            <Box
              component={"img"}
              src={youtube}
              sx={{
                display: { xs: "block", md: "none" },
                width: { xs: "12px", sm: "15px", md: "21px" },
                height: { xs: "12px", sm: "15px", md: "21px" },
              }}
              alt="Youtube"
              loading="lazy"
            />
            <Box
              component="img"
              src={comment}
              alt="Comment"
              sx={{
                width: { xs: "12px", sm: "15px", md: "21px" },
                height: { xs: "12px", sm: "15px", md: "21px" },
              }}
              onClick={(e) => {
                navigate(`/${id}`);
                e.stopPropagation();
              }}
              loading="lazy"
            />
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                sx={{
                  borderRadius: "50%",
                  height: { xs: "12px", sm: "15px", md: "21px" },
                  width: { xs: "12px", sm: "15px", md: "21px" },
                }}
              />
            ) : (
              <Box
                component="img"
                src={save}
                alt="Save"
                sx={{
                  width: { xs: "12px", sm: "15px", md: "21px" },
                  height: { xs: "12px", sm: "15px", md: "21px" },
                }}
                loading="lazy"
                onClick={(e) => {
                  if (isLoading) return;
                  e.stopPropagation();
                  handleToggle();
                }}
              />
            )}
            {/* <Box
              component="img"
              src={like}
              alt="Like"
              sx={{
                width: { xs: "12px", sm: "15px", md: "21px" },
                height: { xs: "12px", sm: "15px", md: "21px" },
              }}
              loading="lazy"
            /> */}
            <a
              href={shareLinks?.twitter}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                component="img"
                src={twitter}
                alt="Twitter"
                sx={{
                  width: { xs: "12px", sm: "15px", md: "21px" },
                  height: { xs: "12px", sm: "15px", md: "21px" },
                }}
                loading="lazy"
              />
            </a>
            <a
              target="_blank"
              href={shareLinks?.facebook}
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                component="img"
                src={facebook}
                alt="Facebook"
                sx={{
                  width: { xs: "12px", sm: "15px", md: "21px" },
                  height: { xs: "12px", sm: "15px", md: "21px" },
                }}
                loading="lazy"
              />
            </a>
            <a
              href={shareLinks?.whatsapp}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                component="img"
                src={whatsapp}
                alt="WhatsApp"
                sx={{
                  width: { xs: "12px", sm: "15px", md: "21px" },
                  height: { xs: "12px", sm: "15px", md: "21px" },
                }}
                loading="lazy"
              />
            </a>
          </>
        ) : (
          <>
            {shareLinks?.facebook || myLinks?.facebook ? (
              <a href={shareLinks?.facebook || myLinks?.facebook}>
                <Box
                  component={"img"}
                  src={facebook}
                  alt={"Facebook"}
                  loading="lazy"
                  sx={{ width: { md: 25, lg: 32 }, height: { md: 25, lg: 32 } }}
                />
              </a>
            ) : null}
            {!detailPage && (shareLinks?.instagram || myLinks?.instagram) && (
              <a href={shareLinks?.instagram || myLinks?.instagram}>
                <Box
                  component={"img"}
                  src={instagram}
                  alt={"Instagram"}
                  loading="lazy"
                  sx={{ width: { md: 25, lg: 32 }, height: { md: 25, lg: 32 } }}
                />
              </a>
            )}
            {shareLinks?.tiktok || myLinks?.tiktok ? (
              <a href={shareLinks?.tiktok || myLinks?.tiktok}>
                <Box
                  component={"img"}
                  src={tiktok}
                  alt={"TikTok"}
                  loading="lazy"
                  sx={{ width: { md: 25, lg: 32 }, height: { md: 25, lg: 32 } }}
                />
              </a>
            ) : null}
            {shareLinks?.twitter || myLinks?.twitter ? (
              <a href={shareLinks?.twitter || myLinks?.twitter}>
                <Box
                  component={"img"}
                  src={twitter}
                  alt={"Twitter"}
                  loading="lazy"
                  sx={{ width: { md: 25, lg: 32 }, height: { md: 25, lg: 32 } }}
                />
              </a>
            ) : null}
            {shareLinks?.whatsapp || myLinks?.whatsapp ? (
              <a href={shareLinks?.whatsapp || myLinks?.whatsapp}>
                <Box
                  component={"img"}
                  src={whatsapp}
                  alt={"Whatsapp"}
                  loading="lazy"
                  sx={{ width: { md: 25, lg: 32 }, height: { md: 25, lg: 32 } }}
                />
              </a>
            ) : null}
          </>
        )}
      </Box>
      {detailPage ? null : newsCard ? (
        <Typography
          sx={{
            textAlign: {
              // xs: "center",
              xs: language === "ar" ? "left" : "right",
            },
            fontSize: { xs: "7px", sm: "14px", md: "12px" },
          }}
          component={"h4"}
        >
          {t("shareNews")}
        </Typography>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: { md: "12px", lg: "16px" },
              fontWeight: "600",
              textAlign: language === "ar" ? "right" : "left",
              color: language === "ar" ? "#8F8F8F" : "black",
            }}
            component={"h3"}
          >
            {t("followUs")}
          </Typography>
          <Typography
            sx={{
              fontSize: { md: "12px", lg: "16px" },
              fontWeight: "500",
              color: "#8F8F8F",
              textAlign: language === "ar" ? "right" : "left",
            }}
            component={"h4"}
          >
            {language === "ar"
              ? `التاريخ : ${toArabicDigits(
                  dayjs().locale("ar").format("DD-MM-YYYY")
                )}`
              : `Date : ${dayjs().locale("en").format("DD-MM-YYYY")}`}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default SocialBox;
