"use client";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useReviewStore } from "@/app/store/useReviewStore";
import { useState } from "react";
import toast from "react-hot-toast";

const ReviewForm = ({ productId }) => {
  const { submitReview, isSubmitting } = useReviewStore();
  const { authUser } = useAuthStore();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const name = authUser && authUser.name;
  const _id = authUser && authUser._id;

  const validateForm = () => {
    if (!comment.trim()) {
      return toast.error("Please enter a review comment.");
    }
    if (rating < 1 || rating > 5) {
      return toast.error("Please select a rating between 1 and 5.");
    }
    if (!name) {
      return toast.error("You must be logged in to submit a review.");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitReview(productId, { name, comment, rating, _id });
    }

    setComment("");
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your Review"
        className="border p-2 rounded"
      />
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => setRating(num)}
            className={
              num <= rating
                ? "text-yellow-500 cursor-pointer text-xl "
                : "text-gray-300 cursor-pointer text-xl "
            }
          >
            ★
          </span>
        ))}
      </div>
      <button className="bg-green-500 text-white py-2 rounded">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
