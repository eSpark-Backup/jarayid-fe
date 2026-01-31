import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import {
  DynamicTable,
  SubHeader,
  TimeFilterTab,
  Dropdown,
  SearchBar,
  DateRangePicker,
} from "../../../components";
import { columns } from "../../../columns/user";
import {
  useBanUnbanUserMutation,
  useDeleteUserMutation,
  useGetAllUsersForAdminQuery,
} from "../../../services/user";
import DeleteModal from "../../../components/delete-modal";

const Adfree = () => {
  const roleOptions = [
    { label: "Admin", value: "ADMIN" },
    { label: "User", value: "USER" },
  ];
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [openDelete, setOpenDelete] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const isAllSelected =
    data?.length > 0 && selectedRows.length === data?.length;

  const [sortBy, setSortBy] = useState("email");
  const [sortDirection, setSortDirection] = useState("asc");
  const tabs = ["24 hours", "7 days", "30 days"];
  const [activeTab, setActiveTab] = useState("7 days");

  const now = dayjs();
  const defaultDateFrom = useMemo(() => {
    switch (activeTab) {
      case "24 hours":
        return now.subtract(1, "day").format("YYYY-MM-DD");
      case "7 days":
        return now.subtract(7, "day").format("YYYY-MM-DD");
      case "30 days":
        return now.subtract(30, "day").format("YYYY-MM-DD");
      default:
        return now.subtract(7, "day").format("YYYY-MM-DD");
    }
  }, [activeTab]);

  const defaultDateTo = useMemo(() => now.format("YYYY-MM-DD"), []);

  const queryArgs = useMemo(() => {
    const base = {
      page,
      pageSize,
      search: search ?? "",
      sortBy,
      sortDirection,
      status: "trial",
      ...(role !== "" && { role }),
    };

    return {
      ...base,
      dateFrom: defaultDateFrom,
      dateTo: defaultDateTo,
    };
  }, [
    page,
    pageSize,
    search,
    sortBy,
    sortDirection,
    role,
    defaultDateFrom,
    defaultDateTo,
  ]);

  const handleSort = (columnKey) => {
    if (sortBy === columnKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // setSortBy(columnKey);
      setSortDirection("asc");
    }
  };

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

  const {
    data: data2,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAllUsersForAdminQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setData(
        data2?.data?.users?.map((item) => {
          return {
            ...item,
            user:
              typeof item?.name === "string"
                ? item?.name
                : typeof item?.name === "object"
                ? item?.name?.en
                : "",
            joinDate: dayjs(item?.createdAt).format("DD/MM/YY"),
            lastLogin: item?.lastLoginAt
              ? dayjs(item?.lastLoginAt).format("DD/MM/YY")
              : "",
            active: item?.isBanned ? true : false,
            status: {
              label: item?.subscription?.isPremium ? "Premium" : "Normal",
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

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleDeleteFinal = () => {
    deleteUser({ userIds: openDelete }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        if (
          res?.data?.message ===
          "No users were deleted (all were already banned or are admin users)"
        ) {
          toast.error(res?.data?.message);
          setOpenDelete(false);
        } else {
          toast.success(res?.data?.message);
          setOpenDelete(false);
          refetch();
        }
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
      <SubHeader title="Ad-free subscriptions" />
      <Box
        sx={{
          marginTop: "20px",
          background: "#FFF",
          borderRadius: "14px",
          padding: { xs: "32px" },
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
              Subscription Based Users
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
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "flex-start", lg: "center" }}
          justifyContent="space-between"
          gap="8px"
          mt={2}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="center"
            sx={{ width: { xs: "100%", sm: "max-content" } }}
            gap="8px"
          >
            <TimeFilterTab
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Stack>
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
                placeholder="Role"
                options={roleOptions}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Stack>
          </Stack>
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
          onSort={handleSort}
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
        heading="Are you sure you want to Delete?"
        desc={`Are you sure you want to delete ${
          openDelete?.length > 1 ? "these" : "this"
        } User?`}
        confirmText="Delete"
        loading={deleteLoading}
      />
    </>
  );
};
export default Adfree;
