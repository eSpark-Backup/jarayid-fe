import { useState } from "react";
import { Box, Button } from "@mui/material";
import { DynamicTable, SubHeader } from "../../../components";
import { columns } from "../../../columns/seo";
import { seoData } from "../../../constant";

const SeoManagement = () => {
  const [data] = useState(seoData || []);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(11);
  const [total] = useState(11);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleDelete = (item) => {
    console.log(item);
  };

  return (
    <>
      <SubHeader
        title="SEO Management"
        rightNode={
          <Button
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
          padding: { xs: "32px", sm: "32px 77px 32px 32px" },
        }}
      >
        <DynamicTable
          data={data}
          columns={columns()}
          isLoading={false}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          total={total}
          hideEdit={true}
          handleDelete={handleDelete}
          hideSwitch={true}
          headerBorder={true}
        />
      </Box>
    </>
  );
};
export default SeoManagement;
