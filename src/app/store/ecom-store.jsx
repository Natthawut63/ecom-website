import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../../features/shop/api/Category";
import { listProduct, searchFilters } from "../../features/shop/api/Product";
import _ from "lodash";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "../../shared/mock/data";

// return Object Key:Value
const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: MOCK_CATEGORIES,
  products: MOCK_PRODUCTS,
  carts: [],

  logout: () =>
    set({
      user: null,
      token: null,
      categories: MOCK_CATEGORIES,
      products: MOCK_PRODUCTS,
      carts: [],
    }),

  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    //Uniqe
    const uniqe = _.unionWith(updateCart, _.isEqual);
    set({ carts: uniqe });
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  actionLogin: async (form) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, form);
    set({ user: res.data.payload, token: res.data.token });
    return res;
  },

  getCategory: async () => {
    // try {
    //   const res = await listCategory();
    //   set({ categories: res.data });
    // } catch (err) {
    //   console.log(err);
    // }
    set({ categories: MOCK_CATEGORIES });
  },

  getProduct: async (count) => {
    // try {
    //   const res = await listProduct(count); //how much product ?
    //   set({ products: res.data });
    // } catch (err) {
    //   console.log(err);
    // }
    set({ products: MOCK_PRODUCTS });
  },

  actionSearchFilters: async (reg) => {
    // try {
    //   const res = await searchFilters(reg);
    //   set({ products: res.data });
    // } catch (err) {
    //   console.log(err);
    // }

    let filteredProducts = [...MOCK_PRODUCTS];

    if (reg.query) {
      filteredProducts = filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(reg.query.toLowerCase())
      );
    }

    if (reg.category && reg.category.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        reg.category.includes(p.category.id.toString()) || reg.category.includes(p.category.id)
      );
    }

    if (reg.price) {
      filteredProducts = filteredProducts.filter((p) =>
        p.price >= reg.price[0] && p.price <= reg.price[1]
      );
    }

    set({ products: filteredProducts });
  },

  clearCart: () => set({ carts: [] }),
});
const usePersist = {
  name: "ecom-store",
  Storage: createJSONStorage(() => localStorage),
};

const useEconStore = create(persist(ecomStore, usePersist));

export default useEconStore;
