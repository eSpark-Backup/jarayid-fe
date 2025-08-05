import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  Box,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Button, SubHeader, SummaryCard } from "../../../components";
import {
  check,
  eyeRight,
  fileTray,
  lastMonthIcon,
  orderIcon,
  thisMonthIcon,
  usersFilled,
  warning,
} from "../../../assets";
import WeeklyColumnChart from "../../../components/bar-charts";
import StackedAreaChart from "../../../components/stacked-area-chart";
import { useGetDashboardDetailsQuery } from "../../../services/dashboard";
import { useSyncRssFeedMutation } from "../../../services/rss";

const Dashboard = () => {
  const [pageViews, setPageViews] = useState({});
  const [data, setData] = useState({});
  const [overview, setOverview] = useState([]);
  const [articlePublishChartData, setArticlePublishChartData] = useState([]);
  const {
    data: dashboardData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDashboardDetailsQuery();

  useEffect(() => {
    if (isSuccess) {
      const lastMonth = dashboardData?.data?.pageViewTrends?.lastMonth;
      const lastMonthTotalViews = lastMonth?.reduce(
        (sum, item) => sum + item.views,
        0
      );
      const thisMonth = dashboardData?.data?.pageViewTrends?.thisMonth;
      const thisMonthTotalViews = thisMonth?.reduce(
        (sum, item) => sum + item.views,
        0
      );
      const lastMonthTotal = lastMonth?.length;
      const lastMonthStep = Math.floor(lastMonthTotal / 6);

      const lastMonthData = lastMonth
        ?.filter(
          (_, index) =>
            index % lastMonthStep === 0 || index === lastMonthTotal - 1
        )
        .map((item) => item.views);

      const thisMonthTotal = thisMonth.length;
      const pointsToShow = Math.min(thisMonthTotal, 7);

      const thisMonthStep = (thisMonthTotal - 1) / (pointsToShow - 1);

      const thisMonthData = Array.from({ length: pointsToShow }, (_, i) => {
        const index = Math.round(i * thisMonthStep);
        return thisMonth[index]?.views;
      });
      setPageViews({
        lastMonthTotalViews,
        thisMonthTotalViews,
        lastMonthData,
        thisMonthData,
      });
      setData(dashboardData?.data);
      setArticlePublishChartData([
        {
          name: "Monday",
          y: dashboardData?.data?.articlePublishingTrends?.find(
            (item) => item.day === "Monday"
          )?.count,
          drilldown: "mondayDetails",
          color: "#0095FF",
        },
        {
          name: "Tuesday",
          y: dashboardData?.data?.articlePublishingTrends?.find(
            (item) => item.day === "Tuesday"
          )?.count,
          drilldown: "tuesdayDetails",
          color: "#0095FF",
        },
        {
          name: "Wednesday",
          y: dashboardData?.data?.articlePublishingTrends?.find(
            (item) => item.day === "Wednesday"
          )?.count,
          drilldown: "wednesdayDetails",
          color: "#0095FF",
        },
        {
          name: "Thursday",
          y: dashboardData?.data?.articlePublishingTrends?.find(
            (item) => item.day === "Thursday"
          )?.count,
          drilldown: "thursdayDetails",
          color: "#0095FF",
        },
        {
          name: "Friday",
          y: dashboardData?.data?.articlePublishingTrends?.find(
            (item) => item.day === "Friday"
          )?.count,
          drilldown: "fridayDetails",
          color: "#0095FF",
        },
        {
          name: "Saturday",
          y: dashboardData?.data?.articlePublishingTrends?.find(
            (item) => item.day === "Saturday"
          )?.count,
          drilldown: "saturdayDetails",
          color: "#0095FF",
        },
        {
          name: "Sunday",
          y: dashboardData?.data?.articlePublishingTrends?.find(
            (item) => item.day === "Sunday"
          )?.count,
          drilldown: "sundayDetails",
          color: "#0095FF",
        },
      ]);
      setOverview([
        {
          cardBg: "#BFE2FB",
          iconBg: "#004A99",
          icon: orderIcon,
          value: dashboardData?.data?.overview?.totalArticles,
          name: "Total Articles",
          comparison: `${dashboardData?.data?.overview?.articlesChangePercent}% from yesterday`,
        },
        {
          cardBg: "#FFF4DE",
          iconBg: "#FF947A",
          icon: usersFilled,
          value: dashboardData?.data?.overview?.activeUsers,
          name: "Active Users",
          comparison: `${dashboardData?.data?.overview?.usersChangePercent}% from yesterday`,
        },
        {
          cardBg: "#DCFCE7",
          iconBg: "#3CD856",
          icon: fileTray,
          value: dashboardData?.data?.overview?.totalCategories,
          name: "Categories",
          comparison: `${dashboardData?.data?.overview?.categoriesChangePercent}% from yesterday`,
        },
        {
          cardBg: "#F3E8FF",
          iconBg: "#BF83FF",
          icon: eyeRight,
          value: dashboardData?.data?.overview?.pageViews,
          name: "Page view",
          comparison: `${dashboardData?.data?.overview?.viewsChangePercent}% from yesterday`,
        },
      ]);
      return;
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error, dashboardData]);

  const [sync, { isLoading: syncLoading }] = useSyncRssFeedMutation();

  const handleSync = () => {
    sync().then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
      }
    });
  };

  return (
    <>
      <SubHeader
        title="Dashboard"
        rightNode={
          <Box sx={{ width: "142px", height: "39px" }}>
            <Button
              disabled={syncLoading}
              loading={syncLoading}
              onClick={handleSync}
              variant="gradient"
            >
              Sync RSS
            </Button>
          </Box>
        }
      />
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            minHeight: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
                sx={{
                  color: "#05004E",
                  fontSize: "21.11px",
                  fontWeight: "bold",
                }}
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
                {overview?.map((item, index) => (
                  <SummaryCard
                    cardBg={item?.cardBg}
                    iconBg={item?.iconBg}
                    icon={item?.icon}
                    value={item?.value}
                    name={item?.name}
                    comparison={item?.comparison}
                    key={item?.name}
                  />
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper variant="adminPaper">
              <Typography
                sx={{
                  fontSize: "21.11px",
                  color: "#05004E",
                  fontWeight: "bold",
                }}
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
                {data?.systemStatus?.map((item, index) => (
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
                        src={item?.status === "Healthy" ? check : warning}
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
                        {item?.service}
                      </Typography>
                    </Box>
                    <Chip
                      label={item?.status}
                      variant={
                        item?.status === "Healthy" ? "darkblue" : "transparent"
                      }
                    />
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
              <WeeklyColumnChart data={articlePublishChartData} />
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
              <StackedAreaChart
                data={{
                  lastMonth: pageViews?.lastMonthData,
                  thisMonth: pageViews?.thisMonthData,
                }}
              />
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
                      {pageViews?.lastMonthTotalViews}
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
                      {pageViews?.thisMonthTotalViews}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 7, lg: 4 }}>
            <Paper variant="adminPaper">
              <Typography
                sx={{
                  fontSize: "21.11px",
                  color: "#05004E",
                  fontWeight: "bold",
                }}
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
                {data?.recentArticles?.map((item) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "2px",
                    }}
                    key={item?.publishedAt}
                  >
                    <Typography
                      sx={{
                        color: "#252525",
                        fontSize: "16px",
                        fontWeight: "600",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        width: { xs: "100%", lg: "250px", xl: "500px" },
                      }}
                    >
                      {item?.title}
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
                        {`${item?.views} views • ${dayjs(
                          item?.publishedAt
                        ).fromNow()}`}
                      </Typography>
                      <Chip variant="blue" label={item?.status} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default Dashboard;
