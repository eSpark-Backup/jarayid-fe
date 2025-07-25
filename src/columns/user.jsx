import { Typography } from "@mui/material";

export const columns = () => {
  return [
    {
      name: "User",
      key: "user",
      component: (item) => {
        return (
          <Typography sx={{ color: "#403A44", fontWeight: 600 }}>
            {item?.user}
          </Typography>
        );
      },
    },
    { name: "Email", key: "email" },
    { name: "Role", key: "role" },
    { name: "Join date", key: "joinDate" },
    { name: "Last Login", key: "lastLogin" },
    { name: "Status", key: "status", chip: true },
    { name: "", key: "action" },
  ];
};
