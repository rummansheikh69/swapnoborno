import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useOfficerStore = create((set) => ({
  officers: [],
  isLoading: false,
  isSubmitting: false,

  // CREATE
  createOfficer: async (formData) => {
    try {
      set({ isSubmitting: true });
      const res = await axiosInstance.post("/admin/officer", formData);
      set((state) => ({ officers: [res.data, ...state.officers] }));
      toast.success("Officer created");
    } catch (error) {
      toast.error("Create failed");
    } finally {
      set({ isSubmitting: false });
    }
  },

  // GET ALL
  fetchOfficers: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/admin/officer");
      set({ officers: res.data });
    } catch (error) {
      toast.error("Fetch failed");
    } finally {
      set({ isLoading: false });
    }
  },

  // UPDATE
  updateOfficer: async (id, formData) => {
    try {
      set({ isSubmitting: true });
      const res = await axiosInstance.put(`/admin/officer/${id}`, formData);
      set((state) => ({
        officers: state.officers.map((o) => (o._id === id ? res.data : o)),
      }));
      toast.success("Officer updated");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      set({ isSubmitting: false });
    }
  },

  // DELETE
  deleteOfficer: async (id) => {
    try {
      await axiosInstance.delete(`/admin/officer/${id}`);
      set((state) => ({
        officers: state.officers.filter((o) => o._id !== id),
      }));
      toast.success("Officer deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  },
}));
