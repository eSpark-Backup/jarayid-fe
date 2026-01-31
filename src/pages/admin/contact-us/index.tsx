import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { DynamicTable, SubHeader } from "../../../components";
import { columns } from "../../../columns/contact-us";
import { useGetContactsQuery } from "../../../services/contact-us";
import dayjs from "dayjs";
import CloseIcon from "../../../assets/icons/cancel.svg";

const ContactUs = () => {
  const [open, setOpen] = useState(null);
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
  } = useGetContactsQuery(
    { page, pageSize },
    { refetchOnMountOrArgChange: true }
  );
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

  const handleView = (item) => {
    setOpen(item);
  };

  return (
    <>
      <SubHeader title="Contact Us" />
      <Box
        sx={{
          marginTop: "20px",
          background: "#FFF",
          borderRadius: "14px",
          padding: { xs: "32px" },
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
          showView={true}
          handleView={handleView}
        />
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(null)}
        PaperProps={{
          sx: {
            width: `700px !important`,
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          color="#3F3F40"
          fontSize="30px"
          fontWeight="bold"
          sx={{
            position: "relative",
            pr: "48px",
          }}
        >
          Message Preview
          <IconButton
            onClick={() => setOpen(null)}
            sx={{
              position: "absolute",
              right: 16,
              top: 12,
            }}
          >
            <img src={CloseIcon}></img>
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: "10px !important",
          }}
        >
          <Typography sx={{ fontSize: "18px" }}>{open?.message}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ContactUs;
