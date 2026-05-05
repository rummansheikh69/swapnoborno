"use client";

import { useEffect, useState } from "react";
import { useProviderStore } from "../store/useProviderStore";
import { redirectToWhatsApp } from "../lib/whatsappRedirect";

export default function ProvidersPage() {
  const { providers, fetchProviders, isLoading } = useProviderStore();

  const [openProvider, setOpenProvider] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-20 h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Select Your Provider
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Choose a provider to view minutes, internet, and bundle packages.
        </p>

        <div className="space-y-4">
          {providers.map((provider) => (
            <div
              key={provider._id}
              className="bg-white border border-zinc-300 rounded-lg shadow-sm overflow-hidden"
            >
              {/* Provider Header */}
              <button
                onClick={() =>
                  setOpenProvider(
                    openProvider === provider?._id ? null : provider?._id,
                  )
                }
                className="w-full flex justify-between items-center py-4 p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-md overflow-hidden">
                    <img
                      src={provider?.image}
                      alt={provider?.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{provider?.name}</h2>
                    <p className="text-sm text-gray-500">
                      {provider?.categories?.length} Plan Available
                    </p>
                  </div>
                </div>

                <span className="text-xl">
                  {openProvider === provider?._id ? "−" : "+"}
                </span>
              </button>

              {/* Provider Content */}
              {openProvider === provider?._id && (
                <div className="border-t border-zinc-300">
                  {provider?.categories?.length === 0 ? (
                    <p className="p-5 text-gray-400">No offers available.</p>
                  ) : (
                    provider?.categories.map((category) => {
                      const uniqueCategoryId = provider?._id + category?._id;

                      return (
                        <div
                          key={category._id}
                          className="border-b border-zinc-300 last:border-none"
                        >
                          {/* Category Header */}
                          <button
                            onClick={() =>
                              setOpenCategory(
                                openCategory === uniqueCategoryId
                                  ? null
                                  : uniqueCategoryId,
                              )
                            }
                            className="w-full flex justify-between items-center p-4 bg-gray-50"
                          >
                            <span className="font-medium pl-5">
                              {category.title}
                            </span>
                            <span>
                              {openCategory === uniqueCategoryId ? "−" : "+"}
                            </span>
                          </button>

                          {/* Offers */}
                          {openCategory === uniqueCategoryId && (
                            <div className="bg-white">
                              {category.offers.map((offer) => (
                                <div
                                  key={offer._id}
                                  className="flex justify-between items-center pl-16 p-4 border-t border-zinc-300"
                                >
                                  <div>
                                    <p className="font-medium">{offer.title}</p>
                                    <p className="text-sm text-gray-500">
                                      Validity: {offer.validity}
                                    </p>
                                  </div>

                                  <div className="text-right">
                                    <p className="font-semibold">
                                      {offer.price} TK
                                    </p>
                                    <button
                                      onClick={() =>
                                        redirectToWhatsApp({
                                          providerName: provider.name,
                                          categoryTitle: category.title,
                                          offerTitle: offer.title,
                                          validity: offer.validity,
                                          price: offer.price,
                                        })
                                      }
                                      className="text-green-600 text-sm hover:underline"
                                    >
                                      Buy Now
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
