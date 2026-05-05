// app/products/[id]/page.jsx
import ImageGallery from "@/app/components/products/ImageGallery";
import ReviewForm from "@/app/components/products/ReviewForm";
import { BuyButton, redirectToWhatsApp } from "@/app/lib/BuyButton";
import { Shield } from "lucide-react";
import Link from "next/link";

// Server-side fetch for product and reviews
export default async function ProductPage({ params }) {
  // If params is a Promise (Next.js 13 app router sometimes does this)
  const resolvedParams = await params;
  const productId = resolvedParams?.id;

  if (!productId) {
    return <p className="text-center mt-10">Invalid Product ID</p>;
  }

  // Now fetch product
  const productRes = await fetch(
    `https://api.swapnoborno.com/api/utils/product/${productId}`,
  );
  const product = await productRes.json();

  // Fetch reviews
  const reviewsRes = await fetch(
    `https://api.swapnoborno.com/api/utils/reviews/${productId}`,
  );
  const reviews = await reviewsRes.json();

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="bg-main text-gray-900">
      {/* ================= PRODUCT SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 md:px-0 py-16 grid md:grid-cols-2 gap-12">
        {/* LEFT SIDE: Image Gallery */}
        <ImageGallery images={product?.images} />

        {/* RIGHT SIDE: Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight font-bangla-regular">
            {product?.title}
          </h1>

          <p className="text-gray-600 mb-6 font-bangla-regular text-lg">
            {product?.description}
          </p>

          <div className="border border-border rounded-xl p-6  bg-subMain">
            <div className="flex justify-between text-sm text-gray-500">
              <span className="line-through">
                <span className="font-bangla-regular">৳</span>
                {product?.price?.toFixed(2)}
              </span>
              <span className="text-yellow-500">
                {"★".repeat(Math.round(averageRating))}
                <span className="text-gray-500 ml-2">
                  ({reviews?.length || 0} reviews)
                </span>
              </span>
            </div>

            <div className="text-4xl font-black my-4">
              <span className="font-bangla-regular">৳</span>
              {product?.discountPrice?.toFixed(2)}{" "}
              <span className="text-sm font-semibold text-gray-500">BDT</span>
            </div>

            <BuyButton
              productName={product?.title}
              imageUrl={product?.thumbnailImage}
              price={product?.discountPrice}
            />

            <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-1">
              <Shield size={16} /> Secure checkout • 100% Money-back Guarantee
            </p>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS SECTION ================= */}
      <section className="border-t border-zinc-300 py-16 bg-main">
        <div className="max-w-6xl mx-auto px-6 md:px-0 grid md:grid-cols-[300px_1fr] gap-12">
          {/* LEFT SUMMARY */}
          <div className="bg-subMain p-6 rounded-xl shadow-sm h-max">
            <div className="text-center">
              <div className="text-5xl font-black">
                {averageRating.toFixed(1)}
              </div>
              <div className="text-yellow-500 text-lg">
                {"★".repeat(Math.round(averageRating))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Based on {reviews.length} reviews
              </p>
            </div>

            <ReviewForm productId={productId} />
          </div>

          {/* RIGHT REVIEWS */}
          <div className="flex flex-col gap-6">
            {reviews?.length > 0 ? (
              reviews?.map((r) => (
                <div key={r?._id} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between mb-2 text-sm text-gray-500">
                    <span className="font-semibold text-gray-800">
                      {r?.user?.name}
                    </span>
                    <span>{new Date(r?.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="text-yellow-500 text-sm mb-2">
                    {"★".repeat(r?.rating)}
                  </div>

                  <h3 className="font-bold mb-2">{r?.comment}</h3>
                  <p className="text-gray-600 text-sm">{r?.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No reviews yet</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
