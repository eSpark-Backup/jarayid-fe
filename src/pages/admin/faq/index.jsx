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
  const { data: allPages, isLoading, refetch } = useGetAllPagesQuery();

  const [updateFAQ] = useUpdatePageMutation();

  const [expanded, setExpanded] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [faqList, setFaqList] = useState([]);
  const [formData, setFormData] = useState({ question: "", answer: "" });

  const faqPage = allPages?.data?.items?.find((page) => page.slug === "faq");
  const pageId = faqPage?.id;

  useEffect(() => {
    if (faqPage?.content) {
      setFaqList(faqPage.content);
    }
  }, [faqPage]);

  const handleChange = (panelIndex) => (event, isExpanded) => {
    setExpanded(isExpanded ? panelIndex : false);
  };

  const handleAddFAQ = async (newFaq) => {
    const updatedList = [...faqList, newFaq];
    await updateFAQ({
      id: pageId,
      credentials: { title: "FAQ", slug: "faq", content: updatedList },
    });
    setFaqList(updatedList);
    refetch();
  };

  const handleEdit = (faq, index) => {
    setFormData(faq);
    setCurrentIndex(index);
    setOpenEdit(true);
  };

  const handleEditSubmit = async (updatedFaq) => {
    const updatedList = [...faqList];
    updatedList[currentIndex] = updatedFaq;
    await updateFAQ({
      id: pageId,
      credentials: { title: "FAQ", slug: "faq", content: updatedList },
    });
    setFaqList(updatedList);
    refetch();
  };

  const handleDelete = (faq, index) => {
    setCurrentIndex(index);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    const updatedList = faqList.filter((_, i) => i !== currentIndex);
    await updateFAQ({
      id: pageId,
      credentials: { title: "FAQ", slug: "faq", content: updatedList },
    });
    setFaqList(updatedList);
    setOpenDelete(false);
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
          {!isLoading && faqList.length > 0 ? (
            <FAQList
              faqs={faqList}
              expanded={expanded}
              handleChange={handleChange}
              showEditDeleteIcons={true}
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
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleCancel={() => setOpenDelete(false)}
        handleConfirm={confirmDelete}
        heading="Are you sure you want to delete this FAQ?"
        confirmText="Delete"
      />

      <AddFAQModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAddFAQ}
      />

      <EditFAQModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSubmit={handleEditSubmit}
        faq={formData}
      />
    </>
  );
};

export default FAQ;
