import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import cartService from "../services/cartService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const loggedInUser = await authService.getUser();
      setUser(loggedInUser);
      setIsLoading(false);
      const protectedRoutes = ["/dashboard", "/cart"];
      if (!loggedInUser && protectedRoutes.includes(window.location.pathname)) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const getCart = async () => {
      const cartItems = await cartService.getCart();

      if (!Array.isArray(cartItems)) {
        console.error("Cart items are not an array", cartItems);
        return;
      }

      let filteredCart = [];
      if (user && cartItems.length > 0) {
        filteredCart = cartItems.filter(
          (item) => item.product.organization === user?.organization
        );
      }

      cartItems.forEach((item) => {
        if (user && item?.product.organization !== user.organization) {
          removeFromCart(item.product._id);
        }
      });

      setCart(filteredCart);
    };

    getCart();
  }, [user]);

  const addToCart = (product, qty, size, customSizes) => {
    const isCustomSize = size?.toLowerCase() === "custom";
    cartService.addToCart(
      product,
      qty,
      size,
      isCustomSize ? customSizes : null
    );
    setCart([
      ...cart,
      { product, qty, size, customSizes: isCustomSize ? customSizes : null },
    ]);
  };

  const removeFromCart = (productId) => {
    cartService.removeFromCart(productId);
    setCart((prevCart) =>
      prevCart.filter(({ product }) => product._id !== productId)
    );
  };

  const updateQty = (productId, increment) => {
    cartService.updateCartQty(productId, increment);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId
          ? { ...item, qty: Math.max(1, item.qty + increment) }
          : item
      )
    );
  };

  const emptyCart = () => {
    cartService.emptyCart();
    setCart([]);
  };

  const login = async (userData) => {
    setIsLoading(true);
    const response = await authService.login(userData);
    const loggedInUser = await authService.getUser();
    setUser(loggedInUser);
    setIsLoading(false);
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    const registeredUser = await authService.getUser();
    setUser(registeredUser);
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        addToCart,
        cart,
        removeFromCart,
        updateQty,
        emptyCart,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
