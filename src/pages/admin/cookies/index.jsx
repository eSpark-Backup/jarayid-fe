import { useState } from "react";
import { Box } from "@mui/material";
import { DynamicTable, SubHeader } from "../../../components";
import { columns } from "../../../columns/cookies";
import { cookiesData } from "../../../constant";

const Cookies = () => {
  const [data] = useState(cookiesData || []);
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
      <SubHeader title="Cookies" />
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
export default Cookies;
