import { requestWithOutToken } from "@/utils/request";

/**
 * 根据商品ID获取商品详情信息
 * @param id 商品ID
 * @returns {Promise}
 */
export const getGoodsDetailByIdApi = (id) => {
  return requestWithOutToken("/goods", "get", { id });
};

/**
 * 获取相关商品、猜你喜欢
 * @param id 商品ID 不传ID表示获取猜你喜欢数据
 * @param limit 需要获取的数据量
 * @returns {Promise}
 */
export const getRelevantGoodsApi = (id, limit) => {
  return requestWithOutToken("/goods/relevant", "get", { id, limit });
};
