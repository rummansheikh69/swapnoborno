"use client";
import AdminNavigation from "@/app/components/admin/AdminNavigation";
import { useRulesStore } from "@/app/store/useRulesStore";

import { useEffect, useState } from "react";

export default function AdminRules() {
  const {
    rulesList,
    fetchRules,
    createRules,
    updateRules,
    deleteRules,
    isLoading,
    isSubmitting,
  } = useRulesStore();

  const [form, setForm] = useState({
    title: "",
    rules: [""],
  });
  const [editId, setEditId] = useState(null);

  // Fetch all rules on mount
  useEffect(() => {
    fetchRules();
  }, []);

  // ===== HANDLE FORM CHANGES =====
  const handleTitleChange = (e) => {
    setForm((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleRuleChange = (index, value) => {
    const updatedRules = [...form.rules];
    updatedRules[index] = value;
    setForm((prev) => ({ ...prev, rules: updatedRules }));
  };

  const addRuleField = () => {
    setForm((prev) => ({ ...prev, rules: [...prev.rules, ""] }));
  };

  const removeRuleField = (index) => {
    const updatedRules = [...form.rules];
    updatedRules.splice(index, 1);
    setForm((prev) => ({ ...prev, rules: updatedRules }));
  };

  // ===== SUBMIT FORM =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || form.rules.length === 0) return;

    if (editId) {
      await updateRules(editId, form);
      setEditId(null);
    } else {
      await createRules(form);
    }

    setForm({ title: "", rules: [""] });
  };

  // ===== EDIT RULES =====
  const handleEdit = (rule) => {
    setEditId(rule._id);
    setForm({ title: rule.title, rules: [...rule.rules] });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <AdminNavigation />

      {/* ================= CREATE / UPDATE FORM ================= */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Update Rules" : "Create Rules"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleTitleChange}
            placeholder="Rules Title"
            className="w-full border p-2 rounded"
          />

          {form.rules.map((rule, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={rule}
                onChange={(e) => handleRuleChange(index, e.target.value)}
                placeholder={`Rule #${index + 1}`}
                className="w-full border p-2 rounded"
              />
              {form.rules.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRuleField(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addRuleField}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            + Add Rule
          </button>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-4 py-2 rounded"
            >
              {isSubmitting
                ? "Processing..."
                : editId
                  ? "Update Rules"
                  : "Create Rules"}
            </button>
          </div>
        </form>
      </div>

      {/* ================= RULES LIST ================= */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">All Rules</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : rulesList.length === 0 ? (
          <p>No rules found</p>
        ) : (
          <div className="space-y-4">
            {rulesList.map((rule) => (
              <div
                key={rule._id}
                className="border p-4 rounded-lg space-y-2 flex flex-col"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{rule.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(rule)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteRules(rule._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <ul className="list-disc pl-5 space-y-1">
                  {rule.rules.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
