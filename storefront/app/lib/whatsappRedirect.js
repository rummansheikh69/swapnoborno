export const redirectToWhatsApp = ({
  providerName,
  categoryTitle,
  offerTitle,
  validity,
  price,
}) => {
  const phoneNumber = "8801865301211";

  const message = `
*📦 New Order Request*

*Provider:* ${providerName}
*Plan:* ${categoryTitle}

*Offer:* ${offerTitle}
*Validity:* ${validity}
*Price:* ${price} TK

Please confirm this order.
`;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(url, "_blank");
};
