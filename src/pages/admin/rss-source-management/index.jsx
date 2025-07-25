import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { DynamicTable, SubHeader, Dropdown } from "../../../components";
import { columns } from "../../../columns/rss-source-management";
import { rssSourceManagementData } from "../../../constant";

const RssSourceManagement = () => {
  const catOptions = [
    { label: "Labenon", value: "lebanon" },
    { label: "Egypt", value: "egypt" },
  ];
  const [cat, setCat] = useState("");
  const [data, setData] = useState(rssSourceManagementData || []);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(11);
  const [total] = useState(11);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleEdit = (item) => {
    console.log(item);
  };

  const handleToggle = (item, value) => {
    setData(
      data.map((rss) => {
        return rss.id === item.id ? { ...rss, active: value } : rss;
      })
    );
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
              <Button variant="gradient">+ Add RSS Source</Button>
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
          padding: { xs: "32px", sm: "32px 77px 32px 32px" },
        }}
      >
        <DynamicTable
          data={data}
          columns={columns()}
          isLoading={false}
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
    </>
  );
};
export default RssSourceManagement;
