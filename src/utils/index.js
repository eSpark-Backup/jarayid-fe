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
export const isObjectValid = (obj) => {
  return Object.values(obj).every(
    (val) =>
      val !== null &&
      val !== undefined &&
      !(typeof val === "string" && val.trim() === "")
  );
};

export const isObjectSame = (obj1, obj2) => {
  if (!obj1 || !obj2) return false;

  const normalize = (val) => {
    if (val === null || val === undefined) return "";
    if (typeof val === "string") return val.trim();
    return val;
  };

  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of keys) {
    if (normalize(obj1[key]) !== normalize(obj2[key])) {
      return false;
    }
  }

  return true;
};

export const buildQueryParams = (params) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "");

    if (!isEmpty) {
      query.append(key, value);
    }
  });

  return query.toString();
};
