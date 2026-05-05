import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useBannerStore = create((set) => ({
  banners: [],
  isLoading: false,
  isSubmitting: false,

  // CREATE
  createBanner: async (formData) => {
    try {
      set({ isSubmitting: true });

      const res = await axiosInstance.post("/admin/banner", formData);

      set((state) => ({
        banners: [res.data, ...state.banners],
      }));

      toast.success("Banner created");
    } catch (error) {
      toast.error("Create failed");
    } finally {
      set({ isSubmitting: false });
    }
  },

  // GET ALL
  fetchBanners: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/admin/banner");

      set({ banners: res.data });
    } catch (error) {
      toast.error("Fetch failed");
    } finally {
      set({ isLoading: false });
    }
  },

  // UPDATE
  updateBanner: async (id, formData) => {
    try {
      set({ isSubmitting: true });

      const res = await axiosInstance.put(`/admin/banner/${id}`, formData);

      set((state) => ({
        banners: state.banners.map((b) => (b._id === id ? res.data : b)),
      }));

      toast.success("Banner updated");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      set({ isSubmitting: false });
    }
  },

  // DELETE
  deleteBanner: async (id) => {
    try {
      await axiosInstance.delete(`/admin/banner/${id}`);

      set((state) => ({
        banners: state.banners.filter((b) => b._id !== id),
      }));

      toast.success("Banner deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  },
}));
