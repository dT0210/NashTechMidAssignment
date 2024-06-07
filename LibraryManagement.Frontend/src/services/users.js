import { httpClient } from "../axios/httpClient";

export const login = (body) => {
  return httpClient.post("login", body);
};

export const getUser = (id) => {
  return httpClient.get(`users/${id}`);
};
