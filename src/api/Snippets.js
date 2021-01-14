import axios from './index';

export const getSnippets = () => {
  return axios.get(`/snippets`);
};

export const addSnippet = (data) => {
  return axios.post(`/snippets`, data);
}