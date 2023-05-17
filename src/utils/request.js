import axios from 'axios';

const request = axios.create({
  baseURL: 'https://apisk.bkt.net.vn/',
});

export const get = async (path, option = {}) => {
  const respone = await request.get(path, option);
  return respone;
};
export const getAll = async (path, header, option = {}) => {
  const respone = await request.get(path, header, option);
  return respone.data;
};

export const post = async (path, data = {}, headers = {}) => {
  const respone = await request.post(path, data, headers);
  return respone.data;
};

// Đoạn ở trên nếu sai thì dùng base url cũ
export const getGame = async (path, option = {}) => {
  const respone = await request.get(path, option);
  return respone;
};
export const getAllGame = async (path, header, option = {}) => {
  const respone = await request.get(path, header, option);
  return respone.data;
};

export const postGame = async (path, data = {}, headers = {}, params = {}, params2 = {}) => {
  const respone = await request.post(path, data, headers, params, params2);
  return respone.data;
};

export default request;
