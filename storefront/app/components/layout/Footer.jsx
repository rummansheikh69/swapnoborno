"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaEnvelope,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  const links = [
    { label: "About us", href: "/about-us" },
    { label: "Contact us", href: "/contact-us" },
    { label: "Terms & Conditions", href: "/tos" },
    { label: "Privacy Policy", href: "/policy" },
  ];

  const socials = [
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/share/1Azc9F413d",
    },
    {
      icon: <FaYoutube />,
      href: "https://www.youtube.com/@swapnoborno-6378",
    },
    {
      icon: <FaWhatsapp />,
      href: "https://Wa.me/+8801317759954",
    },
  ];
  return (
    <footer className="bg-subMain">
      {/* ================= TOP CONTACT BAR ================= */}
      <div className="max-w-6xl mx-auto bg-subMain pt-8 px-3 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-border pb-10">
          {/* Call Us */}
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-gray-600 text-lg" />
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Call Us</h4>

              <p className="text-sm text-gray-600">+880 1317759954</p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-center gap-4">
            <FaClock className="text-gray-600 text-lg" />
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Working Hours
              </h4>
              <p className="text-sm text-gray-600">24/7</p>
            </div>
          </div>

          {/* Email Us */}
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-gray-600 text-lg" />
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Email Us</h4>
              <p className="text-sm text-gray-600">swapnoborno4@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className=" pt-10 pb-10 max-w-6xl mx-auto px-3 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Column 1 */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">​স্বপ্নবর্ণ</h2>

            <p className="text-gray-600 leading-relaxed mb-5">
              ​স্বপ্নবর্ণ শাড়ি প্রেমীদের প্রতারণা মুক্ত নির্ভরযোগ্য ঠিকানা
            </p>

            <div className="flex items-center gap-4">
              {/* {[ FaFacebookF, FaTelegram,FaWhatsapp].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-300 rounded-full cursor-pointer transition hover:bg-black hover:text-white"
                  >
                    <Icon size={16} />
                  </div>
                ),
              )} */}

              {socials.map((item, index) => (
                <a
                  href={item.href}
                  target="_blank"
                  key={index}
                  className="p-3 border border-gray-300 rounded-full cursor-pointer transition hover:bg-black hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-black transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to receive updates and exclusive
              offers.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />

            <button
              onClick={() => getElementById("cart-drawer").open()}
              className="w-full p-3 bg-slate-900 text-white rounded-lg transition hover:bg-slate-800"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-12 mb-3 border-t border-gray-300"></div>
        <div className=" w-full">
          <h2 className=" text-center text-zinc-400">
            &copy; {new Date().getFullYear()} Swapnoborno | All rights reserved
          </h2>
        </div>
      </div>
    </footer>
  );
}
