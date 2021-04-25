import queryString from "query-string";
const axios = require("axios").default;

export const requestPost = async ({ url, body = {}, headers }) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      let errorObj;
      if (typeof data === "string") {
        errorObj = { message: data };
      } else {
        errorObj = data;
      }
      throw errorObj;
    }
  }
};

export const requestFile = async ({ put, patch, url, form, headers }) => {
  try {
    const func = patch ? axios.patch : put ? axios.put : axios.post;
    const response = await func(url, form, {
      headers: {
        ...headers,
        "content-type": "multipart/form-data",
        "Content-Type": "multipart/form-data",
        "Content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      let errorObj;
      if (typeof data === "string") {
        errorObj = { message: data };
      } else {
        errorObj = data;
      }
      throw errorObj;
    }
  }
};

export const requestDelete = async ({ url, headers, query = {} }) => {
  try {
    const qs = queryString.stringify(query);

    const response = await axios.delete(`${url}?${qs}`, { headers });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      let errorObj;
      if (typeof data === "string") {
        errorObj = { message: data };
      } else {
        errorObj = data;
      }
      throw errorObj;
    }
  }
};

export const requestPut = async ({ url, body = {}, headers }) => {
  try {
    const response = await axios.put(url, body, { headers });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      let errorObj;
      if (typeof data === "string") {
        errorObj = { message: data };
      } else {
        errorObj = data;
      }
      throw errorObj;
    }
  }
};
export const requestGet = async ({ url, headers, query = {} }) => {
  try {
    const qs = queryString.stringify(query);
    const response = await axios.get(`${url}?${qs}`, {
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (error) {
    let errorObj;
    if (error.response) {
      const { data } = error.response;
      if (typeof data === "string") {
        errorObj = { message: data };
      } else {
        errorObj = data;
      }
    } else {
      errorObj = error;
    }
    throw errorObj;
  }
};
export const requestPatch = async ({ url, body = {}, headers }) => {
  try {
    const response = await axios.patch(url, body, { headers });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      let errorObj;
      if (typeof data === "string") {
        errorObj = { message: data };
      } else {
        errorObj = data;
      }
      throw errorObj;
    }
  }
};
