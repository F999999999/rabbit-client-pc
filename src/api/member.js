import { requestWithToken } from "@/utils/request";

/**
 * 获取我的收藏
 * @param collectType 收藏类型 1.商品 2.专题 3.品牌（默认值：1）
 * @param page 页码（默认值：1）
 * @param pageSize 需要获取的数据量（默认值：10）
 * @returns {Promise}
 */
export const getCollectionApi = ({
  collectType = 1,
  page = 1,
  pageSize = 10,
}) => {
  return requestWithToken("/member/collect", "get", {
    collectType,
    page,
    pageSize,
  });
};

/**
 * 获取我的足迹
 * @param page 页面（默认值：1）
 * @param pageSize 需要获取的数据量（默认值：10）
 * @returns {Promise}
 */
export const getBrowseHistoryApi = ({ page = 1, pageSize = 10 }) => {
  return requestWithToken("/member/browseHistory", "get", { page, pageSize });
};

/**
 * 获取订单列表
 * @param page 页码
 * @param pageSize 每页显示数据量
 * @param orderState 订单状态 0.全部 1.待付款 2.待发货 3.待收货 4.待评价 5.已完成 6.已取消
 * @returns {Promise}
 */
export const getOrderListApi = ({ page, pageSize, orderState }) => {
  return requestWithToken("/member/order", "get", {
    page,
    pageSize,
    orderState,
  });
};
