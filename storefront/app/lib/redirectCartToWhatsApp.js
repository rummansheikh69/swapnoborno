"use client";

export const redirectCartToWhatsApp = (cart) => {
  const phoneNumber = "8801865301211";

  if (!cart || cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0,
  );

  const totalDiscount = cart.reduce(
    (acc, item) => acc + (item.price - item.discountPrice) * item.quantity,
    0,
  );

  const itemsText = cart
    .map(
      (item, index) => `
*${index + 1}. ${item.title}*
Quantity: ${item.quantity}
Original Price: ${item.price} TK
Discount Price: ${item.discountPrice} TK
Item Total: ${item.discountPrice * item.quantity} TK
`,
    )
    .join("\n----------------------\n");

  const message = `
🛒 *NEW CART ORDER*

${itemsText}

----------------------
*Subtotal:* ${subtotal} TK
*Total Discount:* ${totalDiscount} TK
*Final Total:* ${subtotal} TK

Please confirm this order.
`;

  const encodedMessage = encodeURIComponent(message.trim());
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(url, "_blank");
};
