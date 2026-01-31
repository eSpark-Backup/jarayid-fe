import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Box, Button, Stack } from "@mui/material";
import { DynamicTable, SubHeader, Dropdown } from "../../../components";
import { columns } from "../../../columns/rss-source-management";
import {
  useGetAllRssFeedForAdminQuery,
  useUpdateRssMutation,
} from "../../../services/rss";
import AddRssModal from "./add-rss";
import EditRssModal from "./edit-rss";

const RssSourceManagement = () => {
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
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [cat, setCat] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loadingId, setLoadingId] = useState(null);

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
  } = useGetAllRssFeedForAdminQuery(
    {
      page,
      pageSize,
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
            cat: item?.category?.name,
            rssStatus: {
              label: item?.active ? "Active" : "Refresh Inactive",
              variant: item?.active ? "green" : "red",
            },
            active: item?.status === "PUBLISH" ? true : false,
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

  const [updateRss, { isLoading: isToggleLoading }] = useUpdateRssMutation();
  const handleToggle = (item, value) => {
    setLoadingId(item?.id);
    updateRss({
      id: item?.id,
      credentials: { status: value ? "PUBLISH" : "ARCHIVE" },
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        setLoadingId(null);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        setData((prev) =>
          prev?.map((rss) => {
            if (rss?.id === item?.id) {
              return {
                ...rss,
                active: value,
              };
            } else {
              return rss;
            }
          })
        );
        setLoadingId(null);
        return;
      }
    });
  };

  return (
    <>
      <SubHeader
        title="RSS Source Management"
        rightNode={
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="center"
            gap="8px"
            sx={{ width: { xs: "100%", sm: "max-content" } }}
          >
            <Box sx={{ width: "max-content", height: "39px" }}>
              <Button
                onClick={() => setOpenAdd(true)}
                variant="gradient"
                sx={{ border: "none !important" }}
              >
                + Add RSS Source
              </Button>
            </Box>
            <Stack
              direction="row"
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="center"
              gap="8px"
            >
              <Dropdown
                placeholder="choose category"
                options={catOptions}
                value={cat}
                onChange={(e) => setCat(e.target.value)}
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
          padding: { xs: "32px" },
        }}
      >
        <DynamicTable
          data={data}
          columns={columns()}
          isLoading={isLoading || isFetching}
          isToggleLoading={isToggleLoading}
          loadingId={loadingId}
          handleEdit={handleEdit}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          total={total}
          hideDelete={true}
          headerBorder={true}
          onToggle={handleToggle}
        />
      </Box>
      <AddRssModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={refetch}
      />
      <EditRssModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSuccess={refetch}
      />
    </>
  );
};
export default RssSourceManagement;
