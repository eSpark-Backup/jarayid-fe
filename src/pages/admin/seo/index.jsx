import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import { DynamicTable, SubHeader } from "../../../components";
import { columns } from "../../../columns/seo";
import { useGetAllCateoriesQuery } from "../../../services/categories";
import AddSeoCategoryModal from "./add-seo-category-modal";
import EditSeoCategoryModal from "./edit-seo-category-modal";

const SeoManagement = () => {
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
  } = useGetAllCateoriesQuery(
    {
      page,
      pageSize,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      setData(
        data2?.data?.items?.map((item) => {
          return {
            ...item,
            metaTitle:
              typeof item?.seoMeta === "string"
                ? JSON.parse(item?.seoMeta)?.title
                : "" || "",
            metaDescription:
              typeof item?.seoMeta === "string"
                ? JSON.parse(item?.seoMeta)?.description
                : "" || "",
            metaCanonicalUrl:
              typeof item?.seoMeta === "string"
                ? JSON.parse(item?.seoMeta)?.canonicalUrl
                : "" || "",
          };
        })
      );
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
        title="SEO Management"
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
            Add New Seo Category
          </Button>
        }
      />
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
          isLoading={isLoading || isFetching}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          total={total}
          hideDelete={true}
          handleEdit={handleEdit}
          hideSwitch={true}
          headerBorder={true}
        />
      </Box>
      <AddSeoCategoryModal
        categories={data || []}
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={refetch}
      />
      <EditSeoCategoryModal
        categories={data || []}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSuccess={refetch}
      />
    </>
  );
};
export default SeoManagement;
