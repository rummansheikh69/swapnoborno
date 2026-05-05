import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useRulesStore = create((set) => ({
  rulesList: [],
  isLoading: false,
  isSubmitting: false,

  // ================= CREATE =================
  createRules: async (data) => {
    try {
      set({ isSubmitting: true });

      const res = await axiosInstance.post("/admin/rules", data);

      set((state) => ({
        rulesList: [res.data, ...state.rulesList],
      }));

      toast.success("Rules created");
    } catch (error) {
      toast.error("Create failed");
    } finally {
      set({ isSubmitting: false });
    }
  },

  // ================= GET ALL =================
  fetchRules: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/admin/rules");

      set({ rulesList: res.data });
    } catch (error) {
      toast.error("Fetch failed");
    } finally {
      set({ isLoading: false });
    }
  },

  // ================= UPDATE =================
  updateRules: async (id, data) => {
    try {
      set({ isSubmitting: true });

      const res = await axiosInstance.put(`/admin/rules/${id}`, data);

      set((state) => ({
        rulesList: state.rulesList.map((item) =>
          item._id === id ? res.data : item,
        ),
      }));

      toast.success("Rules updated");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      set({ isSubmitting: false });
    }
  },

  // ================= DELETE =================
  deleteRules: async (id) => {
    try {
      await axiosInstance.delete(`/admin/rules/${id}`);

      set((state) => ({
        rulesList: state.rulesList.filter((item) => item._id !== id),
      }));

      toast.success("Rules deleted");
    } catch (error) {
      console.log("Error deleting rules", error);
    }
  },
}));
