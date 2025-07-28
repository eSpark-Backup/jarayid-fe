import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { DynamicTable, SubHeader, Button } from "../../../components";
import { columns } from "../../../columns/categories";
import { useGetAllCateoriesQuery } from "../../../services/categories";
import AddCategoryModal from "./add-category-modal";
import EditCategoryModal from "./edit-category-modal";

const Categories = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const {
    data: data2,
    isSuccess,
    isError,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useGetAllCateoriesQuery({
    page,
    pageSize,
  });

  useEffect(() => {
    if (isSuccess) {
      setData(data2?.data?.items);
      setTotal(data2?.data?.pagination?.total);
      return;
    }
    if (isError) {
      toast.error(error?.data?.message);
      return;
    }
  }, [isSuccess, isError, isFetching]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleEdit = (item) => {
    setOpenEdit(item);
  };

  return (
    <>
      <SubHeader
        title="Categories"
        rightNode={
          <Box sx={{ width: "max-content", height: "40px" }}>
            <Button onClick={() => setOpenAdd(true)} variant="gradient">
              + Add Categories
            </Button>
          </Box>
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
        <Typography
          sx={{ fontSize: "18px", fontWeight: 600, color: "#101828", mb: 1 }}
        >
          Categories Table
        </Typography>
        <DynamicTable
          data={data}
          columns={columns()}
          isLoading={isLoading || isFetching}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          handleEdit={handleEdit}
          total={total}
          hideDelete={true}
          hideSwitch={true}
          headerBorder={true}
        />
      </Box>
      <AddCategoryModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={refetch}
      />
      <EditCategoryModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSuccess={refetch}
      />
    </>
  );
};
export default Categories;
