import axios from 'axios';
import qs from 'qs';

const { API_END_POINT } = process.env;

const internalHandler = axios.create({
  baseURL: API_END_POINT,
  withCredentials: true,
});

function apiHandler(url, method = 'get', body = {}, config = {}) {
  if (method === 'get') {
    return internalHandler[method](url, config);
  }
  return internalHandler[method](url, qs.stringify(body), config);
}

export default apiHandler;
