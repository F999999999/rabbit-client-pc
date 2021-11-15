import { requestWithOutToken } from "@/utils/request";

/**
 * 获取分类列表数据
 * @returns {Promise}
 */
export const getCategoriesApi = () => {
  return requestWithOutToken("/home/category/head", "get");
};

/**
 * 获取热门品牌数据
 * @property {number} limit 获取数量
 * @returns {Promise}
 */
export const getHotBrandApi = (limit = 10) => {
  return requestWithOutToken("/home/brand", "get", { limit });
};
