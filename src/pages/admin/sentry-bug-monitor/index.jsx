import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { DynamicTable, SubHeader } from "../../../components";
import { columns } from "../../../columns/sentry-bug-monitor";
import { useGetAllBugsQuery } from "../../../services/sentry-bug";

const SentryBugMonitor = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const {
    data: bugData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllBugsQuery();

  useEffect(() => {
    if (isSuccess) {
      setData(
        bugData?.data?.items?.map((item) => {
          return {
            ...item,
            level: {
              label: item?.level,
              variant:
                item?.level === "warn"
                  ? "yellow"
                  : item?.level === "error"
                  ? "red"
                  : "green",
            },
            time: dayjs(item?.createdAt).format("HH:mm:ss")
          };
        })
      );
      setTotal(bugData?.data?.pagination?.total);
      return;
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error, bugData]);

  return (
    <>
      <SubHeader title="Sentry Bug Monitoring" />
      <Box
        sx={{
          marginTop: "20px",
          background: "#FFF",
          borderRadius: "14px",
          padding: { xs: "32px", sm: "32px 77px 32px 32px" },
        }}
      >
        <DynamicTable
          data={data}
          columns={columns()}
          isLoading={isLoading}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          total={total}
          hideEdit={true}
          hideDelete={true}
          hideSwitch={true}
          headerBorder={true}
        />
      </Box>
    </>
  );
};
export default SentryBugMonitor;
