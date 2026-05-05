import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set, get) => ({
  verificatios: [],
  singleVerification: null,
  isLoading: false,
  isMarkVerifiedLoading: false,
  isMarkRejectedLoading: false,

  categories: [],
  isSubmitting: false,

  getAllVerificatios: async (status) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(
        `/admin/verifications?status=${status}`,
      );
      set({ verificatios: res.data });
    } catch (error) {
      console.log("Error in getAllVerificatios", error);
      toast.error("Error fetching verificatios");
    } finally {
      set({ isLoading: false });
    }
  },
  getSingleVerification: async (verificationId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(
        `/admin/getVerification/${verificationId}`,
      );
      set({ singleVerification: res.data });
    } catch (error) {
      console.log("Error in getSingleVerification", error);
      toast.error("Error fetching verification");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteVerification: async (verificationId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(
        `/admin/verification/${verificationId}`,
      );
      window.location.href = "/admin/verification/";
      toast.success("Verification deleted");
    } catch (error) {
      console.log("Error in deleteVerification", error);
      toast.error("Error deleting verification");
    } finally {
      set({ isLoading: false });
    }
  },
  markAsVerified: async (verificationId) => {
    set({ isMarkVerifiedLoading: true });
    try {
      const res = await axiosInstance.post(
        `/admin/markAsVerified/${verificationId}`,
      );
      window.location.reload();
    } catch (error) {
      console.log("Error in markAsVerified", error);
      toast.error("Error marking as verified");
    } finally {
      set({ isMarkVerifiedLoading: false });
    }
  },
  markAsRejected: async (verificationId) => {
    set({ isMarkRejectedLoading: true });
    try {
      const res = await axiosInstance.post(
        `/admin/markAsRejected/${verificationId}`,
      );
      window.location.reload();
    } catch (error) {
      console.log("Error in markAsRejected", error);
      toast.error("Error marking as rejected");
    } finally {
      set({ isMarkRejectedLoading: false });
    }
  },

  // ==============================
  // CREATE CATEGORY
  // ==============================
  createCategory: async (data) => {
    try {
      set({ isSubmitting: true });

      const res = await axiosInstance.post("/admin/create-category", data);

      set((state) => ({
        categories: [res.data, ...state.categories],
      }));

      toast.success("Category created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Create failed");
    } finally {
      set({ isSubmitting: false });
    }
  },

  // ==============================
  // GET ALL CATEGORIES
  // ==============================
  fetchCategories: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/admin/get-all-categories");

      set({ categories: res.data });
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      set({ isLoading: false });
    }
  },

  // ==============================
  // UPDATE CATEGORY
  // ==============================
  updateCategory: async (id, data) => {
    try {
      set({ isSubmitting: true });

      const res = await axiosInstance.put(`/admin/category/${id}`, data);

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === id ? res.data : cat,
        ),
        singleCategory: res.data,
      }));

      toast.success("Category updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      set({ isSubmitting: false });
    }
  },

  // ==============================
  // DELETE CATEGORY
  // ==============================
  deleteCategory: async (id) => {
    try {
      await axiosInstance.delete(`/admin/category/${id}`);

      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
      }));

      toast.success("Category deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  },
}));
