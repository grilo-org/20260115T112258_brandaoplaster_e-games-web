import axios from "axios";
import Cookie from "js-cookie";
import ApiData from "@/dtos/apiData";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

api.interceptors.response.use(res => {
  if (res.headers['access-token']) {
    const apiData: ApiData = {
      'access-token': res.headers['access-token'],
      client: res.headers.client,
      expiry: res.headers.expiry,
      'token-type': res.headers['token-type'],
      uid: res.headers.uid
    };

    // @ts-ignore
    api.defaults.headers = apiData;
    // @ts-ignore
    Cookie.set('@api-data', apiData);
  }

  return res;
});

api.interceptors.request.use(req => {
  const url = req.url;

  if (url && url.includes('admin')) {
    // @ts-ignore
    const apiData: ApiData | undefined = JSON.parse(Cookie.get('@api-data'));

    if (apiData) {
      // @ts-ignore
      req.headers = apiData;
    }
  }

  return req;
});

export default api;
