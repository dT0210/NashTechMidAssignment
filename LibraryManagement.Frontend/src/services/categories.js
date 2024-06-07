import { httpClient } from "../axios/httpClient";

export const getListCategories = (params) => {
  return httpClient.get("/categories", { params });
};

export const getCategoryDetails = (id) => {
  return httpClient.get(`/categories/${id}`);
};

export const createCategory = (data) => {
  return httpClient.post("/categories", data);
};

export const updateCategory = (id, data) => {
  return httpClient.put(`/categories/${id}`, data);
};

export const deleteCategory = (id) => {
  return httpClient.delete(`/categories/${id}`);
};
