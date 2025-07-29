import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import GlobalModal from "../../../components/global-modal";
import {
  OutlinedFileInput,
  OutlineInput,
  OutlineSelect,
} from "../../../components";
import { isObjectValid } from "../../../utils";
import { useAddArticleMutation } from "../../../services/articles";

const AddPostModal = ({ open, onClose, onSuccess }) => {
  const { category } = useSelector((state) => state?.category);
  const [formData, setFormData] = useState({
    headline: "",
    type: "",
    logo: "",
    sourceLink: "",
  });

  const [addArticle, { isLoading }] = useAddArticleMutation();
  const handleSubmit = () => {
    if (!isObjectValid(formData)) {
      toast.error("Please fill all required fields");
      return;
    } else {
      const formdata = new FormData();
      formdata.append("title", formData?.headline);
      formdata.append("categoryId", formData?.type);
      formdata.append("source", formData?.sourceLink);
      if (formData?.logo) formdata.append("image", formData?.logo);
      addArticle(formdata).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message);
          setFormData({
            headline: "",
            type: "",
            logo: "",
            sourceLink: "",
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
      title={"Manually Posting"}
      submitText={"Add Post"}
      disableSubmit={!isObjectValid(formData)}
      loading={isLoading}
      height={"auto"}
    >
      <OutlineInput
        required
        label="Headline"
        placeholder="Headline text"
        value={formData.headline}
        onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
      />
      <OutlineSelect
        options={category?.map((cat) => {
          return { label: cat.name, value: cat.id };
        })}
        label="Category Type"
        placeholder="Select"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />
      <OutlinedFileInput
        required
        label="Logo Upload"
        placeholder={formData.logo?.name || "Choose file"}
        onChange={(value) => setFormData({ ...formData, logo: value })}
      />
      <OutlineInput
        required
        label="RSS Source"
        placeholder="Rss source"
        value={formData.sourceLink}
        onChange={(e) =>
          setFormData({ ...formData, sourceLink: e.target.value })
        }
      />
    </GlobalModal>
  );
};

export default AddPostModal;
