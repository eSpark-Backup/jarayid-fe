import { Box, Typography } from "@mui/material";

export const columns = () => {
  return [
    { name: "Type", key: "type" },
    { name: "Category ", key: "category" },
    {
      name: "Description",
      key: "description",
      component: (item) => {
        return (
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography
              sx={{
                width: "300px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
              title={item?.description}
            >
              {item?.description}
            </Typography>
          </Box>
        );
      },
    },
    { name: "Level", key: "level", chip: true },
    { name: "Time", key: "time" },
  ];
};
