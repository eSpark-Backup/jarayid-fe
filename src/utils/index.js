import { useLocation } from "react-router-dom";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function getValue(item, keys) {
  if (keys.length === 1) {
    return item[keys[0]];
  }
  let value = item;

  keys.forEach((key) => {
    value = value[key];
  });

  return value;
}

// utils/translateText.js

export const translateText = async (text, from = "en", to = "ar") => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${from}|${to}&de=aniwellexchange@gmail.com`
    );

    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return "Translation failed";
  }
};

export const getYouTubeEmbedUrl = (youtubeUrl) => {
  const url = new URL(youtubeUrl);
  const videoId = url.searchParams.get("v");
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};
