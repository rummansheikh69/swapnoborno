import Image from "next/image";

export default function page() {
  return (
    <section className="bg-[#f6f4f0] text-black py-16">
      <div className=" max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Our Story</h1>
          <span className="block w-16 h-[3px] bg-[#7b8b6d] mx-auto mt-3 rounded-full"></span>
        </div>

        {/* Philosophy + Craft */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Philosophy */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e9efe3] p-2 rounded-full text-lg">🌱</div>
              <h2 className="font-extrabold text-lg">The Philosophy</h2>
            </div>

            <p className="text-lg font-medium leading-7 text-gray-800 font-bangla-regular">
              ​আমি তারেক রহমান, প্রতিষ্ঠাতা—স্বপ্নবর্ণ। সিরাজগঞ্জের তাঁতশিল্প
              আমাদের অহংকার। ২০২০ সাল থেকে আমি সিরাজগঞ্জের সেই ঐতিহ্যবাহী তাঁত
              শাড়ি নিয়ে সরাসরি কাজ করছি। ​আমাদের গ্রামের দক্ষ কারিগরদের হাতে
              তৈরি সেরা মানের শাড়িগুলো সরাসরি ফ্যাক্টরি থেকে সংগ্রহ করে আমরা
              পৌঁছে দিচ্ছি আপনার দরজায়।
            </p>
          </div>

          {/* Craft */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e9efe3] p-2 rounded-full text-lg">📦</div>
              <h2 className="font-extrabold text-lg">The Craft</h2>
            </div>

            <p className="text-lg font-medium leading-7 text-gray-800 font-bangla-regular">
              আমাদের লক্ষ্য হলো মানসম্মত ও নির্ভরযোগ্য পণ্য সরবরাহ করা। আমরা
              চেষ্টা করি ভালো মানের পণ্য, সঠিক তথ্য এবং বিশ্বস্ত অনলাইন সেবার
              মাধ্যমে গ্রাহকদের সন্তুষ্টি নিশ্চিত করতে।
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mt-20 bg-white rounded-2xl shadow-md py-12 px-6 sm:px-10 text-center">
          <h2 className="text-2xl font-extrabold mb-12">Our Values</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div>
              <div className="w-14 h-14 mx-auto bg-[#edf2e7] rounded-full flex items-center justify-center text-xl text-[#6c7b60] mb-4">
                👁
              </div>
              <h3 className="font-extrabold text-sm mb-3">Transparency</h3>
              <p className="text-sm text-gray-600 leading-6">
                We believe in open processes. From how we build our presets to
                where we source our fabrics, we share the journey with you.
              </p>
            </div>

            {/* Value 2 */}
            <div>
              <div className="w-14 h-14 mx-auto bg-[#edf2e7] rounded-full flex items-center justify-center text-xl text-[#6c7b60] mb-4">
                💎
              </div>
              <h3 className="font-extrabold text-sm mb-3">Quality</h3>
              <p className="text-sm text-gray-600 leading-6">
                Good enough isn't in our vocabulary. We iterate relentlessly to
                ensure every pixel and every stitch meets our exacting
                standards.
              </p>
            </div>

            {/* Value 3 */}
            <div>
              <div className="w-14 h-14 mx-auto bg-[#edf2e7] rounded-full flex items-center justify-center text-xl text-[#6c7b60] mb-4">
                🚀
              </div>
              <h3 className="font-extrabold text-sm mb-3">Innovation</h3>
              <p className="text-sm text-gray-600 leading-6">
                We don’t follow trends; we look for better ways to solve
                problems. Our products evolve constantly based on real creator
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
