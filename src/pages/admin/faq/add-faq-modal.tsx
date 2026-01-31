import { useState } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import GlobalModal from "../../../components/global-modal";
import { OutlineInput } from "../../../components";
import {
  useAddPageMutation,
  useUpdatePageMutation,
} from "../../../services/static-pages";
import { isObjectValid } from "../../../utils";

const AddFAQModal = ({ open, onClose, isFaqCreated, onSuccess, faqs }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    id: crypto.randomUUID(),
  });
  const [addFAQ, { isLoading: addLoading }] = useAddPageMutation();
  const [updateFAQ, { isLoading: editLoading }] = useUpdatePageMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    addFAQ({ title: "FAQ", slug: "faq", content: { faq: [formData] } }).then(
      (res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success("FAQ added successfully!");
          setFormData({ question: "", answer: "", id: crypto.randomUUID() });
          onSuccess();
          onClose();
        }
      }
    );
  };

  const handleEdit = () => {
    updateFAQ({
      id: isFaqCreated,
      credentials: {
        title: "FAQ",
        slug: "faq",
        content: {
          faq: [
            ...faqs?.map((item) => {
              return {
                id: item?.id,
                question: item?.question,
                answer: item?.answer,
              };
            }),
            formData,
          ],
        },
      },
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success("FAQ added successfully!");
        setFormData({ question: "", answer: "", id: crypto.randomUUID() });
        onSuccess();
        onClose();
      }
    });
  };

  const handleSubmit = () => {
    if (!isObjectValid(formData)) {
      toast.error("Please fill in all fields");
      return;
    }
    if (isFaqCreated) {
      handleEdit();
    } else {
      handleAdd();
    }
  };

  return (
    <GlobalModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add New FAQ"
      submitText="Add FAQ"
      loading={addLoading || editLoading}
    >
      <Box display="flex" flexDirection="column" gap={3} mt={1}>
        <OutlineInput
          name="question"
          label="Question"
          placeholder="Write Down Your Question Here"
          value={formData.question}
          onChange={handleChange}
        />
        <OutlineInput
          id="faq-answer"
          name="answer"
          label="Answer"
          placeholder="Write Down Your Answer Here"
          value={formData.answer}
          onChange={handleChange}
          multiline
          rows={4}
        />
      </Box>
    </GlobalModal>
  );
};

export default AddFAQModal;
