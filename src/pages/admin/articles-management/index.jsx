import { useEffect, useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  DynamicTable,
  SubHeader,
  Dropdown,
  SearchBar,
} from "../../../components";
import { columns } from "../../../columns/articles";
import { articlesData } from "../../../constant";

const ArticlesManagement = () => {
  const catOptions = [
    { label: "Lebanon", value: "lebanon" },
    { label: "Egypt", value: "egypt" },
  ];
  const statusOptions = [
    { label: "Published", value: "published" },
    { label: "Unpublished", value: "unpublished" },
  ];
  const [status, setStatus] = useState("");
  const [cat, setCat] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(articlesData || []);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(11);
  const [total] = useState(11);
  const [selectedRows, setSelectedRows] = useState([]);
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;

  const [sortBy, setSortBy] = useState("createAt");
  const [sortDirection, setSortDirection] = useState("asc");

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
    const filtered = articlesData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setData(filtered);
    setPage(1);
  }, [search]);

  useEffect(() => {
    let sorted = [...articlesData];

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
export default ArticlesManagement;
