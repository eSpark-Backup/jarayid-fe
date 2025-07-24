import { useState } from "react";
import { Box } from "@mui/material";
import { DynamicTable, SubHeader, Button } from "../../../components";
import { columns } from "../../../columns/external-links";
import { externalLinksData } from "../../../constant";

const ExternalLink = () => {
  const [data] = useState(externalLinksData || []);
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
        title="External link"
        rightNode={
          <Box sx={{ width: "159px", height: "40px" }}>
            <Button variant="gradient">Add New Tool</Button>
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
        <DynamicTable
          data={data}
          columns={columns()}
          isLoading={false}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          handleDelete={handleDelete}
          total={total}
          hideEdit={true}
          hideSwitch={true}
          headerBorder={true}
        />
      </Box>
    </>
  );
};
export default ExternalLink;
