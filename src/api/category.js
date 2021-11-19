import { requestWithOutToken } from "@/utils/request";

/**
 * 根据一级分类ID获取具体信息
 * @param id 一级分类 ID
 * @returns {Promise}
 */
export const getTopCategoryByIdApi = (id) => {
  return requestWithOutToken("category", "get", { id });
};
