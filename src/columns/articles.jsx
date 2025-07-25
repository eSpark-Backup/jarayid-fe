import { Typography } from "@mui/material";

export const columns = () => {
  return [
    {
      name: "Articles",
      key: "articleName",
      component: (item) => {
        return (
          <>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "left",
                color: "#403A44",
                fontWeight: 600,
              }}
            >
              {item?.articleName}
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
    { name: "Date", key: "createAt" },
    { name: "Views", key: "views" },
    { name: "Comments", key: "comments" },
    { name: "Status", key: "status", chip: true },
    { name: "Action", key: "action" },
  ];
};
