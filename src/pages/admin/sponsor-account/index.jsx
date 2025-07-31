import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DynamicTable, SubHeader } from "../../../components";
import { columns } from "../../../columns/sponsor-account";
import { useGetAllSponsorAccountQuery } from "../../../services/sponsor-account";
import { toast } from "react-toastify";

const SponsorAccount = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const {
    data: data2,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllSponsorAccountQuery({ page, pageSize });

  useEffect(() => {
    if (isSuccess) {
      setData(
        data2?.data?.items?.map((item) => {
          return {
            ...item,
            status: {
              label: item?.status === "ACTIVE" ? "Active" : "Banned",
              variant: item?.status === "ACTIVE" ? "green" : "red",
            },
          };
        })
      );
      setTotal(data2?.data?.pagination?.total);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data2]);

  return (
    <>
      <SubHeader title="Sponsor Account" />
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
export default SponsorAccount;
