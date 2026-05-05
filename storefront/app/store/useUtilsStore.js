import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUtilsStore = create((set) => ({
  products: [],
  productsByCategory: [],
  isLoading: false,
  isSubmitting: false,

  // CREATE
  createProduct: async (data) => {
    try {
      set({ isSubmitting: true });
      const res = await axiosInstance.post("/admin/createDigitalProduct", data);

      set((state) => ({
        products: [res.data, ...state.products],
      }));

      toast.success("Product created");
    } catch (error) {
      toast.error("Create failed");
    } finally {
      set({ isSubmitting: false });
    }
  },

  // GET ALL
  fetchProducts: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/admin/getAllDigitalProducts");
      set({ products: res.data });
    } catch (error) {
      toast.error("Fetch failed");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/utils/category/${category}`);
      set({ productsByCategory: res.data });
    } catch (error) {
      toast.error("Fetch failed");
    } finally {
      set({ isLoading: false });
    }
  },

  // UPDATE
  updateProduct: async (id, data) => {
    try {
      set({ isSubmitting: true });
      const res = await axiosInstance.put(`/admin/digitalProduct/${id}`, data);

      set((state) => ({
        products: state.products.map((p) => (p._id === id ? res.data : p)),
      }));

      toast.success("Updated successfully");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      set({ isSubmitting: false });
    }
  },

  // DELETE
  deleteProduct: async (id) => {
    try {
      await axiosInstance.delete(`/admin/digitalProduct/${id}`);

      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));

      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Delete failed");
    }
  },
}));
