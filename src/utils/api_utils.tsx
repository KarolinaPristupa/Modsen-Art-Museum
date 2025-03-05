import { IMAGE_BASE_URL } from "@constants/api";

export const getImageUrl = (imageId?: string) => {
  if (!imageId) return null;
  return `${IMAGE_BASE_URL}/${imageId}/full/400,/0/default.jpg?_=${Date.now()}&rnd=${Math.random()}`;
};

export const createFieldsString = <T extends object>(keys: Array<keyof T>) =>
  keys.join(",");
