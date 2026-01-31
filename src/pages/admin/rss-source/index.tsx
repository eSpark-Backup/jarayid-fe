import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  Box,
  Chip,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  InfoCard,
  SubHeader,
  TimeFilterTab,
  SearchBar,
  Button,
  RssInfoCard,
} from "../../../components";
import { rssStats as rssStats2 } from "../../../constant";
import {
  useDeleteRssFeedMutation,
  useGetRssFeedQuery,
  useGetRssStatsQuery,
  useRefreshRssFeedMutation,
  useUpdateRssMutation,
} from "../../../services/rss";

const RssSource = () => {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const tabs = ["24 hours", "7 days", "30 days"];
  const [activeTab, setActiveTab] = useState("7 days");
  const dateFrom = useMemo(() => {
    const now = dayjs();
    switch (activeTab) {
      case "24 hours":
        return now.subtract(1, "day").toISOString();
      case "7 days":
        return now.subtract(7, "day").toISOString();
      case "30 days":
        return now.subtract(30, "day").toISOString();
      default:
        return now.subtract(7, "day").toISOString();
    }
  }, [activeTab]);

  const dateTo = useMemo(() => dayjs().toISOString(), []);

  const [rssResourcesData, setRssResourcesData] = useState([]);
  const [rssStats, setRssStats] = useState(Array.from({ length: 3 }));

  const { data, isLoading, isSuccess, isError, error, refetch, isFetching } =
    useGetRssStatsQuery();

  useEffect(() => {
    if (isSuccess) {
      setRssStats(rssStats2(data?.data));
    }
    if (isError) {
      setRssStats(rssStats2(null));
      toast.error(error?.data?.message);
    }
  }, [data, isSuccess, isError, error]);

  const {
    data: rssData,
    isLoading: rssLoading,
    isSuccess: rssIsSuccess,
    isError: rssIsError,
    error: rssError,
  } = useGetRssFeedQuery(
    {
      page: 1,
      pageSize: 30,
      search: search ?? "",
      dateFrom,
      dateTo,
    },
    {
      skip: !dateFrom,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (rssIsSuccess) {
      setRssResourcesData(rssData?.data?.items);
    }
    if (rssIsError) {
      toast.error(rssError?.data?.message);
    }
  }, [rssData, rssIsSuccess, rssIsError, rssError]);

  const [updateRss, { isLoading: isToggleLoading }] = useUpdateRssMutation();
  const handleToggle = (id, value) => {
    setLoadingId(id);
    updateRss({
      id: id,
      credentials: { status: value ? "PUBLISH" : "ARCHIVE" },
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        setLoadingId(null);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        setRssResourcesData((prev) =>
          prev?.map((rss) => {
            if (rss?.id === id) {
              return {
                ...rss,
                status: value ? "PUBLISH" : "ARCHIVE",
              };
            } else {
              return rss;
            }
          })
        );
        refetch();
        setLoadingId(null);
        return;
      }
    });
  };

  const [deleteRss, { isLoading: isDeleteLoading }] =
    useDeleteRssFeedMutation();

  const handleDelete = (id) => {
    setLoadingId(id);
    deleteRss(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        setLoadingId(null);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        setRssResourcesData((prev) => prev?.filter((rss) => rss?.id !== id));
        refetch();
        setLoadingId(null);
      }
    });
  };

  const [refreshRss, { isLoading: isRefreshLoading }] =
    useRefreshRssFeedMutation();
  const handleRefresh = (id) => {
    setLoadingId(id);
    refreshRss(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        setLoadingId(null);
        return;
      }
      if (res?.data) {
        setRssResourcesData((prev) =>
          prev.map((item) =>
            item.id === res?.data?.data?.rssFeed?.id
              ? { ...item, ...res?.data?.data?.rssFeed }
              : item
          )
        );
        toast.success("Rss refresh successfully");
        setLoadingId(null);
      }
    });
  };

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
          <Grid key={stat?.title} size={{ xs: 12, md: 6, lg: 4 }}>
            {isLoading || isFetching ? (
              <Skeleton height={160} />
            ) : (
              <InfoCard {...stat} />
            )}
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          marginTop: "20px",
          background: "#FFF",
          borderRadius: "14px",
          padding: { xs: "32px" },
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
          {!rssLoading ? (
            <Stack
              sx={{ minWidth: "800px" }}
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={"15px"}
              mt="26px"
            >
              {rssResourcesData?.length > 0 ? (
                rssResourcesData.map((item) => {
                  return (
                    <RssInfoCard
                      key={item?.id}
                      handleToggle={handleToggle}
                      loading={isToggleLoading}
                      loadingId={loadingId}
                      handleDelete={handleDelete}
                      isDeleteLoading={isDeleteLoading}
                      handleRefresh={handleRefresh}
                      isRefreshLoading={isRefreshLoading}
                      {...item}
                    />
                  );
                })
              ) : (
                <Typography
                  fontSize={20}
                  fontWeight={900}
                  mt="50px"
                  textAlign="center"
                >
                  No Data Found
                </Typography>
              )}
            </Stack>
          ) : (
            <LinearProgress />
          )}
        </Box>
      </Box>
    </>
  );
};
export default RssSource;
