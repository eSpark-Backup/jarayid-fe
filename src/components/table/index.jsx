import {
  Box,
  Checkbox,
  Chip,
  LinearProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CustomSwitch from "../custom-switch";
import { getValue } from "../../utils";
import { adminTrash, adminEdit, sortArrow } from "../../assets";

const DynamicTable = ({
  data,
  columns,
  isLoading,
  handleEdit,
  handleDelete,
  hideEdit,
  hideDelete,
  hideSwitch,
  checked,
  onToggle,
  page,
  pageSize,
  handlePageChange,
  total,
  onRowClick,
  selectable = false,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  isAllSelected = false,
  onSort,
  sortBy,
  sortDirection,
  headerBorder,
}) => {
  const renderSortIcon = (columnKey) => {
    if (sortBy !== columnKey) return null;
    return sortDirection === "asc" ? (
      <img src={sortArrow} alt="sort" />
    ) : (
      <img style={{ transform: "rotate(180deg)" }} src={sortArrow} alt="sort" />
    );
  };
  const extendedColumns = columns?.map((column) => {
    return { ...column, key: column.key.split(".") };
  });
  const generateCell = (column, item) => {
    const cell = column.component
      ? column.component(item)
      : getValue(item, column.key);

    if (column.key[0] === "action") {
      return (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {!hideEdit && (
            <img
              src={adminEdit}
              alt="Edit"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(item);
              }}
            />
          )}
          {!hideSwitch && (
            <CustomSwitch
              sx={{
                background: !checked
                  ? "linear-gradient(180deg, #004A99 0%, #007BFF 100%)"
                  : "linear-gradient(180deg, #282B30 0%, #1E2124 100%)",
                boxShadow: "0px 0.88px 5.88px 0px #00000026 inset",
                width: "42.33px !important",
                height: "16.65px !important",
                borderRadius: "24.41px !important",
                position: "relative",
                "::before": {
                  content: "''",
                  background: !checked
                    ? "linear-gradient(180deg, #0095FF 0%, #004A99 100%)"
                    : "",
                  width: "41.25px !important",
                  height: "15.57px !important",
                  borderRadius: "24.41px !important",
                  position: "absolute",
                  left: "1px",
                },
              }}
              insideSx={{
                background: "linear-gradient(180deg, #0095FF 0%, #004A99 100%)",
                boxShadow: "0px 0px 1.18px 0px #00000059",
                width: "14.18px!important",
                height: "13.18px !important",
                left: checked ? "4%" : "68%",
                "::before": {
                  content: "''",
                  background:
                    "linear-gradient(180deg, #ECECEC 20.59%, #C9C9C9 85.35%)",
                  width: "12px !important",
                  height: "12px !important",
                  borderRadius: "24.41px !important",
                  position: "absolute",
                  left: "0.6px",
                  top: "0.2px",
                },
              }}
              checked={checked}
              onToggle={onToggle}
            />
          )}
          {!hideDelete && (
            <img
              src={adminTrash}
              alt="Delete"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item);
              }}
            />
          )}
        </Stack>
      );
    }

    if (column.chip) {
      return (
        <Chip onClick={() => {}} label={cell?.label} variant={cell?.variant} />
      );
    }
    return cell;
  };

  return (
    <>
      {data?.length === 0 && !isLoading ? (
        <Typography fontSize={20} fontWeight={900} mt="50px" textAlign="center">
          No Data Found
        </Typography>
      ) : (
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "800px" }}>
            <TableHead
              sx={
                headerBorder
                  ? {
                      "& .MuiTableCell-root": {
                        borderTop: "1px solid #EAE7EC",
                        borderBottom: "1px solid #EAE7EC",
                        whiteSpace: "nowrap",
                        color: "#101828",
                        fontSize: "16px",
                        fontWeight: 600,
                        padding: "8px 0px",
                      },
                      ".MuiTableRow-root .MuiTableCell-root:first-of-type": {
                        borderLeft: "1px solid #EAE7EC",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                      },
                      ".MuiTableRow-root .MuiTableCell-root:last-of-type": {
                        borderRight: "1px solid #EAE7EC",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                      },
                    }
                  : {}
              }
            >
              <TableRow>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isAllSelected}
                      onChange={onSelectAll}
                      indeterminate={isAllSelected}
                      color="primary"
                    />
                  </TableCell>
                )}
                {extendedColumns?.map((column, index) => (
                  <TableCell
                    key={index}
                    onClick={() => onSort?.(column.key[column.key.length - 1])}
                    sx={{ cursor: "pointer" }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      gap={0.5}
                    >
                      <span>{column.name}</span>
                      {renderSortIcon(column.key[column.key.length - 1])}
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody>
                {data?.map((item, index) => (
                  <TableRow key={index}>
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.includes(item.id)}
                          onChange={() => onSelectRow?.(item.id)}
                          color="primary"
                        />
                      </TableCell>
                    )}
                    {extendedColumns?.map((column) => (
                      <TableCell
                        sx={{
                          textAlign: "center",
                          pl: "0px",
                          cursor: onRowClick ? "pointer" : "auto",
                        }}
                        key={column.key.join(".")}
                        onClick={onRowClick ? () => onRowClick(item) : () => {}}
                      >
                        {generateCell(column, item)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          {isLoading && (
            <Box>
              <LinearProgress />
            </Box>
          )}
        </TableContainer>
      )}
      {data?.length >= pageSize && !isLoading ? (
        <Stack
          sx={{ marginTop: { xs: "20px", sm: "10px" } }}
          p={{ xs: 0, sm: 2 }}
          alignItems="center"
        >
          <Pagination
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={
              handlePageChange ? (_, page) => handlePageChange(page) : () => {}
            }
            count={Math.ceil((total || 1) / pageSize)}
          />
        </Stack>
      ) : null}
    </>
  );
};

export default DynamicTable;
