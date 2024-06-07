import { httpClient } from "../axios/httpClient";

export const getListBooks = (params) => {
  return httpClient.get("books", { params });
};

export const getBookDetails = (id) => {
  return httpClient.get(`books/${id}`);
};

export const createBook = (body) => {
  return httpClient.post("books", body);
};

export const updateBook = (id, body) => {
  return httpClient.put(`books/${id}`, body);
};

export const deleteBook = (id) => {
  return httpClient.delete(`books/${id}`);
};
