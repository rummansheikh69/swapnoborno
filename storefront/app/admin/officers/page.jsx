"use client";

import AdminNavigation from "@/app/components/admin/AdminNavigation";
import { useOfficerStore } from "@/app/store/useOfficerStore";
import { useEffect, useState } from "react";

export default function AdminOfficer() {
  const {
    officers,
    fetchOfficers,
    createOfficer,
    updateOfficer,
    deleteOfficer,
    isLoading,
    isSubmitting,
  } = useOfficerStore();

  const [form, setForm] = useState({
    name: "",
    image: "",
    rank: "",
    whatsappNumber: "",
  });

  const [editId, setEditId] = useState(null);

  // Fetch all officers
  useEffect(() => {
    fetchOfficers();
  }, []);

  // Handle text input
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle image (base64)
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Submit create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.image || !form.rank || !form.whatsappNumber) return;

    if (editId) {
      await updateOfficer(editId, form);
      setEditId(null);
    } else {
      await createOfficer(form);
    }

    setForm({ name: "", image: "", rank: "", whatsappNumber: "" });
  };

  // Edit click
  const handleEdit = (officer) => {
    setEditId(officer._id);
    setForm({
      name: officer.name,
      image: officer.image, // leave empty unless replacing
      rank: officer.rank,
      whatsappNumber: officer.whatsappNumber,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <AdminNavigation />

      {/* ================= CREATE / UPDATE FORM ================= */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Update Officer" : "Create Officer"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Officer Name"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="rank"
            value={form.rank}
            onChange={handleChange}
            placeholder="Rank"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="whatsappNumber"
            value={form.whatsappNumber}
            onChange={handleChange}
            placeholder="WhatsApp Number"
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
                ? "Update Officer"
                : "Create Officer"}
          </button>
        </form>
      </div>

      {/* ================= OFFICER LIST ================= */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">All Officers</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : officers.length === 0 ? (
          <p>No officers found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {officers.map((officer) => (
              <div
                key={officer._id}
                className="border rounded-lg p-4 space-y-3"
              >
                <img
                  src={officer.image}
                  alt={officer.name}
                  className="w-full h-32 object-cover rounded"
                />

                <h3 className="text-lg font-medium capitalize">
                  {officer.name}
                </h3>
                <p className="text-sm">Rank: {officer.rank}</p>
                <p className="text-sm">WhatsApp: {officer.whatsappNumber}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(officer)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteOfficer(officer._id)}
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
  );
}
