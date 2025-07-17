import { useTranslation } from "react-i18next";
import LegalPageLayout from "../../../components/legal-page-layout";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const title = t("PrivacyPolicy.title");
  const paragraphs = t("PrivacyPolicy.paragraphs", { returnObjects: true });

  return <LegalPageLayout title={title} paragraphs={paragraphs} />;
};

export default PrivacyPolicy;
