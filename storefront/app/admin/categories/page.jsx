"use client";
import AdminNavigation from "@/app/components/admin/AdminNavigation";
import AuthGuard from "@/app/components/utils/AuthGuard";
import { useAdminStore } from "@/app/store/useAdminStore";
import { useEffect, useState } from "react";

export default function AdminCategory() {
  const {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading,
    isSubmitting,
  } = useAdminStore();

  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);

  // fetch all
  useEffect(() => {
    fetchCategories();
  }, []);

  // handle text input
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handle image (base64)
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.image) return;

    if (editId) {
      await updateCategory(editId, form);
      setEditId(null);
    } else {
      await createCategory(form);
    }

    setForm({ name: "", image: "" });
  };

  // edit click
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setForm({
      name: cat.name,
      image: cat.image, // leave empty unless replacing
    });
  };

  return (
    <AuthGuard requireAdmin>
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <AdminNavigation />
        {/* ================= CREATE / UPDATE FORM ================= */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "Update Category" : "Create Category"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Category Name"
              className="w-full border p-2 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full"
            />

            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="w-32 h-32 object-cover rounded"
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
                  ? "Update Category"
                  : "Create Category"}
            </button>
          </form>
        </div>

        {/* ================= CATEGORY LIST ================= */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">All Categories</h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : categories.length === 0 ? (
            <p>No categories found</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat._id} className="border rounded-lg p-4 space-y-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-32 object-cover rounded"
                  />

                  <h3 className="text-lg font-medium capitalize">{cat.name}</h3>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCategory(cat._id)}
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
