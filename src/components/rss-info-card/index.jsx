import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CustomSwitch from "../custom-switch";
import { adminTrash, refresh } from "../../assets";

dayjs.extend(relativeTime);

const RssInfoCard = ({
  id,
  name,
  totalArticles,
  url,
  status,
  active: activeError,
  updatedAt,
  handleToggle,
  loading,
  loadingId,
  handleDelete,
  isDeleteLoading,
  handleRefresh,
  isRefreshLoading,
}) => {
  const active = status === "PUBLISH";
  return (
    <Box
      sx={{
        border: "1px solid #00000059",
        padding: "20px 30px",
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#000000",
            width: "150px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 400,
            color: "#000000",
          }}
        >
          {`${totalArticles} Articles`}
        </Typography>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 400,
            color: "#000000",
            width: "250px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {url}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap="30px"
        >
          {loading && loadingId === id ? (
            <CircularProgress size={16} />
          ) : (
            <CustomSwitch
              sx={{
                background: active
                  ? "linear-gradient(180deg, #004A99 0%, #007BFF 100%)"
                  : "linear-gradient(180deg, #282B30 0%, #1E2124 100%)",
                boxShadow: "0px 0.88px 5.88px 0px #00000026 inset",
                width: "40px !important",
                height: "20px !important",
                borderRadius: "24.41px !important",
                position: "relative",
                "::before": {
                  content: "''",
                  background: active
                    ? "linear-gradient(180deg, #0095FF 0%, #004A99 100%)"
                    : "",
                  width: "38px !important",
                  height: "18px !important",
                  borderRadius: "24.41px !important",
                  position: "absolute",
                  left: "1px",
                  top: "1px",
                },
              }}
              insideSx={{
                background: "linear-gradient(180deg, #0095FF 0%, #004A99 100%)",
                boxShadow: "0px 0px 1.18px 0px #00000059",
                width: "20px!important",
                height: "20px !important",
                left: active ? "50%" : "0%",
                "::before": {
                  content: "''",
                  background:
                    "linear-gradient(180deg, #ECECEC 20.59%, #C9C9C9 85.35%)",
                  width: "18px !important",
                  height: "18px !important",
                  borderRadius: "24.41px !important",
                  position: "absolute",
                  left: "1px",
                  top: "1px",
                },
              }}
              checked={active}
              onToggle={() => handleToggle(id, !active)}
            />
          )}
          {isDeleteLoading && loadingId === id ? (
            <CircularProgress size={16} />
          ) : (
            <img
              onClick={() => handleDelete(id)}
              style={{ cursor: "pointer" }}
              src={adminTrash}
              alt="trash"
            />
          )}
          {isRefreshLoading && loadingId === id ? (
            <CircularProgress size={16} />
          ) : (
            <img
              onClick={() => handleRefresh(id)}
              style={{ cursor: "pointer", marginBottom: "7px" }}
              src={refresh}
              alt="refresh"
            />
          )}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mt={1}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            color: "#6E6F70",
          }}
        >
          {`Last Sync ${dayjs(updatedAt).fromNow()}`}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            color: "#FF0000",
          }}
        >
          {activeError ? "" : "Error: Feed not accessible (404)"}
        </Typography>
      </Stack>
    </Box>
  );
};

export default RssInfoCard;
