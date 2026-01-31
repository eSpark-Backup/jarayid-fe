import { useTranslation } from "react-i18next";
import LegalPageLayout from "../../../components/legal-page-layout";
import { useGetAllPagesQuery } from "../../../services/static-pages";
import { useEffect, useState } from "react";
import { Container, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";

const TermsOfUse = () => {
  const { t } = useTranslation();
  const title = t("termsOfUse.title");
  const paragraphs = t("termsOfUse.paragraphs", { returnObjects: true });
  const [data, setData] = useState("");
  const { data: staticPageData, isLoading: staticPageLoading } =
    useGetAllPagesQuery({ search: "terms" });
  const [translatedData, setTranslatedData] = useState("");
  const language = useSelector((state) => state.language);

  useEffect(() => {
    if (staticPageData) {
      setData(staticPageData?.data?.items[0]?.content?.message);
      setTranslatedData(
        staticPageData?.data?.items[0]?.translatedContent?.arabic?.content
      );
    }
  }, [staticPageData]);

  return (
    <>
      {staticPageLoading ? (
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: "16px", sm: "32px", md: "80px", lg: "160px" },
            minHeight: "calc(100vh - 600px)",
          }}
        >
          {[...Array(3)]?.map((_, index) => (
            <Skeleton
              variant="text"
              key={index}
              height={"40px"}
              sx={{ m: "20px" }}
            />
          ))}
        </Container>
      ) : (
        <LegalPageLayout
          title={title}
          paragraphs={language === "en" ? data : translatedData}
        />
      )}
    </>
  );
};

export default TermsOfUse;
