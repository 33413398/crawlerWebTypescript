import axios from 'axios'
import qs from 'qs'

let myAxiox = axios.create({
  baseURL:'',
  timeout: 3000,
})
// 请求
myAxiox.interceptors.request.use(function (config) {
  config.data = qs.stringify(config.data)
  return config;
}, function (error) {
  return Promise.reject(error);
});
// 相应
myAxiox.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default myAxiox