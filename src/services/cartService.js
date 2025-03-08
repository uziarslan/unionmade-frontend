const addToCart = (product, qty, size, customSizes) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const isCustomSize = size?.toLowerCase() === "custom";
  cart.push({
    product,
    qty,
    size,
    customSizes: isCustomSize ? customSizes : null,
  });
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCart = async () => {
  return (await JSON.parse(localStorage.getItem("cart"))) || [];
};

const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter(({ product }) => product._id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

const updateCartQty = (productId, increment) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.map((item) =>
    item.product._id === productId
      ? {
          ...item,
          qty: Math.max(1, item.qty + increment),
        }
      : item
  );
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

const emptyCart = () => {
  localStorage.removeItem("cart");
};

const cartService = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQty,
  emptyCart,
};

export default cartService;
