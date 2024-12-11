import axios from "axios";
// https://ecom-server-chi.vercel.app
// http://localhost:5001
export const getOrdersAdmin = async (token) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  return axios.put(
    `${import.meta.env.VITE_API_URL}/api/admin/order-status`,
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getListAllUsers = async (token) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserStatus = async (token, value) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/api/change-status`, value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token, value) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/api/change-role`, value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
