import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DynamicTable, SubHeader, Button } from "../../../components";
import { columns } from "../../../columns/categories";
import { categoriesData } from "../../../constant";

const Categories = () => {
  const [data] = useState(categoriesData || []);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(11);
  const [total] = useState(11);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleEdit = (item) => {
    console.log(item);
  };

  return (
    <>
      <SubHeader
        title="Categories"
        rightNode={
          <Box sx={{ width: "max-content", height: "40px" }}>
            <Button variant="gradient">+ Add Categories</Button>
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
          isLoading={false}
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
    </>
  );
};
export default Categories;
