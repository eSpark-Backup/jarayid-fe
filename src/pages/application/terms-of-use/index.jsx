import { useTranslation } from "react-i18next";
import LegalPageLayout from "../../../components/legal-page-layout";
import { useGetAllPagesQuery } from "../../../services/static-pages";
import { useEffect, useState } from "react";
import { Container, Skeleton } from "@mui/material";

const TermsOfUse = () => {
  const { t } = useTranslation();
  const title = t("termsOfUse.title");
  const paragraphs = t("termsOfUse.paragraphs", { returnObjects: true });
  const [data, setData] = useState("");
  const { data: staticPageData, isLoading: staticPageLoading } =
    useGetAllPagesQuery({ search: "terms" });

  useEffect(() => {
    if (staticPageData) {
      setData(staticPageData?.data?.items[0]?.content?.message);
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
        <LegalPageLayout title={title} paragraphs={data} />
      )}
    </>
  );
};

export default TermsOfUse;
