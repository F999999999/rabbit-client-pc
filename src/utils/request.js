import axios from "axios";
import store from "@/store";

const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";

// 创建一个新的 axios 实例对象，专门用于配置和小兔鲜应用相关的请求
// 带 Token 的 axios 实例
const instanceWithToken = axios.create();
// 不带 Token 的 axios 实例
const instanceWithOutToken = axios.create();

// 配置请求拦截器
instanceWithToken.interceptors.request.use((config) => {
  //  判断 Token 是否存在
  const token = store.state.user.profile.token;
  //  如果 Token 存在
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
});
