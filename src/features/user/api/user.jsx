import axios from "axios";

export const createUserCart = async (token, cart) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/api/user/cart`, cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUserCart = async (token) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/api/user/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = async (token, address) => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/user/address`,
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const saveOrder = async (token, payLoad) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/api/user/order`, payLoad, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrders = async (token) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/api/user/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
