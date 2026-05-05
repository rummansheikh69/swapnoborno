"use client";

import { useEffect } from "react";
import { useOfficerStore } from "../store/useOfficerStore";

export default function OfficersPage() {
  const { officers, fetchOfficers, isLoading } = useOfficerStore();

  // Fetch officers on mount
  useEffect(() => {
    fetchOfficers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-3 md:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Meet Our Officers
        </h1>

        {/* Officers grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-gray-400">
            Loading officers...
          </div>
        ) : officers.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-400">
            No officers found
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {officers.map((officer) => (
              <div
                key={officer._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full h-48">
                  <img
                    src={officer.image}
                    alt={officer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {officer.name}
                  </h3>
                  <p className="text-gray-700 mb-2">Rank: {officer.rank}</p>
                  <p className="text-gray-700">
                    WhatsApp: {officer.whatsappNumber}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
