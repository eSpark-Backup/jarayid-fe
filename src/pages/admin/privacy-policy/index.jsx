import { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { SubHeader } from "../../../components";
import {
  useAddPageMutation,
  useGetAllPagesQuery,
  useUpdatePageMutation,
} from "../../../services/static-pages";
import { toast } from "react-toastify";

const TermsPrivacyScreen = () => {
  const [value, setValue] = useState(0);
  const [preTermsContent, setPreTermsContent] = useState("");
  const [prePrivacyContent, setPrePrivacyContent] = useState("");
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");
  const [isTermCreated, setIsTermCreated] = useState(false);
  const [isPolicyCreated, setIsPolicyCreated] = useState(false);

  const { data, isLoading, error, isError, isSuccess } = useGetAllPagesQuery();

  useEffect(() => {
    if (isSuccess) {
      const pages = data.data.items;
      setIsTermCreated(
        pages?.some((item) => item?.slug?.includes("terms"))
          ? pages?.find((item) => item?.slug === "terms")?.id
          : null
      );
      setIsPolicyCreated(
        pages?.some((item) => item?.slug?.includes("policy"))
          ? pages?.find((item) => item?.slug === "policy")?.id
          : null
      );
      const terms = pages.find((p) => p.slug?.toLowerCase().includes("terms"));
      const privacy = pages.find((p) =>
        p.slug?.toLowerCase().includes("policy")
      );

      setTermsContent(terms?.content?.message || "");
      setPrivacyContent(privacy?.content?.message || "");
      setPreTermsContent(terms?.content?.message || "");
      setPrePrivacyContent(privacy?.content?.message || "");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error, data]);

  const handleChange = (_, newValue) => setValue(newValue);

  const [addPage, { isLoading: addLoading }] = useAddPageMutation();
  const [updatePage, { isLoading: updateLoading }] = useUpdatePageMutation();

  const handleAdd = () => {
    var objToSend;
    if (value === 0) {
      objToSend = {
        title: "Terms of Service",
        slug: "terms",
        content: {
          message: termsContent,
        },
      };
    } else {
      objToSend = {
        title: "Privacy Policy",
        slug: "policy",
        content: {
          message: privacyContent,
        },
      };
    }
    addPage(objToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(
          value === 0
            ? "Terms of services updated successfully"
            : "Privacy policy updated successfully"
        );
      }
    });
  };

  const handleEdit = () => {
    var objToSend;
    if (value === 0) {
      objToSend = {
        title: "Terms of Service",
        slug: "terms",
        content: {
          message: termsContent,
        },
      };
    } else {
      objToSend = {
        title: "Privacy Policy",
        slug: "policy",
        content: {
          message: privacyContent,
        },
      };
    }
    updatePage({
      id: value === 0 ? isTermCreated : isPolicyCreated,
      credentials: objToSend,
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(
          value === 0
            ? "Terms of services updated successfully"
            : "Privacy policy updated successfully"
        );
      }
    });
  };

  const handleSubmit = () => {
    if (value === 0) {
      if (isTermCreated) {
        handleEdit();
      } else {
        handleAdd();
      }
      return;
    }
    if (value === 1) {
      if (isPolicyCreated) {
        handleEdit();
      } else {
        handleAdd();
      }
      return;
    }
  };

  return (
    <Box sx={{ fontFamily: "Inter, sans-serif" }}>
      <SubHeader
        title="Terms of Service / Privacy Policy"
        rightNode={
          <Button
            disabled={
              (value === 0 && preTermsContent === termsContent) ||
              (value === 1 && prePrivacyContent === privacyContent) ||
              addLoading ||
              updateLoading
            }
            loading={addLoading || updateLoading}
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
            onClick={handleSubmit}
          >
            Save
          </Button>
        }
      />

      <Paper
        elevation={1}
        sx={{ mt: 2, borderRadius: "14px", overflow: "hidden" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          TabIndicatorProps={{
            style: { backgroundColor: "#007BFF", height: "4px" },
          }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            label="Terms of Service"
            sx={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#101828 !important",
            }}
          />
          <Tab
            label="Privacy Policy"
            sx={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#101828 !important",
            }}
          />
        </Tabs>

        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              p: 2,
            }}
          >
            <TextField
              sx={{
                background: "#EAE7EC",
                border: "none",
                width: "100%",
                borderRadius: "14px",
                fieldset: { border: "none" },
                fontSize: "16px",
                fontWeight: 600,
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  fontWeight: 600,
                  "&::-webkit-scrollbar": {
                    width: "16px",
                    background: "#CACACA",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#CACACA",
                    borderRadius: "0px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#007BFF",
                    boxShadow: "none",
                    borderRadius: "0px",
                  },
                },
              }}
              multiline
              rows={16}
              placeholder={`Enter ${
                value === 0 ? "Terms of services" : "Privacy Policy"
              }`}
              value={value === 0 ? termsContent : privacyContent}
              onChange={(e) =>
                value === 0
                  ? setTermsContent(e.target.value)
                  : setPrivacyContent(e.target.value)
              }
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TermsPrivacyScreen;
