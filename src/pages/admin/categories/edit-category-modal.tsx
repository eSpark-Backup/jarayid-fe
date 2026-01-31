import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GlobalModal from "../../../components/global-modal";
import { OutlineInput, OutlineSelect } from "../../../components";
import { isObjectSame, isObjectValid } from "../../../utils";
import { useUpdateCateoryMutation } from "../../../services/categories";

const EditCategoryModal = ({ open, onClose, onSuccess }) => {
  const obj = {
    type: open?.type,
    name: open?.name,
    description: open?.description,
  };
  const [formData, setFormData] = useState(obj);

  useEffect(() => {
    setFormData(obj);
  }, [open]);

  const [updateCateory, { isLoading }] = useUpdateCateoryMutation();
  const handleSubmit = () => {
    if (!isObjectValid(formData)) {
      toast.error("Please fill all required fields");
      return;
    } else {
      updateCateory({ id: open?.id, credentials: formData }).then((res) => {
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
      title={"Edit Category "}
      submitText={"Edit"}
      disableSubmit={!isObjectValid(formData) || isObjectSame(obj, formData)}
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

export default EditCategoryModal;
