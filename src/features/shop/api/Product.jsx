import axios from "axios";

export const createProduct = async (token, form) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/api/product`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 20) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/api/products/` + count, {});
};

export const uploadFiles = async (token, form) => {
  // console.log('form api frontent',form);
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/images`,
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  // console.log('form api frontent',form);
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/removeimages`,
    {
      public_id,
      // {} = key:value
      // , public_id => value
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const readProduct = async (token, id) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/api/product/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (token, id, form) => {
  return axios.put(`${import.meta.env.VITE_API_URL}/api/product/` + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (token, id) => {
  return axios.delete(`${import.meta.env.VITE_API_URL}/api/product/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchFilters = async (arg) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/api/search/filters`, arg);
};

export const listProductBy = async (sort, order, limit) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/api/productby`, {
    sort,
    order,
    limit,
  });
};
