import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DynamicTable, SubHeader } from "../../../components";
import { columns } from "../../../columns/cookies";
import {
  useGetCookiesQuery,
  useDeleteCookieMutation,
} from "../../../services/cookies";
import DeleteModal from "../../../components/delete-modal";

const Cookies = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleDelete = (item) => {
    setOpenDelete(item?.id);
  };

  const {
    data: cookiesData,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetCookiesQuery({ page, pageSize });

  useEffect(() => {
    if (isSuccess) {
      setData(cookiesData?.data?.cookies);
      setTotal(cookiesData?.data?.pagination?.total);
      return;
    }
    if (isError) {
      toast.error(error?.data?.message);
      return;
    }
  }, [isSuccess, isError, cookiesData]);

  const [deleteCookie, { isLoading: deleteLoading }] =
    useDeleteCookieMutation();
  const handleDeleteFinal = () => {
    deleteCookie(openDelete).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        setOpenDelete(false);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        setOpenDelete(false);
        refetch();
        return;
      }
    });
  };

  return (
    <>
      <SubHeader title="Cookies" />
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
          handleDelete={handleDelete}
          total={total}
          hideEdit={true}
          hideSwitch={true}
          headerBorder={true}
          isLeft={true}
        />
      </Box>
      <DeleteModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleCancel={() => setOpenDelete(false)}
        handleConfirm={handleDeleteFinal}
        heading="Are you sure you want to Delete?"
        desc={`Are you sure you want to delete cookie?`}
        confirmText="Delete"
        loading={deleteLoading}
      />
    </>
  );
};
export default Cookies;
