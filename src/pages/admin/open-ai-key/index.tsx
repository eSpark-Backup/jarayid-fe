import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { SubHeader } from "../../../components";
import {
  useAddKeyMutation,
  useGetKeysQuery,
  useUpdateKeyMutation,
} from "../../../services/keys";
import { isObjectValid } from "../../../utils";

const textFieldBaseStyle = {
  height: "42px",
  borderRadius: "5px",
  border: "1px solid #D1E5FA",
  px: "10px",
  color: "#8C8E90",
  "&:focus": { outline: "none" },
};

const OpenAIKey = () => {
  const [keyId, setKeyId] = useState(null);
  const [prevKey, setPrevKey] = useState("");
  const [keys, setKeys] = useState({
    openAiKey: "",
  });
  const {
    data: keysData,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetKeysQuery();

  useEffect(() => {
    if (isSuccess) {
      setKeys((prev) => ({
        ...prev,
        openAiKey: keysData?.data?.[0]?.key,
      }));
      setPrevKey(keysData?.data?.[0]?.key);
      setKeyId(
        keysData?.data?.[0]?.id && keysData?.data?.[0]?.id !== "env"
          ? keysData?.data?.[0]?.id
          : null
      );
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, keysData]);

  const [addKey, { isLoading: addLoading }] = useAddKeyMutation();
  const handleAddKey = () => {
    if (!isObjectValid(keys)) {
      toast.error("Please fill the field");
      return;
    }
    addKey({ key: keys?.openAiKey }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
        return;
      }
    });
  };

  const [editKey, { isLoading: isEditLoading }] = useUpdateKeyMutation();
  const handleEdit = () => {
    if (!isObjectValid(keys)) {
      toast.error("Please fill the field");
      return;
    }
    editKey({ id: keyId, credentials: { key: keys?.openAiKey } }).then(
      (res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message);
          refetch();
          return;
        }
      }
    );
  };
  return (
    <>
      <SubHeader title="Open AI Key" />
      <Box
        sx={{
          height: "303px",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          mt: "25px",
          padding: "10px",
        }}
      >
        {isLoading || isFetching ? (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap="20px"
            sx={{ width: "100%", height: "303px" }}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap="20px"
          >
            <TextField
              placeholder="Open Ai key Here"
              value={keys.openAiKey}
              onChange={(e) =>
                setKeys((prev) => ({
                  ...prev,
                  openAiKey: e.target.value,
                }))
              }
              variant="standard"
              sx={{ width: "100%" }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  ...textFieldBaseStyle,
                  fontStyle: "italic",
                  width: "100%",
                  backgroundColor: "#EAF4FF",
                },
              }}
            />
            <Button
              disabled={
                keys?.openAiKey === prevKey || addLoading || isEditLoading
              }
              loading={addLoading || isEditLoading}
              variant="contained"
              color="primary"
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: "125px",
                height: "35px",
                backgroundColor: "#007BFF",
                fontSize: "12px",
                textTransform: "none",
              }}
              onClick={() => {
                if (keyId) {
                  handleEdit();
                } else {
                  handleAddKey();
                }
              }}
            >
              Save
            </Button>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default OpenAIKey;
