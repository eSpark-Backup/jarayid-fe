import { Box, Button, Typography } from "@mui/material";

const AdData = ({ data, handleNewClick }) => {
  return (
    <>
      {!data ? (
        <Typography sx={{ textAlign: "center" }}>No data found</Typography>
      ) : (
        <Typography>Data Found</Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: data ? "flex-end" : "center",
          mt: "10px",
        }}
      >
        <Box sx={{ width: "175px", height: "44.14px" }}>
          <Button variant="gradient" onClick={handleNewClick}>
            Launch New Ad
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AdData;
