import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import { Button, SubHeader, SummaryCard } from "../../../components";
import {
  stackedChartData,
  SummaryCardContent,
  systemStatuses,
} from "../../../constant";
import { check, lastMonthIcon, thisMonthIcon } from "../../../assets";
import WeeklyColumnChart from "../../../components/bar-charts";
import StackedAreaChart from "../../../components/stacked-area-chart";

const Dashboard = () => {
  return (
    <>
      <SubHeader
        title="Dashboard"
        rightNode={
          <Box sx={{ width: "142px", height: "39px" }}>
            <Button variant="gradient">Sync RSS</Button>
          </Box>
        }
      />
      <Grid
        sx={{
          alignItems: "flex-start",
          mt: "30px",
        }}
        container
        spacing={2}
      >
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper variant="adminPaper" sx={{ px: "25px" }}>
            <Typography
              sx={{ color: "#05004E", fontSize: "21.11px", fontWeight: "bold" }}
            >
              Overview
            </Typography>
            <Typography
              sx={{ color: "#737791", fontSize: "13.58px", mt: "5px" }}
            >
              Summary
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{
                mt: "15px",
              }}
            >
              {SummaryCardContent?.map((item, index) => (
                <SummaryCard
                  cardBg={item?.cardBg}
                  iconBg={item?.iconBg}
                  icon={item?.icon}
                  value={item?.value}
                  name={item?.name}
                  comparison={item?.comparison}
                  key={index}
                />
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper variant="adminPaper">
            <Typography
              sx={{ fontSize: "21.11px", color: "#05004E", fontWeight: "bold" }}
            >
              System Status
            </Typography>
            <Box
              sx={{
                mt: "30px",
                display: "flex",
                flexDirection: "column",
                rowGap: { xs: "30px", md: "36px", lg: "30px" },
              }}
            >
              {systemStatuses?.map((item, index) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Box sx={{ display: "flex", columnGap: "20px" }}>
                    <Box
                      component={"img"}
                      src={item?.icon}
                      alt="Status Icon"
                      loading="lazy"
                    />
                    <Typography
                      sx={{
                        color: "#252525",
                        fontSize: "16.76px",
                        fontWeight: "600",
                      }}
                    >
                      {item?.heading}
                    </Typography>
                  </Box>
                  <Chip label={item?.chipText} variant={item?.variant} />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4.5 }}>
          <Paper variant="adminPaper">
            <Typography
              sx={{
                color: "#05004E",
                fontSize: "21.11px",
                mb: "20px",
                fontWeight: "bold",
              }}
            >
              Article Publishing Trends
            </Typography>
            <WeeklyColumnChart />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 5, lg: 3.5 }}>
          <Paper variant="adminPaper" sx={{ position: "relative" }}>
            <Typography
              sx={{
                color: "#05004E",
                fontSize: "21.11px",
                mb: "20px",
                fontWeight: "bold",
              }}
            >
              Page Views Over Time
            </Typography>
            <StackedAreaChart data={stackedChartData} />
            <Box
              sx={{
                position: "absolute",
                bottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                columnGap: "15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  columnGap: "5px",
                  alignItems: "baseline",
                }}
              >
                <img src={lastMonthIcon} alt="Icon" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#96A5B8",
                      fontSize: "10.67px",
                    }}
                  >
                    Last Month
                  </Typography>
                  <Typography
                    sx={{
                      color: "#222B45",
                      fontSize: "9.33px",
                    }}
                  >
                    3,004
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "0.66px",
                  height: "16px",
                  backgroundColor: "#BDC9D3",
                  mb: "10px",
                }}
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "5px",
                  alignItems: "baseline",
                }}
              >
                <img src={thisMonthIcon} alt="Icon" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#96A5B8",
                      fontSize: "10.67px",
                    }}
                  >
                    This Month
                  </Typography>
                  <Typography
                    sx={{
                      color: "#222B45",
                      fontSize: "9.33px",
                    }}
                  >
                    4,504
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 7, lg: 4 }}>
          <Paper variant="adminPaper">
            <Typography
              sx={{ fontSize: "21.11px", color: "#05004E", fontWeight: "bold" }}
            >
              Recent Articles
            </Typography>
            <Box
              sx={{
                mt: "20px",
                display: "flex",
                flexDirection: "column",
                rowGap: "14px",
              }}
            >
              {[1, 2, 3, 4]?.map((item) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "2px",
                  }}
                  key={item}
                >
                  <Typography
                    sx={{
                      color: "#252525",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Climate Change Global Impact
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12.34px",
                        color: "#A098AE",
                        fontWeight: "600",
                      }}
                    >
                      856 views • 4 hours ago
                    </Typography>
                    <Chip variant="blue" label="Published" />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
