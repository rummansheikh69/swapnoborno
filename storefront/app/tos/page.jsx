export default function page() {
  return (
    <div className="bg-main text-gray-800">
      <div className="max-w-6xl mx-auto px-6 lg:px-0 py-16">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs tracking-widest text-gray-400">
            LEGAL CLARITY
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold mt-3">
            Terms of Service
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl">
            Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 w-full">
            <div className="bg-white rounded-xl p-6 shadow-sm lg:sticky lg:top-24">
              <h4 className="font-semibold mb-6">Quick Links</h4>

              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#general"
                    className="text-gray-600 hover:text-black transition"
                  >
                    General Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#digital"
                    className="text-gray-600 hover:text-black transition"
                  >
                    অর্ডার কনফার্মেশন ও ডেলিভারি চার্জ
                  </a>
                </li>
                <li>
                  <a
                    href="#shipping"
                    className="text-gray-600 hover:text-black transition"
                  >
                    পণ্যের গুণগত মান
                  </a>
                </li>
                <li>
                  <a
                    href="#refund"
                    className="text-gray-600 hover:text-black transition"
                  >
                    রিটার্ন ও এক্সচেঞ্জ পলিসি
                  </a>
                </li>
                <li>
                  <a
                    href="#usage"
                    className="text-gray-600 hover:text-black transition"
                  >
                    রিফান্ড
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="text-gray-600 hover:text-black transition"
                  >
                    ডেলিভারি{" "}
                  </a>
                </li>
              </ul>

              <div className="mt-10 text-sm">
                <p className="text-gray-500 mb-2">Need more help?</p>
                <a href="#" className="font-medium hover:underline">
                  Contact Support →
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Section 1 */}
            <section id="general" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gray-200 text-xs px-3 py-1 rounded-full">
                  01
                </span>
                <h2 className="text-xl md:text-2xl font-semibold">
                  General Conditions
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                ​স্বপ্নবর্ণ-এর সাথে থাকার জন্য আপনাকে ধন্যবাদ।
              </p>
              <p className="text-gray-600 leading-relaxed">
                আমাদের থেকে পণ্য অর্ডার করার আগে দয়া করে নিচের শর্তাবলীগুলো পড়ে
                নিন:
              </p>
            </section>

            {/* Section 2 */}
            <section id="digital" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gray-200 text-xs px-3 py-1 rounded-full">
                  02
                </span>
                <h2 className="text-xl md:text-2xl font-semibold">
                  অর্ডার কনফার্মেশন ও ডেলিভারি চার্জ
                </h2>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <p className="text-gray-600">
                  ​অর্ডার কনফার্ম করার জন্য শুধুমাত্র ডেলিভারি চার্জ অগ্রিম
                  প্রদান করতে হবে। শাড়ির সম্পূর্ণ মূল্য আপনি পণ্য হাতে পাওয়ার পর
                  (Cash on Delivery) পরিশোধ করবেন। ​ডেলিভারি চার্জ পরিশোধ না করা
                  পর্যন্ত অর্ডারটি চূড়ান্ত বলে গণ্য হবে না।
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="shipping" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gray-200 text-xs px-3 py-1 rounded-full">
                  03
                </span>
                <h2 className="text-xl md:text-2xl font-semibold">
                  পণ্যের গুণগত মান{" "}
                </h2>
              </div>

              <ul className="list-disc ml-6 text-gray-600 space-y-2">
                <p className="text-gray-600">
                  ​আমরা সরাসরি ফ্যাক্টরি থেকে নিজস্ব তত্ত্বাবধানে প্রতিটি শাড়ি
                  সংগ্রহ করি। প্রতিটি পণ্য ডেলিভারি করার আগে আমরা নিজ হাতে
                  পরীক্ষা করে দেখি যেন আপনি সম্পূর্ণ নিখুঁত এবং ফ্রেশ কালেকশন
                  পান।
                </p>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="refund" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gray-200 text-xs px-3 py-1 rounded-full">
                  04
                </span>
                <h2 className="text-xl md:text-2xl font-semibold">
                  রিটার্ন ও এক্সচেঞ্জ পলিসি
                </h2>
              </div>

              <div className="">
                <p className="text-gray-600">
                  ​পণ্য হাতে পাওয়ার পর ডেলিভারি ম্যানের সামনেই শাড়িটি চেক করে
                  নিন। ​যদি শাড়িতে কোনো প্রকার ত্রুটি (Defect) থাকে বা ভুল পণ্য
                  পেয়ে থাকেন, তবে সাথে সাথেই ডেলিভারি ম্যানের কাছে সেটি ফেরত
                  দিন। ​ডেলিভারি ম্যান চলে আসার পর কোনো রিটার্ন বা অভিযোগ গ্রহণ
                  করা হবে না। তাই অবশ্যই চেক করে পণ্য গ্রহণ করবেন।
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="usage" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gray-200 text-xs px-3 py-1 rounded-full">
                  05
                </span>
                <h2 className="text-xl md:text-2xl font-semibold">রিফান্ড</h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                যদি ত্রুটির কারণে পণ্য ফেরত দেন, তাহলে ফ্রিতে আবার সেম শাড়ি
                ডেলিভারি দিব। তবে অপছন্দ হলে আপনার দেয়া অগ্রিম ডেলিভারি চার্জ
                খরচ হিসাবে গন্য করা হবে।{" "}
              </p>
            </section>

            {/* Section 6 */}
            <section id="privacy" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gray-200 text-xs px-3 py-1 rounded-full">
                  06
                </span>
                <h2 className="text-xl md:text-2xl font-semibold">ডেলিভারি </h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                ডেলিভারি সময় ​সাধারণত অর্ডারের পর সারাদেশের যেকোনো প্রান্তে ৩
                থেকে ৫ কার্যদিবসের মধ্যে আমরা ডেলিভারি নিশ্চিত করি। তবে বিশেষ
                পরিস্থিতি বা এলাকার দূরত্বের ওপর ভিত্তি করে সময় কিছুটা কম-বেশি
                হতে পারে।{" "}
              </p>
            </section>

            <div className="border-t pt-8 text-sm text-gray-500">
              By continuing to use this website, you agree to these Terms.
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
