import { useReviewStore } from "@/app/store/useReviewStore";
import { useEffect } from "react";

const ProductReviews = ({ productId }) => {
  const { reviews, fetchReviews, isLoading } = useReviewStore();

  useEffect(() => {
    fetchReviews(productId);
  }, [productId]);

  return (
    <div>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="bg-white p-4 rounded shadow-sm mb-3">
            <p className="font-bold">{r.user.name}</p>
            <p>{"★".repeat(r.rating)}</p>
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductReviews;
