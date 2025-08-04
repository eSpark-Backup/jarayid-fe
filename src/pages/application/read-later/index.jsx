import { Box, Skeleton, Typography } from "@mui/material";
import { newsContent } from "../../../constant";
import { Button, NewsCard } from "../../../components";
import { useEffect, useState } from "react";
import { useGetReadLaterArticlesQuery } from "../../../services/feed";
import { useSelector } from "react-redux";
import { getFont, translateText } from "../../../utils";

const ReadLater = () => {
  const { data, isLoading, isFetching } = useGetReadLaterArticlesQuery(
    {
      page: 1,
      limit: 10,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [translating, setTranslating] = useState(true);
  const [readLaterData, setReadLaterData] = useState([]);
  const language = useSelector((state) => state.language);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    const translateHeadlines = async () => {
      if (data) {
        setTranslating(true);
        const translatedArticles = await Promise.all(
          data?.data?.items?.map(async (item) => {
            let headline = item?.title;

            // const isArabic = /[\u0600-\u06FF]/.test(headline);

            // if (language === "ar" && !isArabic) {
            //   headline = await translateText(item?.title, "en", "ar");
            // }

            // if (language === "en" && isArabic) {
            //   headline = await translateText(item?.title, "ar", "en");
            // }

            return {
              id: item?.id,
              image: item?.image,
              headline,
              source: item?.source,
              date: item?.createdAt,
              shareLinks: item?.shareLinks,
            };
          })
        );
        setTranslating(false);
        setHasMore(data?.data?.pagination?.hasNextPage);
        setReadLaterData(translatedArticles);
      }
    };
    translateHeadlines();
  }, [data, language]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pb: !isLoading && readLaterData?.length === 0 ? "75px" : "15px",
      }}
    >
      <Box
        sx={{
          backgroundColor:
            readLaterData?.length > 0 ? "#EDEDED" : "transparent",
          borderRadius: "9px",
          width: { xs: "90%", md: "75%", lg: "45%" },
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          "@media (min-width:1281px) and (max-width:1550px)": {
            width: "55%",
          },
          p: "15px 15px 25px 15px",
          //   alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "15px",
            p: "15px",
          }}
        >
          {isLoading || translating || isFetching ? (
            [...Array(5)].map((_, index) => (
              <Skeleton
                key={`skeleton-${index}`}
                variant="rounded"
                // width="90%"
                height={143}
                sx={{ borderRadius: "9px" }}
              />
            ))
          ) : readLaterData?.length === 0 && !isLoading ? (
            <Typography sx={{ textAlign: "center", fontSize: getFont("32px") }}>
              No Data Found
            </Typography>
          ) : (
            readLaterData?.map((item, index) =>
              item?.ad ? (
                <Box
                  component={"img"}
                  src={item?.ad}
                  alt="Ad"
                  loading="lazy"
                  key={index}
                />
              ) : (
                <NewsCard
                  key={index}
                  image={item?.image}
                  headline={item?.headline}
                  date={item?.date}
                  source={item?.source}
                  id={item?.id}
                  shareLinks={item?.shareLinks}
                />
              )
            )
          )}
        </Box>
        {hasMore && !isLoading && !translating && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "15px",
            }}
          >
            <Box sx={{ width: "200px", height: "40px" }}>
              <Button variant="gradient">View More</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ReadLater;
