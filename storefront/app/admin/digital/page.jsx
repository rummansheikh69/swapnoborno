"use client";
import { useEffect, useState } from "react";
import AdminNavigation from "@/app/components/admin/AdminNavigation";
import { useUtilsStore } from "@/app/store/useUtilsStore";
import AuthGuard from "@/app/components/utils/AuthGuard";

export default function AdminDigitalProduct() {
  const {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading,
    isSubmitting,
  } = useUtilsStore();

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateProduct(editId, form);
      setEditId(null);
    } else {
      await createProduct(form);
    }

    setForm({ title: "", price: "", image: "" });
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      title: product.title,
      price: product.price,
      image: "",
    });
  };

  return (
    <AuthGuard requireAdmin>
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <AdminNavigation />
        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "Update Product" : "Create Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2 rounded"
            />

            <input type="file" accept="image/*" onChange={handleImage} />

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
              {isSubmitting ? "Processing..." : editId ? "Update" : "Create"}
            </button>
          </form>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">All Products</h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {products?.map((p) => (
                <div key={p._id} className="border p-4 rounded space-y-3">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-32 object-cover rounded"
                  />
                  <h3 className="font-medium">{p.title}</h3>
                  <p className="text-sm text-gray-600">৳ {p.price}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
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
