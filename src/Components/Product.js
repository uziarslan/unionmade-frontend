import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axiosInstance from "../services/axiosInstance";
import Flash from "./Flash";
import { AuthContext } from "../Context/AuthContext";

const stages = ["Mockup", "Pre-production", "Production", "Shipped"];

const convertShippingDate = (inputDate) => {
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate;
};

const constcalculateFundedPercentage = (orders, minQty) => {
  const minQtyNum = parseInt(minQty);
  const ordersNum = parseInt(orders);
  return ((ordersNum / minQtyNum) * 100).toFixed(2);
};

const calculateTimeLeft = (endTime) => {
  if (!endTime)
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };

  const now = new Date().getTime();
  const distance = new Date(endTime).getTime() - now;

  if (distance < 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};
export default function Product() {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState({});
  const [activeTab, setActiveTab] = useState("shipping");
  const [product, setProduct] = useState({});
  const [timeLeft, setTimeLeft] = useState("");
  const [qty, setQty] = useState(1);
  const [currentStage, setCurrentStage] = useState(1);
  const [includedInCart, setIncludedInCart] = useState(false);
  const [message, setMessage] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [customSizes, setCustomSizes] = useState({
    backLength: "",
    chest: "",
    waist: "",
    bottomSweep: "",
    sleeveLength: "",
    neckOpening: "",
  });
  const { cart, addToCart, setIsLoading } = useContext(AuthContext);
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const { status, data } = await axiosInstance.get(
          `/api/v1/product/${id}`
        );
        if (status === 200) {
          setProduct(data);
          setMainImage(data.images[0]);
          setTimeLeft(data.endTime);
          setCurrentStage(stages.indexOf(data.stage) + 1);
        }
      } catch ({ response }) {
        console.error(response.data);
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [currentStage, setIsLoading, id]);

  useEffect(() => {
    if (product && product.endTime) {
      const intervalId = setInterval(() => {
        setTimeLeft(calculateTimeLeft(product.endTime.split("T")[0]));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft, product]);

  useEffect(() => {
    const cartElement = async () => {
      if (Object.values(product).length) {
        setIncludedInCart(cart.some(({ product }) => product._id === id));
      }
    };
    cartElement();
  }, [product, includedInCart, cart, id]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const incrementQty = (e) => {
    if (qty >= 1) {
      setQty(qty + 1);
    }
  };

  const decrementQty = (e) => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleChange = (event) => {
    const qty = parseInt(event.target.value);
    if (!isNaN(qty) && qty >= 1) {
      setQty(qty);
    }
  };

  const handleAddToCartClick = (product) => {
    const { sizes } = product;

    if (!selectedSize) {
      return setMessage({ error: "Please select a size." });
    }

    const isCustomSizeSelected =
      sizes.some((size) => size.toLowerCase() === "custom") &&
      selectedSize.toLowerCase() === "custom";

    if (isCustomSizeSelected) {
      const customSizeValues = Object.values(customSizes);
      const isCustomSizeEmpty = customSizeValues.every((value) => value === "");

      if (isCustomSizeEmpty) {
        return setMessage({ error: "Please first add your sizes." });
      }

      addToCart(product, qty, selectedSize, customSizes);
    } else {
      addToCart(product, qty, selectedSize);
    }

    setCustomSizes({
      backLength: "",
      chest: "",
      waist: "",
      bottomSweep: "",
      sleeveLength: "",
      neckOpening: "",
    });

    setIncludedInCart(true);
  };

  const handleSizeChange = (event) => {
    const name = event.target.name;
    setCustomSizes((prevItems) => ({
      ...prevItems,
      [name]: event.target.value,
    }));
  };

  const handleSizeSelect = (event) => {
    const name = event.target.value;
    setSelectedSize(name);
  };

  if (
    !Object.values(product).length ||
    product.status.toLowerCase() !== "active"
  )
    return null;

  return (
    <>
      <Navbar />
      <Flash message={message} />
      <section className="productShowSection">
        <div className="mainImagesWrapper">
          <div className="image-gallery">
            <div className="main-image">
              <img src={mainImage.path} alt="Product" />
            </div>
            <div className="thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.path}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${mainImage === image ? "active" : ""}`}
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              type="button"
              className="sizeChartButton"
            >
              Size chart
            </button>
          </div>
        </div>
        <div className="productDescriptionSection">
          <div className="titleAndPrice">
            <h4 className="productTitle">{product.productName}</h4>
            <h5 className="productPrice">
              ${parseInt(product.productPrice).toFixed(2)}
            </h5>
          </div>
          <p className="creator">By: Balatro</p>
          <div className="messageCreator">
            <h5 className="messageHeading">Message from creator</h5>
            <p className="messageText">{product.description}</p>
          </div>
          <div className="itemSoldContainer">
            <h4 className="itemSoldHeading">Item sold out</h4>
            <div className="roadLength">
              <div
                style={{
                  width: `${Math.min(
                    (product.funded / product.minQty) * 100,
                    100
                  )}%`,
                }}
                className="funded"
              ></div>
              <div className="fundedTextContainer">
                <p className="soldText">{product.funded} sold</p>
                <p className="fundedText">
                  {constcalculateFundedPercentage(
                    product.funded,
                    product.minQty
                  )}
                  % Funded
                </p>
              </div>
            </div>
          </div>
          <p className="itemSoldHeading">Sizes:</p>
          <div className="radio__group mb-3">
            {product.sizes.map((size, i) => (
              <div key={i} className="radio__button">
                <input
                  checked={selectedSize === size}
                  id={size}
                  type="radio"
                  value={size}
                  onChange={handleSizeSelect}
                />
                <label htmlFor={size}>
                  <p>{size}</p>
                </label>
              </div>
            ))}
          </div>
          {product.sizes.some((size) => size.toLowerCase() === "custom") &&
            selectedSize.toLowerCase() === "custom" && (
              <div className="mb-3">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#addSizeModal"
                  type="button"
                  className="sizeChartButton"
                >
                  Add Sizes
                </button>
              </div>
            )}
          <div className="qtyContainer">
            <div>
              <button onClick={decrementQty} className="negativeButton">
                -
              </button>
              <input
                className="qtyInput"
                type="text"
                min="1"
                value={qty}
                onChange={handleChange}
                placeholder="Qty"
              />
              <button onClick={incrementQty} className="positiveButton">
                +
              </button>
            </div>
            <div className="addCartWrapper">
              <button
                disabled={includedInCart}
                onClick={() => handleAddToCartClick(product)}
                type="button"
              >
                {includedInCart ? "Added to cart" : "Add to cart"}
              </button>
              <p className="shippingDate">
                Ship {convertShippingDate(product.endTime)}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="moreProductDescriptionSection">
        <div className="moreProductContainer">
          <div className="tabs">
            <div
              className={`tab ${activeTab === "shipping" ? "active" : ""}`}
              onClick={() => setActiveTab("shipping")}
            >
              Shipping & Returns
            </div>
            <div
              className={`tab ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </div>
          </div>

          {activeTab === "shipping" && (
            <div className="tab-content">
              <p>
                <strong>Ships {convertShippingDate(product.endTime)}</strong>
              </p>
              <div className="timeline">
                <div className="progress-line-column">
                  {stages.map((_, index) => (
                    <div
                      key={index}
                      className={`progress-point ${
                        index < currentStage ? "active" : ""
                      }`}
                    ></div>
                  ))}
                  <div
                    className="progress-connector-column"
                    style={{
                      height: `${
                        ((currentStage - 1) / (stages.length - 1)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="stageNameContainer">
                  {stages.map((stage, index) => (
                    <div key={index} className="timeline-item">
                      <strong>{stage}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <p className="policies">
                Delivery takes 7-15 business days.
                <br />
                Delivery to some areas may take 10-30 business days.
              </p>
              <p className="policies">
                Returns and Refunds: All sales are final and non-refundable. If
                a Campaign does not achieve its funding goal, all orders will be
                refunded within 4-7 business days.
              </p>
            </div>
          )}

          {activeTab === "details" && (
            <div className="tab-content">
              <div>
                <p className="section-title">Dimensions</p>
                <ul>
                  <li>Height: 18.4cm</li>
                </ul>
                <p>
                  Some heights may vary due to hair or additional accessories.
                </p>
              </div>
              <div>
                <p className="section-title">Materials</p>
                <ul>
                  <li>Polypropylene Cotton</li>
                  <li>Plush Fabric (Ultra Soft Fleece)</li>
                </ul>
              </div>
              <div>
                <p className="section-title">Care Instructions</p>
                <p>
                  Handwash warm or cool only. Do not machine wash or dry clean.
                </p>
              </div>
              <div>
                <p className="section-title">Warning</p>
                <p>
                  WARNING: CHOKING HAZARD. Small parts. Not for children under 3
                  years of age.
                  <br />
                  Adult collectible. Not a toy. Recommended for ages 15 and up.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="availableTimeContainer">
          <h5 className="availableHeading">
            Available for a limited time only!
          </h5>
          <div className="countdown-timer">
            <div className="time-segment">
              <div className="time-value">{timeLeft.days}</div>
              <div className="time-label">Days</div>
            </div>
            <div className="time-segment">
              <div className="time-value">{timeLeft.hours}</div>
              <div className="time-label">Hours</div>
            </div>
            <div className="time-segment">
              <div className="time-value">{timeLeft.minutes}</div>
              <div className="time-label">Minutes</div>
            </div>
            <div className="time-segment">
              <div className="time-value">{timeLeft.seconds}</div>
              <div className="time-label">Seconds</div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="exampleModalLabel">
                Size Chart
              </h1>
              <button type="button" data-bs-dismiss="modal" aria-label="Close">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_46_120)">
                    <path
                      d="M1.09381 0C1.32075 0.0549979 1.53942 0.102208 1.71912 0.265255L7.98782 6.52431L14.2794 0.265255C14.4591 0.102695 14.6778 0.0554846 14.9047 0H15.0299C15.2262 0.0511042 15.3674 0.0788465 15.5393 0.193223C16.0497 0.533431 16.1407 1.20898 15.774 1.69666L9.46831 8.00974L15.7477 14.2873C16.5484 15.2987 15.2792 16.5529 14.2648 15.7382L8.01071 9.49565L1.57253 15.8579C0.919949 16.2151 0.169964 15.852 0 15.1453V14.8017C0.0589274 14.6007 0.136361 14.4114 0.280514 14.2547L6.52974 8.00974L0.280514 1.76529C0.134413 1.61197 0.0735375 1.40999 0 1.21823V0.874612C0.0969136 0.541705 0.26006 0.283263 0.572229 0.119243L0.968649 0H1.09381Z"
                      fill="#FFC13D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_46_120">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <table>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest</th>
                    <th>Height</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S</td>
                    <td>33*</td>
                    <td>25*</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>33*</td>
                    <td>25*</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>33*</td>
                    <td>25*</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>33*</td>
                    <td>25*</td>
                  </tr>
                  <tr>
                    <td>2XL</td>
                    <td>33*</td>
                    <td>25*</td>
                  </tr>
                  <tr>
                    <td>3XL</td>
                    <td>33*</td>
                    <td>25*</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="addSizeModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="exampleModalLabel">
                Add custom size
              </h1>
              <button type="button" data-bs-dismiss="modal" aria-label="Close">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_46_120)">
                    <path
                      d="M1.09381 0C1.32075 0.0549979 1.53942 0.102208 1.71912 0.265255L7.98782 6.52431L14.2794 0.265255C14.4591 0.102695 14.6778 0.0554846 14.9047 0H15.0299C15.2262 0.0511042 15.3674 0.0788465 15.5393 0.193223C16.0497 0.533431 16.1407 1.20898 15.774 1.69666L9.46831 8.00974L15.7477 14.2873C16.5484 15.2987 15.2792 16.5529 14.2648 15.7382L8.01071 9.49565L1.57253 15.8579C0.919949 16.2151 0.169964 15.852 0 15.1453V14.8017C0.0589274 14.6007 0.136361 14.4114 0.280514 14.2547L6.52974 8.00974L0.280514 1.76529C0.134413 1.61197 0.0735375 1.40999 0 1.21823V0.874612C0.0969136 0.541705 0.26006 0.283263 0.572229 0.119243L0.968649 0H1.09381Z"
                      fill="#FFC13D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_46_120">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label mb-0">Back length</label>
                <input
                  onChange={handleSizeChange}
                  name="backLength"
                  value={customSizes.backLength}
                  className="form-control"
                  type="text"
                  placeholder="29 1/4'"
                />
              </div>
              <div className="form-group my-3">
                <label className="form-label mb-0">Chest</label>
                <input
                  onChange={handleSizeChange}
                  name="chest"
                  value={customSizes.chest}
                  className="form-control"
                  type="text"
                  placeholder="19 5/8'"
                />
              </div>
              <div className="form-group">
                <label className="form-label mb-0">Waist</label>
                <input
                  onChange={handleSizeChange}
                  name="waist"
                  value={customSizes.waist}
                  className="form-control"
                  type="text"
                  placeholder="18 1/8'"
                />
              </div>
              <div className="form-group my-3">
                <label className="form-label mb-0">Bottom sweep</label>
                <input
                  onChange={handleSizeChange}
                  name="bottomSweep"
                  value={customSizes.bottomSweep}
                  className="form-control"
                  type="text"
                  placeholder="19 1/2'"
                />
              </div>
              <div className="form-group">
                <label className="form-label mb-0">Sleeve length</label>
                <input
                  onChange={handleSizeChange}
                  name="sleeveLength"
                  value={customSizes.sleeveLength}
                  className="form-control"
                  type="text"
                  placeholder="33 1/2'"
                />
              </div>
              <div className="form-group mt-3">
                <label className="form-label mb-0">Neck opening</label>
                <input
                  onChange={handleSizeChange}
                  name="neckOpening"
                  value={customSizes.neckOpening}
                  className="form-control"
                  type="text"
                  placeholder="14 1/8'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
