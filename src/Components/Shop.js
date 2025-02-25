import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axiosInstance from "../services/axiosInstance";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const itemsPerPage = 12;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { setIsLoading, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      let response;
      try {
        if (user && user.organization) {
          response = await axiosInstance.get("/api/v1/all-products-org");
        } else {
          response = await axiosInstance.get("/api/v1/all-products");
        }
        if (response.status === 200) setProducts(response.data);
      } catch ({ response }) {
        console.error(response.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [setIsLoading, user]);

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    sortProducts(selectedOption);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...products];

    switch (option) {
      case "popularity":
        sortedProducts.sort((a, b) => b.funded - a.funded);
        break;
      case "date":
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "price":
        sortedProducts.sort(
          (a, b) => parseInt(a.productPrice) - parseInt(b.productPrice)
        );
        break;
      case "price-desc":
        sortedProducts.sort(
          (a, b) => parseInt(b.productPrice) - parseInt(a.productPrice)
        );
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  return (
    <>
      <Navbar />
      <div className="shopHeadingContainer max-width mx-auto">
        <h1>Shop</h1>
        <hr />
        <div className="showingResults">
          <p className="resultText">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, products.length)} of {products.length}{" "}
            results
          </p>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="popularity">Sort by popularity</option>
            <option value="date">Sort by latest</option>
            <option value="price">Sort by price: low to high</option>
            <option value="price-desc">Sort by price: high to low</option>
          </select>
        </div>
        <div className="productContainerShop">
          {currentItems.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="productImageAndTitleContainer"
            >
              <img src={product.images[0].path} alt={product.productName} />
              <h6>{product.productName}</h6>
            </Link>
          ))}
        </div>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="bx bx-right-arrow-alt"></i>
        </button>
      </div>
      <Footer />
    </>
  );
}
