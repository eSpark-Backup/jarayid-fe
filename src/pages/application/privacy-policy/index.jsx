import { useTranslation } from "react-i18next";
import LegalPageLayout from "../../../components/legal-page-layout";
import { useGetAllPagesQuery } from "../../../services/static-pages";
import { useEffect, useState } from "react";
import { Container, Skeleton } from "@mui/material";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const title = t("PrivacyPolicy.title");
  const paragraphs = t("PrivacyPolicy.paragraphs", { returnObjects: true });
  const { data: staticPageData, isLoading: staticPageLoading } =
    useGetAllPagesQuery({ search: "policy" });
  const [data, setData] = useState("");

  useEffect(() => {
    if (staticPageData) {
      setData(staticPageData?.data?.items[0]?.content?.message);
    }
  }, [staticPageData]);

  // return <LegalPageLayout title={title} paragraphs={paragraphs} />;
  return (
    <>
      {staticPageLoading ? (
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: "16px", sm: "32px", md: "80px", lg: "160px" },
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
        <LegalPageLayout title={title} paragraphs={data} />
      )}
    </>
  );
};

export default PrivacyPolicy;
