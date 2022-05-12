import axios from "axios";
import { POST_LOGIN, POST_REGISTER, FETCH_PROPERTY } from "./data/controllers";
import { API_ENDPOINT } from "./data/environment";
import { Authentication } from './services/authentication';

const jwtApiCall = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 1000,
  headers: { 'Authorization': Authentication.bearerToken }
});

const responseBody = res => res.data;

const noTokenRequest = {
  post: (url, body) =>
    axios.post(`${API_ENDPOINT}${url}`, body).then(responseBody),
};

const request = {
  post: (url, body) =>
    jwtApiCall.post(`${API_ENDPOINT}${url}`, body).then(responseBody),
};

const Auth = {
  login: (email, password) =>
    noTokenRequest.post(POST_LOGIN, { email, password }),
  register: (email, password, fname, lname, type) =>
    noTokenRequest.post(POST_REGISTER, { email, password, fname, lname, type })
};

const Search = {
  fetch: (searchBody) =>
    request.post(FETCH_PROPERTY, searchBody)
}

export default {
  Auth, Search
};
