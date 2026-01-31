import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useDeleteAdMutation,
  useGetAllAdsQuery,
} from "../../services/ad-placement";
import { adminEdit2, delete2 } from "../../assets";
import DeleteModal from "../delete-modal";
import { toast } from "react-toastify";

const AdData = ({ handleNewClick, handleEdit, currentTab }) => {
  const [ads, setAds] = useState([]);
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetAllAdsQuery({
      page: 1,
    });

  const [deleteData, { isLoading: deleteLoading }] = useDeleteAdMutation();

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (!data) return;

    if (currentTab === 0) {
      const filteredData = data?.data?.items?.filter(
        (item) => item?.platform === "WEB"
      );
      setAds(filteredData);
    } else {
      const filteredData = data?.data?.items?.filter(
        (item) => item?.platform !== "WEB"
      );
      setAds(filteredData);
    }
  }, [data, currentTab]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
      return;
    }
  }, [isError, error]);

  const handleFinalDelete = async () => {
    try {
      const res = await deleteData({ id: deleteModal });
      if (res?.data) {
        toast.success("Ad deleted successfully");
        setDeleteModal(false);
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setDeleteModal(false);
    }
  };

  if ((isLoading || isFetching) && !isSuccess) {
    return <LinearProgress />;
  }

  return (
    <>
      {ads && Array.isArray(ads) && ads?.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            height: "430px",
            overflowY: "auto",
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {ads?.map((item, index) => (
            <Box
              sx={{
                backgroundColor: "#F0F0F0",
                border: "0.92px solid #EAE7EC",
                borderRadius: "5px",
                p: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={index}
            >
              <Box
                sx={{
                  display: "flex",
                  columnGap: "15px",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "167.90px",
                    height: "78.81px",
                    backgroundColor: "#D9D9D9",
                    borderRadius: "11px",
                  }}
                ></Box>
                <Stack>
                  <Typography
                    sx={{
                      fontSize: "23px",
                      color: "#4E4852",
                      fontFamily: "Gilroy-SemiBold",
                    }}
                  >
                    Ad Link
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#4E4852",
                      fontFamily: "Gilroy-Regular",
                    }}
                  >
                    {item?.adLink}
                  </Typography>
                </Stack>
              </Box>
              <Box sx={{ display: "flex", cursor: "pointer" }}>
                <Box
                  sx={{
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    width: "48px",
                    height: "32px",
                    backgroundColor: "#FAFBFD",
                    border: "0.6px solid #D5D5D5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleEdit(item)}
                >
                  <img src={adminEdit2} alt="Edit Icon" />
                </Box>
                <Box
                  sx={{
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                    width: "48px",
                    height: "32px",
                    backgroundColor: "#FAFBFD",
                    borderTop: "0.6px solid #D5D5D5",
                    borderBottom: "0.6px solid #D5D5D5",
                    borderRight: "0.6px solid #D5D5D5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => setDeleteModal(item?.id)}
                >
                  <img src={delete2} alt="Delete Icon" />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography sx={{ textAlign: "center" }}>No data found</Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent:
            ads && Array.isArray(ads) && ads?.length > 0
              ? "flex-end"
              : "center",
          mt: "10px",
        }}
      >
        <Box sx={{ width: "175px", height: "44.14px" }}>
          <Button variant="gradient" onClick={handleNewClick}>
            Launch New Ad
          </Button>
        </Box>
      </Box>
      <DeleteModal
        open={deleteModal}
        handleClose={() => {
          setDeleteModal(false);
        }}
        handleCancel={() => {
          setDeleteModal(false);
        }}
        handleConfirm={handleFinalDelete}
        heading="Are you sure you want to Delete?"
        desc="Are you sure you want to Delete this ad?"
        confirmText="Delete"
        loading={deleteLoading}
      />
    </>
  );
};

export default AdData;
