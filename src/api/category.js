import { requestWithOutToken } from "@/utils/request";

export const getTopCategoryById = (id) => {
  return requestWithOutToken("category", "get", { id });
};
