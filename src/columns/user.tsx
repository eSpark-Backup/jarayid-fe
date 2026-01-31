import { Typography } from "@mui/material";

export const columns = () => {
  return [
    {
      name: "User",
      key: "user",
      component: (item) => {
        return (
          <Typography
            sx={{ color: "#403A44", fontWeight: 600, fontSize: "14px" }}
          >
            {item?.user}
          </Typography>
        );
      },
    },
    {
      name: "Email",
      key: "email",
      component: (item) => {
        return (
          <Typography
            sx={{ color: "#908B93", fontWeight: 400, fontSize: "14px" }}
          >
            {item?.email}
          </Typography>
        );
      },
    },
    {
      name: "Role",
      key: "role",
      component: (item) => {
        return (
          <Typography
            sx={{ color: "#908B93", fontWeight: 400, fontSize: "14px" }}
          >
            {item?.role}
          </Typography>
        );
      },
    },
    {
      name: "Join date",
      key: "joinDate",
      component: (item) => {
        return (
          <Typography
            sx={{ color: "#908B93", fontWeight: 400, fontSize: "14px" }}
          >
            {item?.joinDate}
          </Typography>
        );
      },
    },
    {
      name: "Last Login",
      key: "lastLogin",
      component: (item) => {
        return (
          <Typography
            sx={{ color: "#908B93", fontWeight: 400, fontSize: "14px" }}
          >
            {item?.lastLogin}
          </Typography>
        );
      },
    },
    { name: "Status", key: "status", chip: true },
    { name: "", key: "action" },
  ];
};
