import { httpClient } from "../axios/httpClient";

export const getListBorrowingRequest = (params) => {
  return httpClient.get("/books-borrowing", { params });
};

export const getListBorrowingRequestByRequestorId = (id, params) => {
  return httpClient.get(`/books-borrowing/users/${id}`, { params });
};

export const createBorrowingRequest = (request) => {
  return httpClient.post("/books-borrowing", request);
};

export const updateBorrowingRequest = (id, status) => {
  return httpClient.put(`/books-borrowing/${id}?status=${status}`);
};

export const getBorrowingRequestById = (id) => {
  return httpClient.get(`/books-borrowing/${id}`);
};
