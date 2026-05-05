"use client";

import { useEffect, useState } from "react";

import { Trash2, Pencil, Save, X } from "lucide-react";
import { useProductStore } from "@/app/store/useProductStore";
import AdminNavigation from "@/app/components/admin/AdminNavigation";
import { useUtilsStore } from "@/app/store/useUtilsStore";
import { useAdminStore } from "@/app/store/useAdminStore";

export default function AdminProducts() {
  const {
    products,
    fetchProductsForAdmin,
    createProduct,
    deleteProduct,
    updateProduct,
    isLoading,
    isSearching,
    editingId,
    searchProducts,
    setEditing,
  } = useProductStore();

  const { fetchCategories, categories } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    inStock: "",
    rating: "",
    totalReviews: "",
    thumbnailImage: "",
    images: [],
    category: "",
  });

  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchProductsForAdmin();
    fetchCategories();
  }, []);

  // Convert file to base64
  const toBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const handleThumbnail = async (e, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await toBase64(file);
    if (isEdit) setEditForm({ ...editForm, thumbnailImage: base64 });
    else setForm({ ...form, thumbnailImage: base64 });
  };

  const handleImages = async (e, isEdit = false) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(files.map(toBase64));
    if (isEdit)
      setEditForm({
        ...editForm,
        images: [...(editForm.images || []), ...base64Images],
      });
    else setForm({ ...form, images: [...form.images, ...base64Images] });
  };

  const removeImage = (index, isEdit = false, isThumbnail = false) => {
    if (isThumbnail) {
      if (isEdit) setEditForm({ ...editForm, thumbnailImage: "" });
      else setForm({ ...form, thumbnailImage: "" });
      return;
    }
    if (isEdit) {
      const newImages = [...editForm.images];
      newImages.splice(index, 1);
      setEditForm({ ...editForm, images: newImages });
    } else {
      const newImages = [...form.images];
      newImages.splice(index, 1);
      setForm({ ...form, images: newImages });
    }
  };

  return (
    <div className=" w-full  min-h-screen bg-main">
      <AdminNavigation />
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        {/* CREATE PRODUCT */}
        <div className="border rounded-2xl p-6 space-y-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold">Create Product</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Title"
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              placeholder="Price"
              className="input"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              placeholder="Discount Price"
              className="input"
              value={form.discountPrice}
              onChange={(e) =>
                setForm({ ...form, discountPrice: e.target.value })
              }
            />
            <input
              placeholder="In Stock"
              className="input"
              value={form.inStock}
              onChange={(e) => setForm({ ...form, inStock: e.target.value })}
            />
          </div>

          <textarea
            placeholder="Description"
            className="input"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="select bg-zinc-200"
            value={form.category || ""}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="" disabled={true} className="bg-zinc-200">
              Pick a category
            </option>
            {categories?.map((category) => (
              <option key={category._id} value={category.link} className="bg-zinc-200">
                {category.name}
              </option>
            ))}
          </select>

          {/* Thumbnail Preview */}
          <div className="space-y-2">
            <label className="font-medium">Thumbnail</label>
            {form.thumbnailImage ? (
              <div className="relative w-40">
                <img
                  src={form.thumbnailImage}
                  className="w-40 h-40 object-cover rounded"
                />
                <X
                  className="absolute top-0 right-0 cursor-pointer bg-gray-200 rounded-full"
                  onClick={() => removeImage(null, false, true)}
                />
              </div>
            ) : null}
            <input type="file" onChange={handleThumbnail} />
          </div>

          {/* Multiple Images Preview */}
          <div className="space-y-2">
            <label className="font-medium">Images</label>
            <div className="flex gap-2 flex-wrap">
              {form.images.map((img, idx) => (
                <div key={idx} className="relative w-32 h-32">
                  <img src={img} className="w-32 h-32 object-cover rounded" />
                  <X
                    className="absolute top-0 right-0 cursor-pointer bg-gray-200 rounded-full"
                    onClick={() => removeImage(idx)}
                  />
                </div>
              ))}
            </div>
            <input type="file" multiple onChange={handleImages} />
          </div>

          <button
            onClick={() => createProduct(form)}
            className="bg-black text-white px-6 py-2 rounded-xl"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="input w-full md:w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchProducts(searchQuery);
            }}
          />
          <button
            onClick={() => searchProducts(searchQuery)}
            className="ml-2 px-4 py-2 bg-black text-white rounded-lg"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>

        {/* PRODUCT LIST */}
        <div className="space-y-4">
          {products.map((product) => {
            const isEditing = editingId === product._id;
            return (
              <div
                key={product._id}
                className="border rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white shadow-sm"
              >
                <div className="flex gap-4 items-start md:items-center flex-1">
                  {/* Thumbnail Preview */}
                  <div className="relative w-24 h-24">
                    <img
                      src={
                        isEditing
                          ? editForm.thumbnailImage || product.thumbnailImage
                          : product.thumbnailImage
                      }
                      className="w-24 h-24 object-cover rounded"
                    />
                    {isEditing && (
                      <X
                        className="absolute top-0 right-0 cursor-pointer bg-gray-200 rounded-full"
                        onClick={() => removeImage(null, true, true)}
                      />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    {isEditing ? (
                      <>
                        <input
                          className="input"
                          defaultValue={product.title}
                          onChange={(e) =>
                            setEditForm({ ...editForm, title: e.target.value })
                          }
                        />
                        <input
                          className="input"
                          defaultValue={product.price}
                          onChange={(e) =>
                            setEditForm({ ...editForm, price: e.target.value })
                          }
                        />
                        <input
                          className="input"
                          defaultValue={product.discountPrice}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              discountPrice: e.target.value,
                            })
                          }
                        />
                        <input
                          className="input"
                          defaultValue={product.inStock}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              inStock: e.target.value,
                            })
                          }
                        />
                        <textarea
                          className="input w-full"
                          defaultValue={product.description}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                        />

                        <select
                          className="select"
                          value={editForm.category || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="" disabled={true}>
                            Pick a category
                          </option>
                          {categories?.map((category) => (
                            <option key={category._id} value={category.link}>
                              {category.name}
                            </option>
                          ))}
                        </select>

                        {/* Images Preview Grid */}
                        <div className="flex gap-2 flex-wrap">
                          {(editForm.images || product.images).map(
                            (img, idx) => (
                              <div key={idx} className="relative w-32 h-32">
                                <img
                                  src={img}
                                  className="w-32 h-32 object-cover rounded"
                                />
                                <X
                                  className="absolute top-0 right-0 cursor-pointer bg-gray-200 rounded-full"
                                  onClick={() => removeImage(idx, true)}
                                />
                              </div>
                            ),
                          )}
                        </div>

                        <div>
                          <p className=" py-2 text-lg font-medium">
                            Select multiple image
                          </p>
                          <input
                            type="file"
                            multiple
                            onChange={(e) => handleImages(e, true)}
                          />
                        </div>

                        <div>
                          <p className=" py-2 text-lg font-medium">
                            Select thumbnail image
                          </p>
                          <input
                            type="file"
                            onChange={(e) => handleThumbnail(e, true)}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-gray-500">
                          Price: ৳ {product.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Discount: ৳ {product.discountPrice} | Stock:{" "}
                          {product.inStock} | Rating: {product.rating} |
                          Reviews: {product.totalReviews}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-2 md:mt-0">
                  {isEditing ? (
                    <button
                      onClick={() => updateProduct(product._id, editForm)}
                      className="p-2 bg-black text-white rounded-lg"
                    >
                      <Save size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditing(product._id);
                        setEditForm(product);
                      }}
                      className="p-2 hover:bg-zinc-100 rounded-lg"
                    >
                      <Pencil size={18} />
                    </button>
                  )}

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="p-2 hover:bg-red-100 text-red-500 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <style jsx>{`
          .input {
            width: 100%;
            border: 1px solid #e5e5e5;
            padding: 10px;
            border-radius: 12px;
            font-size: 14px;
          }
        `}</style>
      </div>
    </div>
  );
}
