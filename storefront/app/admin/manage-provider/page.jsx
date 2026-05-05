"use client";
import { useEffect, useState, useRef } from "react";

import {
  Edit2,
  Trash2,
  ChevronDown,
  ChevronRight,
  Save,
  ImageIcon,
} from "lucide-react";
import { useProviderStore } from "@/app/store/useProviderStore";
import AdminNavigation from "@/app/components/admin/AdminNavigation";
import AdminProviderDashboard from "@/app/components/admin/AdminProvider";
import AuthGuard from "@/app/components/utils/AuthGuard";

export default function AdminProviders() {
  const {
    providers,
    fetchProviders,
    updateProvider,
    deleteProvider,
    updateCategory,
    deleteCategory,
    updateOffer,
    deleteOffer,
    addOffer,
  } = useProviderStore();

  const [openProvider, setOpenProvider] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [editing, setEditing] = useState({});
  const [newImage, setNewImage] = useState(null);
  const imgRef = useRef(null);
  const [addingOffer, setAddingOffer] = useState({});

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleImageChange = (e, providerId) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setNewImage(reader.result);
      setEditing((prev) => ({
        ...prev,
        [`provider-${providerId}`]: {
          ...prev[`provider-${providerId}`],
          image: reader.result,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <AuthGuard requireAdmin>
      <div className=" w-full min-h-screen bg-main">
        <AdminNavigation />
        <AdminProviderDashboard />
        <div className="max-w-5xl mx-auto p-6 lg:px-0 mt-20 space-y-4">
          {providers?.map((provider) => {
            const isProviderOpen = openProvider === provider._id;

            return (
              <div
                key={provider._id}
                className="border border-zinc-300 rounded-lg bg-white"
              >
                {/* Provider Header */}
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() =>
                    setOpenProvider(isProviderOpen ? null : provider._id)
                  }
                >
                  <div className="flex items-center gap-3">
                    {isProviderOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                    <img
                      src={provider.image}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="font-medium">{provider.name}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Edit2
                      size={16}
                      className="text-gray-500 hover:text-black"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditing((prev) => ({
                          ...prev,
                          [`provider-${provider._id}`]: {
                            name: provider.name,
                            image: provider.image,
                          },
                        }));
                      }}
                    />
                    <Trash2
                      size={16}
                      className="text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProvider(provider._id);
                      }}
                    />
                  </div>
                </div>

                {/* Provider Body */}
                {isProviderOpen && (
                  <div className="px-6 pb-4 space-y-4 border-t border-zinc-300">
                    {/* Provider Edit */}
                    {editing[`provider-${provider._id}`] && (
                      <div className="space-y-2">
                        <input
                          className="border border-t-0 border-zinc-300 px-3 py-2 rounded-b w-full"
                          value={editing[`provider-${provider._id}`].name}
                          onChange={(e) =>
                            setEditing((prev) => ({
                              ...prev,
                              [`provider-${provider._id}`]: {
                                ...prev[`provider-${provider._id}`],
                                name: e.target.value,
                              },
                            }))
                          }
                        />

                        <div className="flex items-center gap-3">
                          <button
                            className="flex items-center gap-2 text-sm border border-zinc-300 px-3 py-2 rounded"
                            onClick={() => imgRef.current.click()}
                          >
                            <ImageIcon size={14} /> Change Image
                          </button>
                          <input
                            type="file"
                            hidden
                            ref={imgRef}
                            onChange={(e) => handleImageChange(e, provider._id)}
                          />

                          <button
                            className="flex items-center gap-2 text-green-600 text-sm"
                            onClick={() => {
                              updateProvider(
                                provider._id,
                                editing[`provider-${provider._id}`],
                              );
                              setEditing((prev) => ({
                                ...prev,
                                [`provider-${provider._id}`]: null,
                              }));
                            }}
                          >
                            <Save size={14} /> Update
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Categories */}
                    {provider.categories.map((category) => {
                      const isCategoryOpen = openCategory === category._id;

                      return (
                        <div
                          key={category._id}
                          className="border border-t-0 border-zinc-300 rounded-b"
                        >
                          {/* Category Header */}
                          <div
                            className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-100 rounded-b"
                            onClick={() =>
                              setOpenCategory(
                                isCategoryOpen ? null : category._id,
                              )
                            }
                          >
                            <div className="flex items-center gap-2">
                              {isCategoryOpen ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                              <span className="text-sm font-medium">
                                {category.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Edit2
                                size={14}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditing((prev) => ({
                                    ...prev,
                                    [`category-${category._id}`]:
                                      category.title,
                                  }));
                                }}
                              />
                              <Trash2
                                size={14}
                                className="text-red-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteCategory(provider._id, category._id);
                                }}
                              />
                            </div>
                          </div>

                          {/* Category Body */}
                          {isCategoryOpen && (
                            <div className="px-6 py-3 space-y-3">
                              {editing[`category-${category._id}`] && (
                                <div className="flex gap-2">
                                  <input
                                    className="border border-zinc-300 px-2 py-1 rounded w-full text-sm"
                                    value={editing[`category-${category._id}`]}
                                    onChange={(e) =>
                                      setEditing((prev) => ({
                                        ...prev,
                                        [`category-${category._id}`]:
                                          e.target.value,
                                      }))
                                    }
                                  />
                                  <button
                                    className="text-green-600 text-sm flex items-center gap-1"
                                    onClick={() => {
                                      updateCategory(
                                        provider._id,
                                        category._id,
                                        {
                                          title:
                                            editing[`category-${category._id}`],
                                        },
                                      );
                                      setEditing((prev) => ({
                                        ...prev,
                                        [`category-${category._id}`]: null,
                                      }));
                                    }}
                                  >
                                    <Save size={14} /> Update
                                  </button>
                                </div>
                              )}

                              {/* Offers */}
                              {category.offers.map((offer) => {
                                const isEditingOffer =
                                  editing[`offer-${offer._id}`];

                                return (
                                  <div
                                    key={offer._id}
                                    className="flex justify-between items-start text-sm border-b border-zinc-300 py-3"
                                  >
                                    {!isEditingOffer ? (
                                      <>
                                        <div>
                                          <div className="font-medium">
                                            {offer.title}
                                          </div>
                                          <div className="text-gray-500 text-xs">
                                            {offer.validity} • {offer.price} TK
                                          </div>
                                        </div>

                                        <div className="flex gap-2">
                                          <Edit2
                                            size={14}
                                            className="cursor-pointer"
                                            onClick={() =>
                                              setEditing((prev) => ({
                                                ...prev,
                                                [`offer-${offer._id}`]: {
                                                  title: offer.title,
                                                  validity: offer.validity,
                                                  price: offer.price,
                                                },
                                              }))
                                            }
                                          />
                                          <Trash2
                                            size={14}
                                            className="text-red-500 cursor-pointer"
                                            onClick={() =>
                                              deleteOffer(
                                                provider._id,
                                                category._id,
                                                offer._id,
                                              )
                                            }
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <div className="w-full space-y-2">
                                        <div className="grid grid-cols-3 gap-2">
                                          <input
                                            className="border px-2 py-1 rounded text-sm"
                                            value={isEditingOffer.title}
                                            onChange={(e) =>
                                              setEditing((prev) => ({
                                                ...prev,
                                                [`offer-${offer._id}`]: {
                                                  ...isEditingOffer,
                                                  title: e.target.value,
                                                },
                                              }))
                                            }
                                          />
                                          <input
                                            className="border px-2 py-1 rounded text-sm"
                                            value={isEditingOffer.validity}
                                            onChange={(e) =>
                                              setEditing((prev) => ({
                                                ...prev,
                                                [`offer-${offer._id}`]: {
                                                  ...isEditingOffer,
                                                  validity: e.target.value,
                                                },
                                              }))
                                            }
                                          />
                                          <input
                                            type="number"
                                            className="border px-2 py-1 rounded text-sm"
                                            value={isEditingOffer.price}
                                            onChange={(e) =>
                                              setEditing((prev) => ({
                                                ...prev,
                                                [`offer-${offer._id}`]: {
                                                  ...isEditingOffer,
                                                  price: e.target.value,
                                                },
                                              }))
                                            }
                                          />
                                        </div>

                                        <div className="flex gap-3">
                                          <button
                                            className="text-green-600 text-sm flex items-center gap-1"
                                            onClick={() => {
                                              updateOffer(
                                                provider._id,
                                                category._id,
                                                offer._id,
                                                {
                                                  title: isEditingOffer.title,
                                                  validity:
                                                    isEditingOffer.validity,
                                                  price: Number(
                                                    isEditingOffer.price,
                                                  ),
                                                },
                                              );

                                              setEditing((prev) => ({
                                                ...prev,
                                                [`offer-${offer._id}`]: null,
                                              }));
                                            }}
                                          >
                                            <Save size={14} /> Save
                                          </button>

                                          <button
                                            className="text-gray-500 text-sm"
                                            onClick={() =>
                                              setEditing((prev) => ({
                                                ...prev,
                                                [`offer-${offer._id}`]: null,
                                              }))
                                            }
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}

                              {/* //offer adding form  */}
                              {Array.isArray(addingOffer[category._id]) &&
                                addingOffer[category._id].map((form, index) => (
                                  <div key={index} className="mt-3 space-y-2">
                                    <div className="grid grid-cols-3 gap-2">
                                      <input
                                        className="border px-2 py-1 rounded text-sm"
                                        placeholder="Title"
                                        value={form.title}
                                        onChange={(e) => {
                                          const updated = [
                                            ...addingOffer[category._id],
                                          ];
                                          updated[index].title = e.target.value;

                                          setAddingOffer((prev) => ({
                                            ...prev,
                                            [category._id]: updated,
                                          }));
                                        }}
                                      />

                                      <input
                                        className="border px-2 py-1 rounded text-sm"
                                        placeholder="Validity"
                                        value={form.validity}
                                        onChange={(e) => {
                                          const updated = [
                                            ...addingOffer[category._id],
                                          ];
                                          updated[index].validity =
                                            e.target.value;

                                          setAddingOffer((prev) => ({
                                            ...prev,
                                            [category._id]: updated,
                                          }));
                                        }}
                                      />

                                      <input
                                        type="number"
                                        className="border px-2 py-1 rounded text-sm"
                                        placeholder="Price"
                                        value={form.price}
                                        onChange={(e) => {
                                          const updated = [
                                            ...addingOffer[category._id],
                                          ];
                                          updated[index].price = e.target.value;

                                          setAddingOffer((prev) => ({
                                            ...prev,
                                            [category._id]: updated,
                                          }));
                                        }}
                                      />
                                    </div>

                                    <div className="flex gap-3">
                                      {/* Save Button */}
                                      <button
                                        className="text-green-600 text-sm"
                                        onClick={() => {
                                          addOffer(provider._id, category._id, {
                                            title: form.title,
                                            validity: form.validity,
                                            price: Number(form.price),
                                          });

                                          const updated = [
                                            ...addingOffer[category._id],
                                          ];
                                          updated.splice(index, 1);

                                          setAddingOffer((prev) => ({
                                            ...prev,
                                            [category._id]: updated,
                                          }));
                                        }}
                                      >
                                        Save
                                      </button>

                                      {/* Cancel Button */}
                                      <button
                                        className="text-gray-500 text-sm"
                                        onClick={() => {
                                          const updated = [
                                            ...addingOffer[category._id],
                                          ];
                                          updated.splice(index, 1);

                                          setAddingOffer((prev) => ({
                                            ...prev,
                                            [category._id]: updated,
                                          }));
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              {/* //offer adding form end */}

                              {/* Add New Offer Button
                              <button
                                className="text-blue-600 text-sm"
                                onClick={() =>
                                  setAddingOffer((prev) => ({
                                    ...prev,
                                    [`offer-${offer._id}`]: {
                                      title: "",
                                      validity: "",
                                      price: "",
                                    },
                                  }))
                                }
                              >
                                + Add New Offer
                              </button> */}

                              {/* Add Offer Button */}
                              <button
                                className="text-blue-600 text-sm mt-2"
                                onClick={() =>
                                  setAddingOffer((prev) => ({
                                    ...prev,
                                    [category._id]: [
                                      ...(Array.isArray(prev[category._id])
                                        ? prev[category._id]
                                        : []),
                                      { title: "", validity: "", price: "" },
                                    ],
                                  }))
                                }
                              >
                                + Add New Offer
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AuthGuard>
  );
}
