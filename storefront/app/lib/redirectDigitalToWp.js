export const redirectDigitalToWp = ({ productName, productPrice }) => {
  const phoneNumber = "8801865301211";

  const message = `
*📦 New Order Request For Digital Product*

*Product Name:* ${productName}
*Price:* ${productPrice}

Please confirm this order.
`;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(url, "_blank");
};
