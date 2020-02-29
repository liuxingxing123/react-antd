import axios from "axios";
import { message } from "antd";
const isDev = process.env.NODE_ENV === "development";
const service = axios.create({
  baseURL: isDev ? "http://rap2api.taobao.org/app/mock/244514" : ""
});

const service1 = axios.create({
  baseURL: isDev ? "http://rap2api.taobao.org/app/mock/244514" : ""
});

service.interceptors.request.use(config => {
  //console.log(config)
  config.data = Object.assign({}, config.data, {
    //authToken:window.localStorage.getItem("authToken")
    authToken: "isiadiasidiasidasidhashd"
  });
  return config;
});

service.interceptors.response.use(resp => {
  if (resp.data.code === 200) {
    return resp.data.data;
  } else {
    //全局处理错误
    message.error(resp.data.errMsg);
  }
});

export const getArticles = (offset = 0, limited = 10) => {
  return service.post("/api/v1/articleList", {
    offset,
    limited
  });
};

export const deleteArticleById = id => {
  return service.post(`/api/v1/articleDelete/${id}`);
};

export const getArticleById = id => {
  return service.post(`/api/v1/article/${id}`);
};

export const saveArticle = (id, data) => {
  return service.post(`/api/v1/articleEdit/${id}`, data);
};

export const getArticleAmount = () => {
  return service.post(`/api/v1/articleAmount`);
};

export const getNotifications = () => {
  return service.post(`/api/v1/notifications`);
};

export const loginRequest = userInfo => {
  return service1.post(`/api/v1/login`, userInfo);
};
