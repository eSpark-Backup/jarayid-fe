import { Typography } from "@mui/material";

export const columns = () => {
  return [
    // { name: "ID", key: "id" },
    { name: "Name", key: "name" },
    { name: "Business Name", key: "businessName" },
    {
      name: "Website",
      key: "website",
      component: (item) => {
        return (
          <Typography
            onClick={() =>
              window.open(item?.website, "_blank", "noopener,noreferrer")
            }
            sx={{
              color: "#908B93",
              fontSize: "14px",
              fontWeight: 400,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {item?.website?.replace("https://", "")}
          </Typography>
        );
      },
    },
    {
      name: "Contact Email",
      key: "contactEmail",
      component: (item) => {
        return (
          <Typography
            sx={{
              color: "#908B93",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {item?.contactEmail?.replace(/@.*/, "@...")}
          </Typography>
        );
      },
    },
    { name: "Category", key: "category" },
    { name: "Contact", key: "contact" },
    { name: "Status", key: "status", chip: true },
    { name: "Phone", key: "phone" },
  ];
};
