import axios from './index';

export const getProducts = () => {
  return axios.get(`/products`);
}