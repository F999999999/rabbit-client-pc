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
 * @param limit 需要获取的数据量（默认值：16）
 * @returns {Promise}
 */
export const getRelevantGoodsApi = (id, limit = 16) => {
  return requestWithOutToken("/goods/relevant", "get", { id, limit });
};

/**
 * 获取热销商品
 * @param id 商品ID 根据此ID获取其同类的热销商品
 * @param type 热销类型 1.24小时 2.周榜 3.总榜（默认值：1）
 * @param limit 需要获取的数据量（默认值：3）
 * @returns {Promise}
 */
export const getHotGoodsApi = (id, type = 1, limit = 3) => {
  return requestWithOutToken("/goods/hot", "get", { id, type, limit });
};
