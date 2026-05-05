"use client";
import AdminNavigation from "@/app/components/admin/AdminNavigation";
import AuthGuard from "@/app/components/utils/AuthGuard";
import { useBannerStore } from "@/app/store/useBannerStore";
import { useEffect, useState } from "react";

export default function AdminBanner() {
  const {
    banners,
    fetchBanners,
    createBanner,
    updateBanner,
    deleteBanner,
    isLoading,
    isSubmitting,
  } = useBannerStore();

  const [form, setForm] = useState({
    image: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  // handle image base64
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) return;

    if (editId) {
      await updateBanner(editId, form);
      setEditId(null);
    } else {
      await createBanner(form);
    }

    setForm({ image: "" });
  };

  const handleEdit = (banner) => {
    setEditId(banner._id);
    setForm({ image: "" });
  };

  return (
    <AuthGuard requireAdmin>
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <AdminNavigation />
        {/* FORM */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "Update Banner" : "Create Banner"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="file" accept="image/*" onChange={handleImage} />

            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="w-40 h-32 object-cover rounded"
              />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-4 py-2 rounded"
            >
              {isSubmitting
                ? "Processing..."
                : editId
                  ? "Update Banner"
                  : "Create Banner"}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">All Banners</h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : banners.length === 0 ? (
            <p>No banners found</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <div
                  key={banner._id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <img
                    src={banner.image}
                    alt="banner"
                    className="w-full h-32 object-cover rounded"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBanner(banner._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
