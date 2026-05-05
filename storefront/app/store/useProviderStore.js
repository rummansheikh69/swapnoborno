import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useProviderStore = create((set) => ({
  providers: [],
  isLoading: false,

  /** FETCH ALL PROVIDERS */
  fetchProviders: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/utils/offers");
      set({ providers: res.data, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  /** CREATE PROVIDER */
  createProviderFull: async (payload) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/admin/provider", payload);
      set((state) => ({
        providers: [res.data, ...state.providers],
        isLoading: false,
      }));
      window.location.reload();
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  /** UPDATE PROVIDER */
  updateProvider: async (providerId, payload) => {
    try {
      const res = await axiosInstance.put(
        `/admin/provider/${providerId}`,
        payload,
      );
      set((state) => ({
        providers: state.providers.map((p) =>
          p._id === providerId ? res.data : p,
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  /** DELETE PROVIDER */
  deleteProvider: async (providerId) => {
    try {
      await axiosInstance.delete(`/admin/provider/${providerId}`);
      set((state) => ({
        providers: state.providers.filter((p) => p._id !== providerId),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  /** UPDATE CATEGORY */
  updateCategory: async (providerId, categoryId, payload) => {
    try {
      const res = await axiosInstance.put(
        `/admin/provider/${providerId}/category/${categoryId}`,
        payload,
      );
      set((state) => ({
        providers: state.providers.map((p) =>
          p._id === providerId ? res.data : p,
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  /** DELETE CATEGORY */
  deleteCategory: async (providerId, categoryId) => {
    try {
      await axiosInstance.delete(
        `/admin/provider/${providerId}/category/${categoryId}`,
      );
      set((state) => ({
        providers: state.providers.map((p) =>
          p._id === providerId
            ? {
                ...p,
                categories: p.categories.filter((c) => c._id !== categoryId),
              }
            : p,
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  /** UPDATE OFFER */
  updateOffer: async (providerId, categoryId, offerId, payload) => {
    try {
      const res = await axiosInstance.put(
        `/admin/provider/${providerId}/category/${categoryId}/offer/${offerId}`,
        payload,
      );
      set((state) => ({
        providers: state.providers.map((p) =>
          p._id === providerId ? res.data : p,
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  addOffer: async (providerId, categoryId, offerData) => {
    try {
      const res = await axiosInstance.post(
        `/admin/providers/${providerId}/category/${categoryId}/offer`,
        offerData,
      );

      window.location.reload();
    } catch (error) {
      console.error("Error adding offer:", error);
    }
  },

  /** DELETE OFFER */
  deleteOffer: async (providerId, categoryId, offerId) => {
    try {
      await axiosInstance.delete(
        `/admin/provider/${providerId}/category/${categoryId}/offer/${offerId}`,
      );
      set((state) => ({
        providers: state.providers.map((p) =>
          p._id === providerId
            ? {
                ...p,
                categories: p.categories.map((c) =>
                  c._id === categoryId
                    ? {
                        ...c,
                        offers: c.offers.filter((o) => o._id !== offerId),
                      }
                    : c,
                ),
              }
            : p,
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
