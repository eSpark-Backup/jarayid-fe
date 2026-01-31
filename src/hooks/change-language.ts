import { useDispatch } from "react-redux";
import i18n from "i18next";
import { changeLanguage } from "../store/slices/lang";

const useLanguageSwitcher = () => {
  const dispatch = useDispatch();

  const availableLanguages = {
    en: "en",
    ar: "ar",
  };

  const switchLanguage = (lng) => {
    if (!availableLanguages[lng]) return;
    i18n.changeLanguage(lng);
    dispatch(changeLanguage(lng));
  };

  return {
    switchLanguage,
  };
};

export default useLanguageSwitcher;
