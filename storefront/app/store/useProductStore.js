import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useProductStore = create((set, get) => ({
  products: [],
  page: 1,
  hasMore: true,
  isLoading: false,

  loading: false,
  editingId: null,
  searchResults: [],
  isSearching: false,

  filters: {
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  },

  // 🔄 Set Filters
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  // 🔄 Reset Products (for new filter/sort)
  resetProducts: () =>
    set({
      products: [],
      page: 1,
      hasMore: true,
    }),

  // 🚀 Fetch Products
  fetchProducts: async (reset = false) => {
    const { page, filters, products } = get();

    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/utils/products", {
        params: {
          page: reset ? 1 : page,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          sort: filters.sort,
        },
      });

      const newProducts = res.data.products;

      set({
        products: reset ? newProducts : [...products, ...newProducts],
        hasMore: res.data.pagination.hasMore,
        page: reset ? 2 : page + 1,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching products", error);
      set({ isLoading: false });
    }
  },

  // Fetch
  fetchProductsForAdmin: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get("/admin/products");
      set({ products: data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  // Create
  createProduct: async (form) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/admin/product", form);
      get().fetchProducts();
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete
  deleteProduct: async (id) => {
    try {
      await axiosInstance.delete(`/admin/product/${id}`);
      set({
        products: get().products.filter((p) => p._id !== id),
      });
    } catch (err) {
      console.error(err);
    }
  },

  // Start editing
  setEditing: (id) => set({ editingId: id }),

  // Update
  updateProduct: async (id, updatedData) => {
    try {
      const { data } = await axiosInstance.put(
        `/admin/product/${id}`,
        updatedData,
      );

      set({
        products: get().products.map((p) => (p._id === id ? data : p)),
        editingId: null,
      });
    } catch (err) {
      console.error(err);
    }
  },

  searchProducts: async (query) => {
    try {
      set({ isSearching: true });
      const res = await axiosInstance.get("/utils/products/search", {
        params: { query },
      });
      set({ products: res.data.products, isLoading: false });
    } catch (error) {
      console.error("Error searching products", error);
    } finally {
      set({ isSearching: false });
    }
  },

  searchProductsNavbar: async (query) => {
    try {
      set({ isSearching: true });
      const res = await axiosInstance.get("/utils/products/search", {
        params: { query },
      });
      set({ searchResults: res.data.products });
    } catch (error) {
      console.error("Error searching products", error);
      set({ searchResults: [] });
    } finally {
      set({ isSearching: false });
    }
  },
}));
