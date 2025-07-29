import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import { DynamicTable, SubHeader } from "../../../components";
import { columns } from "../../../columns/manual-posting";
import { useGetAllArticlesForAdminQuery } from "../../../services/articles";
import AddPostModal from "./add-post";
import EditPostModal from "./edit-post";

const ManualPosting = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleEdit = (item) => {
    setOpenEdit(item);
  };

  const {
    data: data2,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAllArticlesForAdminQuery({ page, pageSize });

  useEffect(() => {
    if (isSuccess) {
      setData(
        data2?.data?.items?.map((item) => {
          return {
            ...item,
            publishedDate: dayjs(item?.createdAt).format("MMMM DD,YYYY"),
            category: item?.category?.name,
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
      <SubHeader
        title="Manual News posting"
        rightNode={
          <Button
            onClick={() => setOpenAdd(true)}
            variant="contained"
            color="primary"
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: "125px",
              height: "35px",
              backgroundColor: "#007BFF",
              fontSize: "12px",
              textTransform: "none",
            }}
          >
            Add New Post
          </Button>
        }
      />
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
          isLoading={isLoading || isFetching}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          total={total}
          handleEdit={handleEdit}
          hideDelete={true}
          hideSwitch={true}
          headerBorder={true}
        />
      </Box>
      <AddPostModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={refetch}
      />
      <EditPostModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSuccess={refetch}
      />
    </>
  );
};
export default ManualPosting;
