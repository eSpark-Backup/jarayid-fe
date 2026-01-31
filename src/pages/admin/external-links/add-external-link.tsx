import { useState } from "react";
import { toast } from "react-toastify";
import GlobalModal from "../../../components/global-modal";
import { OutlineInput } from "../../../components";
import { isObjectValid } from "../../../utils";
import { useAddExternalLinkMutation } from "../../../services/external-links";

const AddExternalLinkModal = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    toolName: "",
    toolRedirectLink: "",
    status: "ACTIVE",
  });

  const [addExternal, { isLoading }] = useAddExternalLinkMutation();
  const handleSubmit = () => {
    if (!isObjectValid(formData)) {
      toast.error("Please fill all required fields");
      return;
    } else {
      addExternal(formData).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message);
          setFormData({
            toolName: "",
            toolRedirectLink: "",
            status: "ACTIVE",
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
      title={"Add New Link"}
      submitText={"Add Link"}
      disableSubmit={!isObjectValid(formData)}
      loading={isLoading}
      height={"auto"}
    >
      <OutlineInput
        required
        label="Tool Name"
        placeholder="Input Tool Name"
        value={formData.toolName}
        onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
      />
      <OutlineInput
        required
        label="Tool Link"
        placeholder="Input Tool Link"
        value={formData.toolRedirectLink}
        onChange={(e) => setFormData({ ...formData, toolRedirectLink: e.target.value })}
      />
    </GlobalModal>
  );
};

export default AddExternalLinkModal;
