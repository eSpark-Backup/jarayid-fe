import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { toast } from "react-toastify";
import GlobalModal from "../../../components/global-modal";
import { useUpdatePageMutation } from "../../../services/static-pages";

const EditFAQModal = ({
  open,
  onClose,
  faq,
  index,
  faqList,
  pageId,
  onUpdated,
}) => {
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [updateFAQ, { isLoading }] = useUpdatePageMutation();

  useEffect(() => {
    if (faq) setFormData(faq);
  }, [faq]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const updatedList = [...faqList];
      updatedList[index] = formData;

      await updateFAQ({
        id: pageId,
        credentials: { title: "FAQ", slug: "faq", content: updatedList },
      }).unwrap();

      toast.success("FAQ updated successfully!");
      onUpdated?.(updatedList);
      onClose();
    } catch (err) {
      toast.error("Failed to update FAQ");
    }
  };

  return (
    <GlobalModal
      open={open}
      onClose={onClose}
      onSubmit={handleSave}
      title="Edit FAQ"
      submitText="Save Changes"
      loading={isLoading}
    >
      <Box display="flex" flexDirection="column" gap={2} mt={1}>
        <FormControl fullWidth>
          <InputLabel htmlFor="edit-question">Question</InputLabel>
          <OutlinedInput
            id="edit-question"
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="edit-answer">Answer</InputLabel>
          <OutlinedInput
            id="edit-answer"
            label="Answer"
            name="answer"
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

export default EditFAQModal;
