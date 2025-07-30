import { Box, Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
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
  const { data: allPages, isLoading, refetch, error } = useGetAllPagesQuery();
  const [updateFAQ] = useUpdatePageMutation();

  const [faqs, setFaqs] = useState([]);
  const [editingFaq, setEditingFaq] = useState(null); 
  const [faqToDelete, setFaqToDelete] = useState(null); 
  const [openAdd, setOpenAdd] = useState(false);

  const faqPage = allPages?.data?.items?.find((page) => page.slug === "faq");
  const pageId = faqPage?.id;

  useEffect(() => {
    if (faqPage?.content) {
      const processed = faqPage.content.map((f) => ({
        id: f.id || crypto.randomUUID(), 
        question: f.question?.trim() || "",
        answer: f.answer?.trim() || "",
      }));
      setFaqs(processed);
    }
    if (error) {
      console.error("Failed to fetch FAQs:", error);
    }
  }, [faqPage, error]);

  const handleEdit = (faq) => {
    setEditingFaq(faq);
  };

  const handleUpdate = async (updatedFaq) => {
    const updatedList = faqs.map((f) =>
      f.id === updatedFaq.id ? updatedFaq : f
    );
    await updateFAQ({
      id: pageId,
      credentials: { title: "FAQ", slug: "faq", content: updatedList },
    });
    setFaqs(updatedList);
    setEditingFaq(null);
    refetch();
  };

  const handleDelete = (faq) => {
    setFaqToDelete(faq);
  };

  const confirmDelete = async () => {
    const updatedList = faqs.filter((f) => f.id !== faqToDelete.id);
    await updateFAQ({
      id: pageId,
      credentials: { title: "FAQ", slug: "faq", content: updatedList },
    });
    setFaqs(updatedList);
    setFaqToDelete(null);
    refetch();
  };

  const handleAdded = (newList) => {
    setFaqs(newList);
    refetch();
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
          {!isLoading && faqs.length > 0 ? (
            <FAQList
              faqs={faqs}
              showEditDeleteIcons
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <Typography align="center" color="gray">
              No FAQ Found
            </Typography>
          )}
        </Box>
      </Container>

      <DeleteModal
        open={!!faqToDelete}
        handleClose={() => setFaqToDelete(null)}
        handleCancel={() => setFaqToDelete(null)}
        handleConfirm={confirmDelete}
        heading="Are you sure you want to delete this FAQ?"
        confirmText="Delete"
      />

      <AddFAQModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        faqList={faqs}
        pageId={pageId}
        onAdded={handleAdded}
      />

      <EditFAQModal
        open={!!editingFaq}
        onClose={() => setEditingFaq(null)}
        faq={editingFaq}
        faqList={faqs}
        pageId={pageId}
        onUpdated={handleUpdate}
      />
    </>
  );
};

export default FAQ;
