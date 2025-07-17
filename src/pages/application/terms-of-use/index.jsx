import { useTranslation } from "react-i18next";
import LegalPageLayout from "../../../components/legal-page-layout";

const TermsOfUse = () => {
  const { t } = useTranslation();
  const title = t("termsOfUse.title");
  const paragraphs = t("termsOfUse.paragraphs", { returnObjects: true });

  return <LegalPageLayout title={title} paragraphs={paragraphs} />;
};

export default TermsOfUse;
