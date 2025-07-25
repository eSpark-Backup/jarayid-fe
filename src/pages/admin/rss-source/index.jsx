import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import {
  InfoCard,
  SubHeader,
  TimeFilterTab,
  SearchBar,
  Button,
  RssInfoCard,
} from "../../../components";
import { rssResourcesData, rssStats } from "../../../constant";

const RssSource = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const tabs = ["24 hours", "7 days", "30 days"];
  const [activeTab, setActiveTab] = useState("7 days");

  return (
    <>
      <SubHeader
        title="RSS Source Management"
        rightNode={
          <Box sx={{ width: "159px", height: "39px" }}>
            <Button
              onClick={() => navigate(`/admin/rss-source-management/detail`)}
              variant="gradient"
            >
              View More
            </Button>
          </Box>
        }
      />
      <Grid
        sx={{
          alignItems: "flex-start",
          mt: "18px",
        }}
        container
        spacing={2}
      >
        {rssStats?.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, md: 6, lg: 3 }}>
            <InfoCard {...stat} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          marginTop: "20px",
          background: "#FFF",
          borderRadius: "14px",
          padding: { xs: "32px", sm: "32px 41px 32px 37px" },
        }}
      >
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems="flex-start"
          justifyContent="space-between"
          gap="8px"
          mt={2}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              gap="8px"
            >
              <Typography
                sx={{ fontSize: "18px", fontWeight: 600, color: "#101828" }}
              >
                RSS Sources
              </Typography>
              <Chip
                sx={{
                  padding: "6px",
                  background: "#D7E4F2",
                  border: 0,
                  width: "max-content",
                  ".MuiChip-label": { fontWeight: 700 },
                }}
                label="04"
                variant="blue"
              />
            </Stack>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 400,
                color: "#4E4852",
                mt: "4px",
              }}
            >
              Manage Sources
            </Typography>
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "205px" } }}>
            <SearchBar onChange={(e) => setSearch(e)} />
          </Box>
        </Stack>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "flex-start", lg: "center" }}
          justifyContent="space-between"
          gap="8px"
          mt={2}
        >
          <TimeFilterTab
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </Stack>
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Stack
            sx={{ minWidth: "800px" }}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={"15px"}
            mt="26px"
          >
            {rssResourcesData.map((item) => {
              return <RssInfoCard key={item?.id} {...item} />;
            })}
          </Stack>
        </Box>
      </Box>
    </>
  );
};
export default RssSource;
