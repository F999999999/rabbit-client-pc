import { rest, setupWorker } from "msw";
import faker from "faker";
import { baseURL } from "@/utils/request";

faker.locale = "zh_CN";

/**
 * 生产指定长度的模拟数组数据
 * @param length 数组长度
 * @param generator 生成器
 * @returns {unknown[]}
 */
const makeArray = (length, generator) => {
  return Array.from({ length }, generator);
};

const worker = setupWorker(
  // 模拟我的收藏接口
  rest.get(`${baseURL}member/collect`, (req, res, ctx) => {
    return res(
      ctx.json({
        msg: "成功",
        result: {
          counts: 50,
          page: req.url.searchParams.get("page"),
          pageSize: req.url.searchParams.get("pageSize"),
          pages: 0,
          items: makeArray(req.url.searchParams.get("pageSize"), () => ({
            id: faker.datatype.uuid(),
            name: faker.internet.userName(),
            desc: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${faker.datatype.number(
              { min: 1, max: 8 }
            )}.jpg`,
          })),
        },
      })
    );
  })
);

export default worker;
