import { useState } from "react";
import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { toast } from "react-toastify";
import GlobalModal from "../../../components/global-modal";
import { useUpdatePageMutation } from "../../../services/static-pages";

const AddFAQModal = ({ open, onClose, faqList = [], pageId, onAdded }) => {
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [updateFAQ, { isLoading }] = useUpdatePageMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const updatedList = [formData, ...faqList];

      await updateFAQ({
        id: pageId,
        credentials: { title: "FAQ", slug: "faq", content: updatedList },
      }).unwrap();

      toast.success("FAQ added successfully!");
      setFormData({ question: "", answer: "" });
      onAdded?.(updatedList); 
      onClose();
    } catch (err) {
      toast.error("Failed to add FAQ");
    }
  };

  return (
    <GlobalModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add New FAQ"
      submitText="Add FAQ"
      loading={isLoading}
    >
      <Box display="flex" flexDirection="column" gap={3} mt={1}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="faq-question">Question</InputLabel>
          <OutlinedInput
            id="faq-question"
            name="question"
            label="Question"
            value={formData.question}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="faq-answer">Answer</InputLabel>
          <OutlinedInput
            id="faq-answer"
            name="answer"
            label="Answer"
            value={formData.answer}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </FormControl>
      </Box>
    </GlobalModal>
  );
};

export default AddFAQModal;
