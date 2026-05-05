import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  isChangingPass: false,
  isChangingEmail: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      const user = res.data;
      set({ authUser: user });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      const user = res.data;
      set({ authUser: user });

      toast.success("Account created successfully");
    } catch (error) {
      console.log("Error in signUp", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const user = res.data;
      set({ authUser: user });

      toast.success("Logged In");
    } catch (error) {
      console.log("Error in login", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  changePass: async (data) => {
    set({ isChangingPass: true });
    try {
      const res = await axiosInstance.post("/auth/change-password", data);
      const user = res.data;
      set({ authUser: user });

      toast.success("Password Changed");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      console.log("Error in login", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isChangingPass: false });
    }
  },

  changeEmail: async (data) => {
    set({ isChangingEmail: true });
    try {
      const res = await axiosInstance.post("/auth/change-email", data);
      const user = res.data;
      set({ authUser: user });

      toast.success("Email Changed");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      console.log("Error in login", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isChangingEmail: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out");
    } catch (error) {
      console.log("Error in logging out", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
