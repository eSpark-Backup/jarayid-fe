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
