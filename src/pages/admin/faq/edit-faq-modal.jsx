import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import GlobalModal from "../../../components/global-modal";
import { useUpdatePageMutation } from "../../../services/static-pages";
import { isObjectSame } from "../../../utils";

const EditFAQModal = ({ open, onClose, isFaqCreated, onSuccess, faqs }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    id: crypto.randomUUID(),
  });
  useEffect(() => {
    if (open) setFormData(open);
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [updateFAQ, { isLoading }] = useUpdatePageMutation();
  const handleSave = () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    const updatedFaq = faqs?.map((item) => {
      if (item?.id === open?.id) {
        return formData;
      } else {
        return item;
      }
    });
    updateFAQ({
      id: isFaqCreated,
      credentials: { title: "FAQ", slug: "faq", content: { faq: updatedFaq } },
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success("FAQ updated successfully!");
        setFormData({ question: "", answer: "", id: crypto.randomUUID() });
        onSuccess();
        onClose();
      }
    });
  };

  return (
    <GlobalModal
      open={open}
      onClose={onClose}
      onSubmit={handleSave}
      title="Edit FAQ"
      submitText="Save Changes"
      loading={isLoading}
      disableSubmit={isObjectSame(formData, open)}
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
