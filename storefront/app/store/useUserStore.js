import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  isCreatingVerification: false,
  verificationForm: null,

  createVerification: async (form) => {
    try {
      set({ isCreatingVerification: true });
      const res = await axiosInstance.post("/user/verify", form);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      set({ isCreatingVerification: false });
    }
  },

  getVerificationForm: async () => {
    try {
      const res = await axiosInstance.get("/user/verification-form");

      set({ verificationForm: res.data });
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch verification form");
      return null;
    }
  },
}));
