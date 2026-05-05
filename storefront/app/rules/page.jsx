"use client";

import { useEffect } from "react";
import { useRulesStore } from "../store/useRulesStore";
import { Loader } from "lucide-react";

export default function RulesPage() {
  const { rulesList, fetchRules, isLoading } = useRulesStore();

  useEffect(() => {
    fetchRules();
  }, []);

  if (isLoading) {
    return (
      <div className=" h-screen flex items-center justify-center">
        <Loader className=" animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Rules
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-gray-400">
            Loading rules...
          </div>
        ) : rulesList?.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-400">
            No rules found
          </div>
        ) : (
          <div className="space-y-8">
            {rulesList?.map((ruleItem) => (
              <div
                key={ruleItem._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 font-bangla-regular">
                  {ruleItem.title}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg font-bangla-regular">
                  {ruleItem.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
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
