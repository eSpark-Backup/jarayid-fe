import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SubHeader } from "../../../components";
import FAQList from "../../../components/faq-list";
import FAQModal from "../../../components/faq-modal";
import { faqs as initialFaqs } from "../../../constant";
import DeleteModal from "../../../components/delete-modal";

const FAQ = () => {
  const [expanded, setExpanded] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [openAdd, setOpenAdd] = useState(false);
  const [formDataAdd, setFormDataAdd] = useState({ question: "", answer: "" });
  const [faqsData, setFaqsData] = useState(initialFaqs);

  const handleChange = (panelIndex) => (event, isExpanded) => {
    setExpanded(isExpanded ? panelIndex : false);
  };

  const handleEdit = (faq, index) => {
    setFormData(faq);
    setCurrentIndex(index);
    setOpenEdit(true);
  };

  const handleEditSubmit = () => {
    const updatedFaqs = [...faqsData];
    updatedFaqs[currentIndex] = formData;
    setFaqsData(updatedFaqs);
    setOpenEdit(false);
  };

  const handleDelete = (faq, index) => {
    setCurrentIndex(index);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    const updatedFaqs = faqsData.filter((_, i) => i !== currentIndex);
    setFaqsData(updatedFaqs);
    setOpenDelete(false);
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
            onClick={() => {
              setFormDataAdd({ question: "", answer: "" });
              setOpenAdd(true);
            }}
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
          position: "relative",
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
            faqs={faqsData}
            expanded={expanded}
            handleChange={handleChange}
            showEditDeleteIcons={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
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
      <FAQModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={() => {
          setFaqsData([...faqsData, formDataAdd]);
          setOpenAdd(false);
        }}
        formData={formDataAdd}
        setFormData={setFormDataAdd}
        title="Add New FAQ"
        buttonText="Add FAQ"
      />

      <FAQModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSubmit={() => {
          const updatedFaqs = [...faqsData];
          updatedFaqs[currentIndex] = formData;
          setFaqsData(updatedFaqs);
          setOpenEdit(false);
        }}
        formData={formData}
        setFormData={setFormData}
        title="Edit FAQ"
        buttonText="Save"
      />
    </>
  );
};

export default FAQ;
