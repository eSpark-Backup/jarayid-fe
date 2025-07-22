import { Box } from "@mui/material";
import { newsContent } from "../../../constant";
import { Button, NewsCard } from "../../../components";

const ReadLater = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pb: "15px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#EDEDED",
          borderTopRightRadius: "9px",
          borderTopLeftRadius: "9px",
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
        {newsContent?.map((item, index) =>
          item?.ad ? (
            <></>
          ) : (
            <NewsCard
              key={index}
              image={item?.image}
              headline={item?.headline}
              date={item?.date}
              source={item?.source}
              id={item?.id}
            />
          )
        )}
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
      </Box>
    </Box>
  );
};

export default ReadLater;
