import axios from "axios";
import { getHeaderData } from "utils/helpers";

export const api = {
  header: () => {
    const header = getHeaderData();
    return header;
  },
  get: (url) => {
    let headers = api.header();
    headers = { ...headers };
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.REACT_APP_API_URL + url, {
          headers,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (err?.response?.data) {
            resolve(err?.response?.data);
          } else {
            reject(err);
          }
        });
    });
  },

  delete: (url, data) => {
    let headers = api.header();
    headers = { ...headers };
    return new Promise((resolve, reject) => {
      axios
        .delete(process.env.REACT_APP_API_URL + url, {
          headers,
          data,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (err?.response?.data) {
            resolve(err?.response?.data);
          } else {
            reject(err);
          }
        });
    });
  },

  post: (url, data, header = {}) => {
    let headers = api.header();
    headers = { ...headers, ...header };

    return new Promise((resolve, reject) => {
      axios
        .post(process.env.REACT_APP_API_URL + url, data, {
          headers,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (err?.response?.data) {
            resolve(err?.response?.data);
          } else {
            reject(err);
          }
        });
    });
  },

  put: (url, data = {}, header = {}) => {
    let headers = api.header();
    headers = { ...headers, ...header };
    // headers = { ...headers, "Content-Type": "multipart/form-data" };

    return new Promise((resolve, reject) => {
      axios
        .put(process.env.REACT_APP_API_URL + url, data, {
          headers,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (err?.response?.data) {
            resolve(err?.response?.data);
          } else {
            reject(err);
          }
        });
    });
  },
};
