import { requestWithOutToken } from "@/utils/request";

/**
 * 获取分类列表数据
 * @returns {Promise}
 */
export const getCategoriesApi = () => {
  return requestWithOutToken("/home/category/head", "get");
};
