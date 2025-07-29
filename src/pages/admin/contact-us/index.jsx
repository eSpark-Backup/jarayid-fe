import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DynamicTable, SubHeader } from "../../../components";
import { columns } from "../../../columns/contact-us";
import { useGetContactsQuery } from "../../../services/contact-us";
import dayjs from "dayjs";

const ContactUs = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const {
    data: contactData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetContactsQuery({ page, pageSize });
  useEffect(() => {
    if (isSuccess) {
      setData(
        contactData?.data?.items?.map((item) => {
          return { ...item, date: dayjs(item?.createdAt).format("YYYY-MM-DD") };
        })
      );
      setTotal(contactData?.data?.pagination?.total);
      return;
    }
    if (isError) {
      toast.error(error?.data?.message);
      return;
    }
  }, [isSuccess, isError, contactData]);

  return (
    <>
      <SubHeader title="Contact Us" />
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
          hideEdit={true}
          total={total}
          hideDelete={true}
          hideSwitch={true}
          headerBorder={true}
        />
      </Box>
    </>
  );
};
export default ContactUs;
