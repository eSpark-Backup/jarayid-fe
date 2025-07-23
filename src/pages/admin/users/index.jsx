import { useEffect, useState } from "react";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import {
  DynamicTable,
  InfoCard,
  SubHeader,
  TimeFilterTab,
  Dropdown,
  SearchBar,
  DateRangePicker,
} from "../../../components";
import { columns } from "../../../columns/user";
import { usersData, userStats } from "../../../constant";

const Users = () => {
  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Guest", value: "guest" },
  ];
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(usersData || []);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(11);
  const [total] = useState(11);
  const [selectedRows, setSelectedRows] = useState([]);
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;

  const [sortBy, setSortBy] = useState("email");
  const [sortDirection, setSortDirection] = useState("asc");
  const tabs = ["24 hours", "7 days", "30 days"];
  const [activeTab, setActiveTab] = useState("7 days");

  const handleSort = (columnKey) => {
    if (sortBy === columnKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(columnKey);
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

  const handleDelete = (item) => {
    console.log(item);
  };

  useEffect(() => {
    const filtered = usersData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setData(filtered);
    setPage(1);
  }, [search]);

  useEffect(() => {
    let sorted = [...usersData];

    if (sortBy) {
      sorted.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue < bValue) return sortDirection === "desc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    const filtered = sorted.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );

    setData(filtered);
    setPage(1);
  }, [search, sortBy, sortDirection]);

  return (
    <>
      <SubHeader title="User  Management" />
      <Grid
        sx={{
          alignItems: "flex-start",
          mt: "18px",
        }}
        container
        spacing={2}
      >
        {userStats?.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, md: 6, lg: 3 }}>
            <InfoCard {...stat} />
          </Grid>
        ))}
      </Grid>
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
          justifyContent="flex-start"
          gap="8px"
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: 600, color: "#101828" }}
          >
            Users
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
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 400,
            color: "#4E4852",
            mt: "4px",
          }}
        >
          Manage user accounts, permissions, and access levels.
        </Typography>
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
              setActiveTab={activeTab}
            />
            <DateRangePicker
              placeholder="Select range"
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
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
              <Dropdown
                placeholder="Status"
                options={statusOptions}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Stack>
          </Stack>
        </Stack>
        <DynamicTable
          data={data}
          columns={columns()}
          isLoading={false}
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
    </>
  );
};
export default Users;
