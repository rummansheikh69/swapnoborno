"use client";
export const BuyButton = ({ productName, imageUrl, price }) => {
  const redirectToWhatsApp = () => {
    const phoneNumber = "8801947144644";

    const message = `
*📦 New Order Request*

*Product:* ${productName}
*Image:* ${imageUrl}

*Price:* ${price} TK

Please confirm this order.
`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={redirectToWhatsApp}
      className="w-full bg-contrast hover:bg-contrast/95 duration-200 text-white py-3 rounded-lg font-semibold transition"
    >
      Buy Now →
    </button>
  );
};
