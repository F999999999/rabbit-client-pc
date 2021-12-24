import { rest, setupWorker } from "msw";
import { baseURL } from "@/utils/request";
import faker from "faker";

faker.locale = "zh_CN";

const worker = setupWorker(
  rest.get(`${baseURL}message`, (req, res, ctx) => {
    return res(
      ctx.json({
        code: 200,
        data: {
          name: faker.name.firstName(),
          avatar: faker.internet.avatar(),
          phone: faker.phone.phoneNumber(),
          cityName: faker.address.cityName(),
          email: faker.internet.email(),
        },
        message: "hello world",
      })
    );
  })
);

export default worker;
