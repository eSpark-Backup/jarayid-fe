import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import {
  DynamicTable,
  SubHeader,
  Dropdown,
  SearchBar,
} from "../../../components";
import { columns } from "../../../columns/articles";
import {
  useDeleteArticleMutation,
  useGetAllArticlesForAdminQuery,
} from "../../../services/articles";
import DeleteModal from "../../../components/delete-modal";

const ArticlesManagement = () => {
  const { category } = useSelector((state) => state?.category);
  const [catOptions, setCatOptions] = useState(
    category?.map((cat) => {
      return { label: cat?.name, value: cat?.id };
    }) || []
  );
  useEffect(() => {
    setCatOptions(
      category?.map((cat) => {
        return { label: cat?.name, value: cat?.id };
      }) || []
    );
  }, [category]);
  const statusOptions = [
    { label: "Published", value: true },
    { label: "Unpublished", value: false },
  ];
  const [status, setStatus] = useState("");
  const [cat, setCat] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [openDelete, setOpenDelete] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;

  const [sortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const {
    data: data2,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAllArticlesForAdminQuery(
    {
      page,
      pageSize,
      search: search ?? "",
      sortBy: "createdAt",
      sortOrder: sortDirection,
      ...(status !== "" && { status }),
      ...(cat !== "" && { cat }),
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      setData(
        data2?.data?.items?.map((item) => {
          return {
            ...item,
            date: dayjs(item?.createdAt).format("DD/MM/YYYY"),
            cat: item?.category?.name,
            articleTitle: item?.title,
            commentCount: item?._count?.comments,
            status: {
              label: item?.status ? "Published" : "Unpublished",
              variant: "blue",
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

  const handleSelectAll = () => {
    setSelectedRows(isAllSelected ? [] : data.map((item) => item.id));
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [deleteArticle, { isLoading: deleteLoading }] =
    useDeleteArticleMutation();

  const handleDeleteFinal = () => {
    deleteArticle({ articleIds: openDelete }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        setOpenDelete(false);
        refetch();
        return;
      }
    });
  };

  const handleDelete = (item) => {
    setOpenDelete([item?.id]);
  };

  const deleteSelected = () => {
    setOpenDelete(selectedRows);
  };

  return (
    <>
      <SubHeader
        title="Articles Management"
        rightNode={
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="center"
            gap="8px"
            sx={{ width: { xs: "100%", sm: "max-content" } }}
          >
            <Box sx={{ width: { xs: "100%", sm: "205px" } }}>
              <SearchBar onChange={(e) => setSearch(e)} />
            </Box>
            <Stack
              direction="row"
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="center"
              gap="8px"
            >
              <Dropdown
                placeholder="All Categories"
                options={catOptions}
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              />
              <Dropdown
                placeholder="Status"
                options={statusOptions}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Stack>
          </Stack>
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap="8px"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            gap="8px"
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: 600, color: "#101828" }}
            >
              Articles
            </Typography>
            <Chip
              sx={{
                padding: "6px",
                background: "#D7E4F2",
                border: 0,
                width: "max-content",
                ".MuiChip-label": { fontWeight: 700 },
              }}
              label="25002"
              variant="blue"
            />
          </Stack>
          {selectedRows?.length > 0 && (
            <Box sx={{ width: "max-content", height: "39px" }}>
              <Button onClick={deleteSelected} variant="gradient">
                Delete Selected
              </Button>
            </Box>
          )}
        </Stack>
        <DynamicTable
          data={data}
          columns={columns()}
          isLoading={isLoading || isFetching}
          handleDelete={handleDelete}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          total={total}
          hideEdit={true}
          selectable={true}
          selectedRows={selectedRows}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          isAllSelected={isAllSelected}
          onSort={() =>
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
          }
          sortBy={sortBy}
          sortDirection={sortDirection}
          hideSwitch={true}
        />
      </Box>
      <DeleteModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleCancel={() => setOpenDelete(false)}
        handleConfirm={handleDeleteFinal}
        heading="Are you sure you want to Delete ?"
        desc="Deleting is permanent and your Article will automatically be deleted after 30 days if you do not log in again."
        confirmText="Delete"
        loading={deleteLoading}
      />
    </>
  );
};
export default ArticlesManagement;
