import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components";
import useLanguageSwitcher from "../../../hooks/change-language";

const Home = () => {
  const { t } = useTranslation();
  const { switchLanguage } = useLanguageSwitcher();
  const language = useSelector((state) => state.language);

  return (
    <Button onClick={() => switchLanguage(language === "en" ? "ar" : "en")}>
      {t("home")}
    </Button>
  );
};

export default Home;
