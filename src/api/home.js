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
 * @property {number} limit 限制获取的数量
 * @returns {Promise}
 */
export const getHotBrandApi = (limit = 10) => {
  return requestWithOutToken("/home/brand", "get", { limit });
};

/**
 * 获取轮播图数据
 * @param distributionSite 投放位置 1.首页 2.分类商品页（默认：1）
 * @returns {Promise}
 */
export const getBannerApi = (distributionSite = 1) => {
  return requestWithOutToken("/home/banner", "get", { distributionSite });
};

/**
 * 获取新鲜好物
 * @param limit 限制获取的数量
 * @returns {Promise}
 */
export const getNewGoodsApi = (limit) => {
  return requestWithOutToken("/home/new", "get", { limit });
};

/**
 * 获取人气推荐
 * @returns {Promise}
 */
export const getHotGoodsApi = () => {
  return requestWithOutToken("/home/hot", "get");
};
/**
 * 获取产品区块数据
 * @returns {Promise}
 */
export const getProductsApi = () => {
  return requestWithOutToken("/home/goods", "get");
};
