import { Typography } from "@mui/material";

export const columns = () => {
  return [
    {
      name: "Articles",
      key: "articleTitle",
      component: (item) => {
        return (
          <>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "left",
                color: "#403A44",
                fontWeight: 600,
                width: "300px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {item?.articleTitle}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "left",
                color: "#908B93",
                fontWeight: 600,
              }}
            >
              {`Category: ${item?.cat}`}
            </Typography>
          </>
        );
      },
    },
    { name: "Date", key: "date" },
    { name: "Views", key: "viewCount" },
    { name: "Comments", key: "commentCount" },
    { name: "Status", key: "status", chip: true },
    { name: "Action", key: "action" },
  ];
};
