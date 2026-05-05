export default function page() {
  return (
    <div className="bg-main text-gray-800">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-semibold mt-3">
            Terms of Service
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We believe in transparency. Here is exactly what we do with your
            data, explained simply.
          </p>
        </div>

        {/* PRIVACY PROMISE */}
        <div className="bg-[#e8f0eb] rounded-2xl p-8 text-center mb-20 transition hover:-translate-y-1 duration-300">
          <h3 className="text-lg font-semibold mb-3">🛡 Our Privacy Promise</h3>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            We treat your data with the same respect we want for our own. We
            never sell your personal information. Your trust is our foundation.
          </p>
        </div>

        {/* SECTION 01 */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-8">
            <span className="text-5xl font-bold text-gray-200">01</span>
            <h2 className="text-xl md:text-2xl font-semibold">
              Information We Collect
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm transition hover:-translate-y-1 duration-300">
              <h4 className="text-xs tracking-widest text-gray-500 mb-3">
                LEGAL TALK
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We collect personal identifiers such as name, email address, and
                payment details when you complete a transaction.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm transition hover:-translate-y-1 duration-300">
              <h4 className="text-xs tracking-widest text-gray-500 mb-3">
                SIMPLE TALK
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We need your name and email to send receipts and downloads. We
                also check device info to improve our website.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 02 */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-8">
            <span className="text-5xl font-bold text-gray-200">02</span>
            <h2 className="text-xl md:text-2xl font-semibold">
              How We Use Your Data
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm transition hover:-translate-y-1 duration-300">
              <h4 className="text-xs tracking-widest text-gray-500 mb-3">
                LEGAL TALK
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Data is utilized for payment processing, order fulfillment, and
                service performance analytics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm transition hover:-translate-y-1 duration-300">
              <h4 className="text-xs tracking-widest text-gray-500 mb-3">
                SIMPLE TALK
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We use your info to process your payment and deliver products.
                That’s it.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 03 */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-8">
            <span className="text-5xl font-bold text-gray-200">03</span>
            <h2 className="text-xl md:text-2xl font-semibold">Your Rights</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm transition hover:-translate-y-1 duration-300">
              <h4 className="text-xs tracking-widest text-gray-500 mb-3">
                LEGAL TALK
              </h4>
              <p className="text-gray-600 leading-relaxed">
                You retain rights to access, rectify, or erase your personal
                data.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm transition hover:-translate-y-1 duration-300">
              <h4 className="text-xs tracking-widest text-gray-500 mb-3">
                SIMPLE TALK
              </h4>
              <p className="text-gray-600 leading-relaxed">
                It’s your data. If you want to see it, fix it, or delete it —
                just email us.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 04 */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-8">
            <span className="text-5xl font-bold text-gray-200">04</span>
            <h2 className="text-xl md:text-2xl font-semibold">
              Cookies & Tracking
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm transition hover:-translate-y-1 duration-300">
              <h4 className="text-xs tracking-widest text-gray-500 mb-3">
                LEGAL TALK
              </h4>
              <p className="text-gray-600 leading-relaxed">
                This website uses essential and analytical cookies for
                functionality and performance monitoring.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm transition hover:-translate-y-1 duration-300">
              <h4 className="text-xs tracking-widest text-gray-500 mb-3">
                SIMPLE TALK
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We use cookies to keep your cart working. You can disable them
                in browser settings.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center border-t border-zinc-300 pt-14">
          <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is happy to clarify your privacy concerns.
          </p>

          <button className="bg-[#7fa88c] hover:bg-[#6e977d] text-white px-6 py-3 rounded-xl transition duration-300">
            Contact Privacy Team
          </button>
        </div>
      </div>
    </div>
  );
}
