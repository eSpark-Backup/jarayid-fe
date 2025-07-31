import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Button, Container, Typography } from "@mui/material";
import { SubHeader } from "../../../components";
import FAQList from "../../../components/faq-list";
import DeleteModal from "../../../components/delete-modal";
import {
  useGetAllPagesQuery,
  useUpdatePageMutation,
} from "../../../services/static-pages";
import AddFAQModal from "./add-faq-modal";
import EditFAQModal from "./edit-faq-modal";

const FAQ = () => {
  const {
    data: allPages,
    isLoading,
    isSuccess,
    isError,
    refetch,
    error,
    isFetching,
  } = useGetAllPagesQuery();
  const [faqs, setFaqs] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isFaqCreated, setIsFaqCreated] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const faqPage = allPages?.data?.items?.find(
        (page) => page.slug === "faq"
      );
      const processed = faqPage?.content?.faq?.map((f) => ({
        id: f.id,
        question: f.question?.trim() || "",
        answer: f.answer?.trim() || "",
      }));
      setFaqs(processed);
      setIsFaqCreated(
        allPages?.data?.items?.some((item) => item?.slug?.includes("faq"))
          ? allPages?.data?.items?.find((item) => item?.slug === "faq")?.id
          : null
      );
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [allPages, isSuccess, isError, error]);

  const [updateFaq, { isLoading: deleteLoading }] = useUpdatePageMutation();
  const confirmDelete = () => {
    const updatedList = faqs.filter((f) => f.id !== deleteModal);
    updateFaq({
      id: isFaqCreated,
      credentials: { title: "FAQ", slug: "faq", content: { faq: updatedList } },
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        setFaqs(updatedList);
        setDeleteModal(false);
      }
    });
  };

  const [expanded, setExpanded] = useState(0);
  const handleChange = (panelIndex) => (event, isExpanded) => {
    setExpanded(isExpanded ? panelIndex : false);
  };

  return (
    <>
      <SubHeader
        title="FAQ"
        rightNode={
          <Button
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
            onClick={() => setOpenAdd(true)}
          >
            Add New FAQ
          </Button>
        }
      />

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 3, sm: 5 },
          px: { xs: 2, sm: 3 },
          borderRadius: "8px",
          backgroundColor: "#fff",
          mt: "10px",
        }}
      >
        <Typography
          variant="h1"
          align="center"
          fontWeight="600"
          fontSize={{ xs: "24px", sm: "28px", md: "35px" }}
          mb="22px"
        >
          Frequently Asked Questions
        </Typography>

        <Box display="flex" justifyContent="center" flexDirection="column">
          <FAQList
            faqs={faqs}
            showEditDeleteIcons
            onEdit={(e) => setOpenEdit(e)}
            onDelete={(e) => setDeleteModal(e?.id)}
            isLoading={isLoading || isFetching}
            expanded={expanded}
            handleChange={handleChange}
          />
        </Box>
      </Container>

      <DeleteModal
        open={deleteModal}
        handleClose={() => setDeleteModal(null)}
        handleCancel={() => setDeleteModal(null)}
        handleConfirm={confirmDelete}
        heading="Are you sure you want to delete this FAQ?"
        desc="Are you sure you want to delete this FAQ"
        confirmText="Delete"
        loading={deleteLoading}
      />

      <AddFAQModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        isFaqCreated={isFaqCreated}
        faqs={faqs}
        onSuccess={refetch}
      />
      <EditFAQModal
        open={openEdit}
        onClose={() => setOpenEdit(null)}
        isFaqCreated={isFaqCreated}
        faqs={faqs}
        onSuccess={refetch}
      />
    </>
  );
};

export default FAQ;
