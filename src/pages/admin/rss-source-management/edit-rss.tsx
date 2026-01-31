import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import GlobalModal from "../../../components/global-modal";
import {
  OutlinedFileInput,
  OutlineInput,
  OutlineSelect,
} from "../../../components";
import { isObjectValid } from "../../../utils";
import { useUpdateRssMutation } from "../../../services/rss";

const EditRssModal = ({ open, onClose, onSuccess }) => {
  const { category } = useSelector((state) => state?.category);
  const obj = {
    type: open?.categoryId,
    subType: open?.subType,
    name: open?.name,
    url: open?.url,
    logo: open?.logo,
  };
  const subTypesOptions = [
    {
      label: "SPORTS",
      value: "SPORTS",
    },
    {
      label: "ECONOMICS",
      value: "ECONOMICS",
    },
    {
      label: "POLITICS",
      value: "POLITICS",
    },
  ];
  const [formData, setFormData] = useState(obj);

  useEffect(() => {
    setFormData(obj);
  }, [open]);

  const [updateRss, { isLoading }] = useUpdateRssMutation();
  const handleSubmit = () => {
    if (!isObjectValid(formData)) {
      toast.error("Please fill all required fields");
      return;
    } else {
      const formdata = new FormData();
      formdata.append("categoryId", formData?.type);
      formdata.append("subType", formData?.subType);
      formdata.append("name", formData?.name);
      formdata.append("url", formData?.url);
      if (typeof formData?.logo === "object") {
        formdata.append("logo", formData.logo);
      }
      updateRss({ id: open?.id, credentials: formdata }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message);
          setFormData({
            type: "",
            subType: "",
            name: "",
            url: "",
            logo: "",
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
      title={"Edit RSS Sources"}
      submitText={"Edit RSS Source"}
      disableSubmit={!isObjectValid(formData)}
      loading={isLoading}
      height={"auto"}
    >
      <OutlineSelect
        options={category?.map((cat) => {
          return { label: cat.name, value: cat.id };
        })}
        label="Category Type"
        placeholder="Select"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />
      <OutlineSelect
        options={subTypesOptions}
        label="Sub category"
        placeholder="Select"
        value={formData.subType}
        onChange={(e) => setFormData({ ...formData, subType: e.target.value })}
      />
      <OutlineInput
        required
        label="Source Name"
        placeholder="Enter source name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <OutlineInput
        required
        label="RSS URL"
        placeholder="Enter rss url"
        value={formData.url}
        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
      />
      <OutlinedFileInput
        required
        label="Logo Upload"
        placeholder={
          formData.logo
            ? typeof formData.logo === "string"
              ? formData.logo
              : formData.logo?.name
            : "Choose file"
        }
        onChange={(value) => setFormData({ ...formData, logo: value })}
      />
    </GlobalModal>
  );
};

export default EditRssModal;
