import { requestWithOutToken } from "@/utils/request";

/**
 * 根据一级分类ID获取具体信息
 * @param id 一级分类 ID
 * @returns {Promise}
 */
export const getTopCategoryByIdApi = (id) => {
  return requestWithOutToken("category", "get", { id });
};

/**
 * 根据二级分类ID获取筛选条件
 * @param id 二级分类ID
 * @returns {Promise}
 */
export const getSubCategoryFilterByIdApi = (id) => {
  return requestWithOutToken("/category/sub/filter", "get", { id });
};

/**
 * 获取商品列表
 * @param params 分类ID、筛选条件、排序条件、分页信息
 * @returns {Promise}
 */
export const getGoodsList = (params) => {
  return requestWithOutToken("/category/goods", "post", params);
};
