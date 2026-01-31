import { useState } from "react";
import { toast } from "react-toastify";
import GlobalModal from "../../../components/global-modal";
import { OutlineInput, OutlineSelect } from "../../../components";
import { isObjectValid } from "../../../utils";
import { useUpdateCateoryMutation } from "../../../services/categories";

const AddSeoCategoryModal = ({ categories, open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: "",
    metaTitle: "",
    metaDescription: "",
    metaLink: "",
  });

  const [updateCateory, { isLoading }] = useUpdateCateoryMutation();
  const handleSubmit = () => {
    if (!isObjectValid(formData)) {
      toast.error("Please fill all required fields");
      return;
    } else {
      const obj = {
        title: formData?.metaTitle,
        description: formData?.metaDescription,
        canonicalUrl: formData?.metaLink,
      };
      const formdata = new FormData();
      formdata.append("seoMeta", JSON.stringify(obj));
      updateCateory({
        id: formData?.type,
        credentials: formdata,
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message);
          setFormData({
            type: "",
            metaTitle: "",
            metaDescription: "",
            metaLink: "",
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
      title={"Adding New Seo Category"}
      submitText={"Create Category"}
      disableSubmit={!isObjectValid(formData)}
      loading={isLoading}
      height={"auto"}
      width="549px"
    >
      <OutlineSelect
        options={categories?.map((cat) => {
          return { label: cat.name, value: cat.id };
        })}
        label="Category Type"
        placeholder="Select"
        value={formData.type}
        onChange={(e) =>
          setFormData({
            ...formData,
            type: e.target.value,
            metaTitle: categories?.find((cat) => cat.id === e.target.value)
              ?.metaTitle,
            metaDescription: categories?.find(
              (cat) => cat.id === e.target.value
            )?.metaDescription,
            metaLink: categories?.find((cat) => cat.id === e.target.value)
              ?.metaCanonicalUrl,
          })
        }
      />
      <OutlineInput
        required
        label="Meta Title"
        placeholder="eg. latest Technology ,News etc"
        value={formData.metaTitle}
        onChange={(e) =>
          setFormData({ ...formData, metaTitle: e.target.value })
        }
      />
      <OutlineInput
        required
        label="Meta Description"
        placeholder="Brief Description..."
        value={formData.metaDescription}
        onChange={(e) =>
          setFormData({ ...formData, metaDescription: e.target.value })
        }
      />
      <OutlineInput
        required
        label="Schema Category Link"
        placeholder="Paste Link Here"
        value={formData.metaLink}
        onChange={(e) => setFormData({ ...formData, metaLink: e.target.value })}
      />
    </GlobalModal>
  );
};

export default AddSeoCategoryModal;
