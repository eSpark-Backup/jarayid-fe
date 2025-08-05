import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DynamicTable, SubHeader, Button } from "../../../components";
import { columns } from "../../../columns/external-links";
import {
  useDeleteExternalLinksMutation,
  useGetAllExternalLinksQuery,
} from "../../../services/external-links";
import AddExternalLinkModal from "./add-external-link";
import DeleteModal from "../../../components/delete-modal";

const ExternalLink = () => {
  const [openAdd, setOpenAdd] = useState(false);
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
    data: data2,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAllExternalLinksQuery({ page, pageSize });

  useEffect(() => {
    if (isSuccess) {
      setData(data2?.data?.items);
      setTotal(data2?.data?.pagination?.total);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data2, error]);

  const [deleteExternalLink, { isLoading: isDeleteLoading }] =
    useDeleteExternalLinksMutation();
  const handleDeleteFinal = () => {
    deleteExternalLink(openDelete).then((res) => {
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
      <SubHeader
        title="External link"
        rightNode={
          <Box sx={{ width: "159px", height: "40px" }}>
            <Button onClick={() => setOpenAdd(true)} variant="gradient">
              Add New Tool
            </Button>
          </Box>
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
          handleDelete={handleDelete}
          total={total}
          hideEdit={true}
          hideSwitch={true}
          headerBorder={true}
          isLeft={true}
        />
      </Box>
      <AddExternalLinkModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={refetch}
      />
      <DeleteModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleCancel={() => setOpenDelete(false)}
        handleConfirm={handleDeleteFinal}
        heading="Are you sure you want to Delete?"
        desc={`Are you sure you want to delete this external link?`}
        confirmText="Delete"
        loading={isDeleteLoading}
      />
    </>
  );
};
export default ExternalLink;
