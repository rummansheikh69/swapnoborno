"use client";
import { useState, useRef } from "react";
import { useProviderStore } from "../../store/useProviderStore";

export default function AdminProviderDashboard() {
  const { createProviderFull, isLoading } = useProviderStore();
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([
    { title: "", offers: [{ title: "", validity: "", price: "" }] },
  ]);

  const imgRef = useRef(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // for formData
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result); // for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img) return alert("Image required");

    const payload = {
      name,
      image: img, // <-- Base64 string
      categories,
    };

    await createProviderFull(payload);

    // reset
    setName("");
    setImg(null);
    setCategories([
      { title: "", offers: [{ title: "", validity: "", price: "" }] },
    ]);
  };

  return (
    <div className=" w-full bg-main">
      <div className="max-w-5xl  mx-auto p-6 bg-subMain shadow-lg rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Create New Provider
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Provider Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-600">
              Provider Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter provider name"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-600">
              Provider Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImgChange}
              ref={imgRef}
              className="mb-2"
            />
            {img && (
              <img
                src={img}
                alt="Preview"
                className="w-40 h-40 object-contain border border-gray-200 rounded-md shadow-sm"
              />
            )}
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="border border-zinc-300 p-4 rounded-md bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    placeholder="Plan Name"
                    value={cat.title}
                    onChange={(e) => {
                      const newCats = [...categories];
                      newCats[i].title = e.target.value;
                      setCategories(newCats);
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newCats = categories.filter((_, idx) => idx !== i);
                      setCategories(newCats);
                    }}
                    className="ml-2 text-red-500 font-semibold"
                  >
                    Delete
                  </button>
                </div>

                {/* Offers inside category */}
                {cat.offers.map((offer, j) => (
                  <div key={j} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Offer Name"
                      value={offer.title}
                      onChange={(e) => {
                        const newCats = [...categories];
                        newCats[i].offers[j].title = e.target.value;
                        setCategories(newCats);
                      }}
                      className="border border-gray-300 rounded-md px-2 py-1 flex-1"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Validity"
                      value={offer.validity}
                      onChange={(e) => {
                        const newCats = [...categories];
                        newCats[i].offers[j].validity = e.target.value;
                        setCategories(newCats);
                      }}
                      className="border border-gray-300 rounded-md px-2 py-1 w-20 md:w-32"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={offer.price}
                      onChange={(e) => {
                        const newCats = [...categories];
                        newCats[i].offers[j].price = e.target.value;
                        setCategories(newCats);
                      }}
                      className="border border-gray-300 rounded-md px-2 py-1 w-24"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newCats = [...categories];
                        newCats[i].offers.splice(j, 1);
                        setCategories(newCats);
                      }}
                      className="text-red-500 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newCats = [...categories];
                    newCats[i].offers.push({
                      title: "",
                      validity: "",
                      price: "",
                    });
                    setCategories(newCats);
                  }}
                  className="text-blue-600 font-semibold mt-2"
                >
                  + Add Offer
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              setCategories([
                ...categories,
                { title: "", offers: [{ title: "", validity: "", price: "" }] },
              ])
            }
            className="text-green-600 font-semibold"
          >
            + Add Plan
          </button>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-md text-white font-bold ${
              isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Creating..." : "Create Provider"}
          </button>
        </form>
      </div>
    </div>
  );
}
