import { useState } from "react";
import { toast } from "react-toastify";
import GlobalModal from "../../../components/global-modal";
import { OutlineInput, OutlineSelect } from "../../../components";
import { isObjectValid } from "../../../utils";
import { useAddCateoryMutation } from "../../../services/categories";

const AddCategoryModal = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    description: "",
  });

  const [AddCateory, { isLoading }] = useAddCateoryMutation();
  const handleSubmit = () => {
    if (!isObjectValid(formData)) {
      toast.error("Please fill all required fields");
      return;
    } else {
      AddCateory(formData).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message);
          setFormData({
            type: "",
            name: "",
            description: "",
          });
          onClose();
          onSuccess();
          return;
        }
      });
    }
  };

  return (
    <GlobalModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={"Create New Category "}
      submitText={"Create Category"}
      disableSubmit={!isObjectValid(formData)}
      loading={isLoading}
      height={"auto"}
    >
      <OutlineSelect
        options={[
          { label: "Normal", value: "NORMAL" },
          { label: "Country", value: "COUNTRY" },
        ]}
        label="Category Type"
        placeholder="Select"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />
      <OutlineInput
        required
        label="Display Title"
        placeholder="eg. latest Technology ,News etc"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <OutlineInput
        required
        label="Description"
        placeholder="Brief Description..."
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
    </GlobalModal>
  );
};

export default AddCategoryModal;
