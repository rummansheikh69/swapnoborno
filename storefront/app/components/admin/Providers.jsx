"use client";
import { useEffect, useRef, useState } from "react";
import { useProviderStore } from "../store/useProviderStore";
import { CiImageOn } from "react-icons/ci"; // you can use lucide-react instead
import { IoCloseSharp } from "react-icons/io5";
import { Edit2, Trash2, Save } from "lucide-react";

export default function AdminProviders() {
  const imgRef = useRef(null);
  const [newImg, setNewImg] = useState(null);
  const [editing, setEditing] = useState({}); // track which field is editing
  const {
    providers,
    fetchProviders,
    updateProvider,
    deleteProvider,
    updateCategory,
    deleteCategory,
    updateOffer,
    deleteOffer,
  } = useProviderStore();

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 space-y-4">
      {providers.map((p) => (
        <div key={p._id} className="border rounded p-4 bg-white">
          {/* Provider Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded overflow-hidden">
                <img
                  src={newImg || p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {editing[`provider-name-${p._id}`] ? (
                <div className="flex gap-2 items-center">
                  <input
                    value={editing[`provider-name-${p._id}`]}
                    onChange={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        [`provider-name-${p._id}`]: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => {
                      updateProvider(p._id, {
                        name: editing[`provider-name-${p._id}`],
                        image: newImg,
                      });
                      setEditing((prev) => ({
                        ...prev,
                        [`provider-name-${p._id}`]: null,
                      }));
                      setNewImg(null);
                    }}
                    className="text-green-600 flex items-center gap-1"
                  >
                    <Save size={16} /> Update
                  </button>
                </div>
              ) : (
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {p.name}
                  <Edit2
                    size={16}
                    className="cursor-pointer text-zinc-600"
                    onClick={() =>
                      setEditing((prev) => ({
                        ...prev,
                        [`provider-name-${p._id}`]: p.name,
                      }))
                    }
                  />
                </h2>
              )}
            </div>

            <Trash2
              size={18}
              className="cursor-pointer text-red-600"
              onClick={() => deleteProvider(p._id)}
            />
          </div>

          {/* Change Provider Image */}
          <div className="mt-2 flex items-center gap-2">
            <div
              className="border p-2 rounded cursor-pointer"
              onClick={() => imgRef.current.click()}
            >
              Change Image
            </div>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={imgRef}
              onChange={handleImgChange}
            />
          </div>

          {/* Categories */}
          <div className="mt-4 space-y-2 pl-6">
            {p.categories.map((c) => (
              <div key={c._id} className="border-l pl-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  {editing[`category-${c._id}`] ? (
                    <div className="flex gap-2 items-center">
                      <input
                        value={editing[`category-${c._id}`]}
                        onChange={(e) =>
                          setEditing((prev) => ({
                            ...prev,
                            [`category-${c._id}`]: e.target.value,
                          }))
                        }
                        className="border px-2 py-1 rounded"
                      />
                      <button
                        onClick={() => {
                          updateCategory(p._id, c._id, {
                            title: editing[`category-${c._id}`],
                          });
                          setEditing((prev) => ({
                            ...prev,
                            [`category-${c._id}`]: null,
                          }));
                        }}
                        className="text-green-600 flex items-center gap-1"
                      >
                        <Save size={16} /> Update
                      </button>
                    </div>
                  ) : (
                    <h3 className="flex items-center gap-2 font-semibold text-lg">
                      {c.title}
                      <Edit2
                        size={14}
                        className="cursor-pointer text-zinc-600"
                        onClick={() =>
                          setEditing((prev) => ({
                            ...prev,
                            [`category-${c._id}`]: c.title,
                          }))
                        }
                      />
                    </h3>
                  )}
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-600"
                    onClick={() => deleteCategory(p._id, c._id)}
                  />
                </div>

                {/* Offers */}
                <div className="pl-4 space-y-1">
                  {c.offers.map((o) => (
                    <div
                      key={o._id}
                      className="flex justify-between items-center gap-2 border-l pl-2"
                    >
                      <div className="flex gap-2 items-center">
                        {editing[`offer-title-${o._id}`] ? (
                          <>
                            <input
                              value={editing[`offer-title-${o._id}`]}
                              onChange={(e) =>
                                setEditing((prev) => ({
                                  ...prev,
                                  [`offer-title-${o._id}`]: e.target.value,
                                }))
                              }
                              className="border px-2 py-1 rounded"
                            />
                            <input
                              value={
                                editing[`offer-validity-${o._id}`] ?? o.validity
                              }
                              onChange={(e) =>
                                setEditing((prev) => ({
                                  ...prev,
                                  [`offer-validity-${o._id}`]: e.target.value,
                                }))
                              }
                              className="border px-2 py-1 rounded"
                            />
                            <input
                              value={editing[`offer-price-${o._id}`] ?? o.price}
                              onChange={(e) =>
                                setEditing((prev) => ({
                                  ...prev,
                                  [`offer-price-${o._id}`]: e.target.value,
                                }))
                              }
                              className="border px-2 py-1 rounded w-20"
                            />
                            <button
                              onClick={() => {
                                updateOffer(p._id, c._id, o._id, {
                                  title: editing[`offer-title-${o._id}`],
                                  validity: editing[`offer-validity-${o._id}`],
                                  price: Number(
                                    editing[`offer-price-${o._id}`],
                                  ),
                                });
                                setEditing((prev) => ({
                                  ...prev,
                                  [`offer-title-${o._id}`]: null,
                                  [`offer-validity-${o._id}`]: null,
                                  [`offer-price-${o._id}`]: null,
                                }));
                              }}
                              className="text-green-600 flex items-center gap-1"
                            >
                              <Save size={16} /> Update
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="font-medium">{o.title}</span>
                            <span className="text-sm text-gray-500">
                              {o.validity}
                            </span>
                            <span className="font-semibold">{o.price} TK</span>
                            <Edit2
                              size={14}
                              className="cursor-pointer text-zinc-600"
                              onClick={() =>
                                setEditing((prev) => ({
                                  ...prev,
                                  [`offer-title-${o._id}`]: o.title,
                                  [`offer-validity-${o._id}`]: o.validity,
                                  [`offer-price-${o._id}`]: o.price,
                                }))
                              }
                            />
                          </>
                        )}
                      </div>

                      <Trash2
                        size={14}
                        className="cursor-pointer text-red-600"
                        onClick={() => deleteOffer(p._id, c._id, o._id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
