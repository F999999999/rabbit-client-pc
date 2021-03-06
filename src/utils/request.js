import axios from "axios";
import store from "@/store";
import router from "@/router";

// 配置基准请求地址
export const baseURL = "https://pcapi-xiaotuxian-front-devtest.itheima.net/";

// 创建一个新的 axios 实例对象，用于配置和小兔鲜服务器端相关的请求
// 带 Token 的 axios 实例
const instanceWithToken = axios.create({ baseURL });
// 配置请求拦截器
instanceWithToken.interceptors.request.use((config) => {
  //  判断 Token 是否存在
  const token = store.state.user.profile.token;
  //  如果 Token 存在
  if (token) {
    //将 Token 添加到请求头中
    config.headers.Authorization = `Bearer ${token}`;
  }
  // 返回修改后的配置信息
  return config;
});
//配置响应拦截器
instanceWithToken.interceptors.response.use(
  (response) => {
    // 处理服务器返回的是成功的状态码
    // 精简数据层级
    return response.data;
  },
  (error) => {
    // 处理服务器返回值是失败的状态码
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 登录失效
          console.log(401);
          // 删除 用户信息
          store.commit("user/setProfile", {});
          // 跳转到登录页面
          router
            .push("/login")
            .then(() => {
              console.log("跳转成功");
            })
            .catch(() => {
              console.log("跳转失败");
            });
          return;
        default:
          break;
      }
    }
    // 返回错误信息
    return Promise.reject(error);
  }
);

// 不带 Token 的 axios 实例
const instanceWithOutToken = axios.create({ baseURL });
//配置响应拦截器
instanceWithOutToken.interceptors.response.use((response) => {
  // 精简数据层级
  return response.data;
});

// 生成请求配置
const generateRequestConfig = (url, method, data) => {
  return {
    url,
    method,
    [method === "get" ? "params" : "data"]: data,
  };
};

export const requestWithToken = (url, method, data) => {
  return instanceWithToken(generateRequestConfig(url, method, data));
};

export const requestWithOutToken = (url, method, data) => {
  return instanceWithOutToken(generateRequestConfig(url, method, data));
};
