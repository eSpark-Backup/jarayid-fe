import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import FAQList from "../../../components/faq-list";
import { faqs as initialFaqs } from "../../../constant";

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
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        width="100%"
        mb={2}
        gap={2}
      >
        <Typography
          variant="h1"
          fontSize={{ xs: "24px", sm: "28px", md: "35px" }}
          color="#3F3F40"
          fontWeight="600"
        >
          FAQ
        </Typography>
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
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 3, sm: 5 },
          px: { xs: 2, sm: 3 },
          position: "relative",
          borderRadius: "8px",
          backgroundColor: "#fff",
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

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        PaperProps={{
          sx: {
            width: "475px !important",
            height: "485px",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle color="#3F3F40" fontSize="30px" fontWeight="bold">
          Edit FAQ
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: "10px !important",
          }}
        >
          <TextField
            label="Question"
            placeholder="Write Down Your Question Here"
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            fullWidth
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#121826",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#6C727F",
                fontSize: "12px",
              },
            }}
          />

          <TextField
            label="Answer"
            placeholder="Write Down Your Answer Here"
            value={formData.answer}
            onChange={(e) =>
              setFormData({ ...formData, answer: e.target.value })
            }
            multiline
            minRows={7}
            fullWidth
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "16px",
                fontWeight: "bold",
                color: "#3F3F40",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#888",
                fontSize: "14px",
              },
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              if (formData.question && formData.answer) {
                handleEditSubmit();
              }
            }}
            variant="contained"
            color="primary"
            sx={{ width: "137px", height: "40px", fontSize: "12px" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this FAQ?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        PaperProps={{
          sx: {
            width: "475px !important",
            height: "485px",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle color="#3F3F40" fontSize="30px" fontWeight="bold">
          Add New FAQ
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: "10px !important",
          }}
        >
          <TextField
            label="Question"
            placeholder="Write Down Your Question Here"
            value={formDataAdd.question}
            onChange={(e) =>
              setFormDataAdd({ ...formDataAdd, question: e.target.value })
            }
            fullWidth
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#121826",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#6C727F", // light gray
                fontSize: "12px",
              },
            }}
          />

          <TextField
            label="Answer"
            placeholder="Write Down Your Answer Here"
            value={formDataAdd.answer}
            onChange={(e) =>
              setFormDataAdd({ ...formDataAdd, answer: e.target.value })
            }
            multiline
            minRows={7} // ⬅️ Increase this value to make it taller
            fullWidth
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "16px",
                fontWeight: "bold",
                color: "#3F3F40",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#888",
                fontSize: "14px",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (formDataAdd.question && formDataAdd.answer) {
                setFaqsData([...faqsData, formDataAdd]);
                setOpenAdd(false);
              }
            }}
            variant="contained"
            color="primary"
            sx={{ width: "137px", height: "40px", fontSize: "12px" }}
          >
            Add FAQ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FAQ;
