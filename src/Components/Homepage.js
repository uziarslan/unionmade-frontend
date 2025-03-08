import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axiosInstance from "../services/axiosInstance";
import Flash from "./Flash";
import { AuthContext } from "../Context/AuthContext";
export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    companyPosition: "",
    username: "",
    message: "",
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({});
    setIsLoading(true);

    try {
      const { status, data } = await axiosInstance.post(
        "/api/v1/quote-request",
        formData
      );

      if (status === 201) {
        setMessage(data);
        setFormData({
          name: "",
          companyName: "",
          companyPosition: "",
          username: "",
          message: "",
        });
      }
    } catch ({ response }) {
      setMessage(response.data);
    }
    setIsLoading(true);
  };

  return (
    <>
      <Navbar />
      <Flash message={message} />
      <section className="heroSection">
        <div className="heroTextContentSection">
          <h1 className="mainHeroHeading">CANADIAN UNION MADE</h1>
          <p className="mainHeroSubheading">
            At Union Made Apparel, nestled in the heart of Toronto, Canada, we
            are more than just a clothing manufacturer. We are a family, a
            community, and a celebration of the fine art of apparel making. Our
            commitment to excellence shines through every fabric we weave, every
            stitch we sew, and in every design we bring to life.
          </p>
          <div className="heroButtonWrapper">
            <button type="button" className="heroCta">
              Our Products
            </button>
            <button type="button" className="heroCta">
              Contact us
            </button>
          </div>
        </div>
        <div className="heroVideoContainer">
          <iframe
            src="https://www.youtube.com/embed/JuHK-BGm7qI?si=Wo49CM92V2pzZFeS&amp;start=25&amp;autoplay=1&amp;mute=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className="aboutUsSection">
        <div className="aboutTextSection">
          <p className="aboutSecTitle">Real Canadian Craftmanship</p>
          <h2 className="aboutHeading">You Vision, Our Experties</h2>
          <p className="aboutSubHeading">
            Your corporate apparel goals are unique, and understanding them is
            at the core of our mission. Our project managers are not just
            experts; they are partners in your creative journey. From the
            initial design consultation, our team works diligently to capture
            your vision, offering recommendations and transforming ideas into
            stunning 3D mock-ups. We don’t just create apparel; we craft a story
            – your story.
          </p>
          <button className="aboutCta">Work with us</button>
        </div>
        <div className="statsSection">
          <div className="statsBox">
            <h3 className="stats">20+</h3>
            <p className="statsSubheading">Union Clients</p>
          </div>
          <div className="statsBox">
            <h3 className="stats">100+</h3>
            <p className="statsSubheading">Customization Options</p>
          </div>
          <div className="statsBox">
            <h3 className="stats">3+</h3>
            <p className="statsSubheading">Million products delivered</p>
          </div>
          <div className="statsBox">
            <h3 className="stats">4.5/5</h3>
            <p className="statsSubheading">Average customer rating</p>
          </div>
        </div>
      </section>
      <hr className="breaker" />
      <section id="products" className="productsSection">
        <h2 className="productsMainHeading">Our Products</h2>
        <div className="productsHolder">
          {products.length > 0 &&
            products
              .filter((product) => product.status.toLowerCase() === "active")
              .slice(0, 6)
              .map((product, i) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <div key={i} className="productBlock">
                    {product.images.length && (
                      <img
                        src={product.images[0].path}
                        alt="Product"
                        className="productImage"
                      />
                    )}
                  </div>
                </Link>
              ))}
        </div>
        <div className="allProductCta">
          <Link to="/shop">
            <button type="button">All Products</button>
          </Link>
        </div>
      </section>
      <hr className="breaker" />
      <section id="usa" className="joinFamilySection">
        <div className="tikTokSection">
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@unionmade.net/video/7400231422692199685"
            data-video-id="7400231422692199685"
          >
            <section>
              <Link
                target="_blank"
                title="@unionmade.net"
                href="https://www.tiktok.com/@unionmade.net?refer=embed"
              >
                @unionmade.net
              </Link>
              Discover the heart and soul of Canadian craftsmanship in every
              stitch. 🇨🇦✨ Our latest video takes you inside our Toronto
              factory, where skilled artisans bring passion and precision to
              union-made apparel. Proudly made in Canada, for Canadians.
              <Link
                title="unionmade"
                target="_blank"
                href="https://www.tiktok.com/tag/unionmade?refer=embed"
              >
                #UnionMade
              </Link>
              <Link
                title="canadiancraftsmanship"
                target="_blank"
                href="https://www.tiktok.com/tag/canadiancraftsmanship?refer=embed"
              >
                #CanadianCraftsmanship
              </Link>
              <Link
                title="torontomade"
                target="_blank"
                href="https://www.tiktok.com/tag/torontomade?refer=embed"
              >
                #TorontoMade
              </Link>
              <Link
                title="proudlycanadian"
                target="_blank"
                href="https://www.tiktok.com/tag/proudlycanadian?refer=embed"
              >
                #ProudlyCanadian
              </Link>
              <Link
                title="smartunion"
                target="_blank"
                href="https://www.tiktok.com/tag/smartunion?refer=embed"
              >
                #smartunion
              </Link>
              <Link
                title="smartlocal540"
                target="_blank"
                href="https://www.tiktok.com/tag/smartlocal540?refer=embed"
              >
                #smartlocal540
              </Link>
              <Link
                target="_blank"
                title="♬ original sound - unionmade.net"
                href="https://www.tiktok.com/music/original-sound-7400231425002474246?refer=embed"
              >
                ♬ original sound - unionmade.net
              </Link>
            </section>
          </blockquote>
          <script async src="https://www.tiktok.com/embed.js"></script>
        </div>
        <div className="joinFamilyTextContentSection">
          <h2 className="joinFamilyMainHeading">
            Join The Union Made Apparel Family
          </h2>
          <p className="joinFamilySubHeading">
            Dive into a world where fabric meets finesse, where design meets
            durability, and where your vision becomes a vivid reality. Contact
            us today to start your journey with Union Made Apparel, where every
            thread tells a story of excellence.
          </p>
          <iframe
            src="https://www.youtube.com/embed/sbWwSnA8K2U?si=DiZiEYAdkHxFodOM&apmp;autoplay=1&amp;mute=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section id="aboutUs" className="moreAboutBrandSection">
        <div className="blueSection">
          <h2 className="blueSectionHeading">Canadian Made, Member Loved</h2>
          <p className="blueSectionSubHeading">
            Canadian Union Made Apparel prides itself on each piece of clothing
            as a testament to the skill and dedication of the Union Made Apparel
            team. We don’t just make apparel; we craft legacies. Our process,
            from inception to final stitch, is imbued with the pride and quality
            only a union workforce can provide.
          </p>
          <button type="button" className="blueSectionCta">
            Get in touch
          </button>
        </div>
        <div className="yellowSection">
          <h2 className="yellowSectionHeading">
            Sustainable, Responsible, Exceptional
          </h2>
          <p className="yellowSectionSubHeading">
            Sustainability isn’t just a word for us; it’s a promise. Our green
            approach ensures that we purchase extra raw materials, leading to a
            final delivered quantity with a variance of plus or minus 5%. This
            is our standard practice for custom-made products, reflecting our
            commitment to reducing waste and enhancing efficiency.
          </p>
          <ul className="uspies">
            <li className="usp">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_179_1056)">
                  <path
                    d="M17.0689 9.76648L13.0586 2.50373C12.9238 2.47057 12.9575 2.52031 12.9238 2.58664C12.452 3.29965 11.5252 5.47184 10.9523 5.88638C9.92442 6.63255 8.5764 5.63766 9.03136 4.41062C9.28411 3.74735 10.5142 1.57516 10.9523 1.01138C11.9465 -0.298567 13.9348 -0.315149 14.9627 0.945055L19.1247 8.25756C19.1247 8.25756 19.2258 8.25755 19.2932 8.24097C19.7313 8.02541 20.1525 7.47822 20.6918 7.41189C21.3321 7.32898 22.0398 7.71036 22.1409 8.37363C22.3431 9.89914 22.1409 11.6402 22.2588 13.1989C22.2083 13.8953 21.568 14.4093 20.8603 14.343C19.428 13.7792 17.743 13.315 16.3612 12.6683C15.7378 12.3698 15.4176 11.9387 15.5187 11.2422C15.6198 10.5458 16.5297 10.181 17.0521 9.79965L17.0689 9.76648Z"
                    fill="#202D45"
                  />
                  <path
                    d="M15.5356 23.5127V24.8724C15.5356 24.9719 15.3671 25.3367 15.2829 25.4528C14.9459 25.9337 14.3224 26.1326 13.7664 25.9171C12.57 24.9885 10.7502 24.1926 9.63803 23.2308C9.04827 22.7002 9.04827 21.8877 9.60433 21.3405L13.7327 18.6543C14.4572 18.2895 15.5019 18.9196 15.5019 19.699V21.0089H23.4216L21.7365 18.0408C20.8603 16.6479 22.7644 15.2551 23.8091 16.5816C24.2978 17.2117 25.1403 18.8367 25.5279 19.5995C25.966 20.4783 26.1513 21.1084 25.7301 22.0701C25.4605 22.6671 24.5 23.4962 23.8091 23.4962H15.5019L15.5356 23.5127Z"
                    fill="#202D45"
                  />
                  <path
                    d="M4.27949 21.0089C5.76232 21.1913 5.82972 23.3137 4.33004 23.5127C3.72343 23.5956 2.1732 23.5625 1.60029 23.3469C0.302822 22.866 -0.38804 21.2908 0.218571 20.0306L3.70658 13.8125C3.70658 13.8125 3.67288 13.713 3.62233 13.6798C3.08312 13.116 1.85305 12.8176 1.6677 11.9387C1.56659 11.4744 1.75195 10.9936 2.12265 10.6951C3.58863 10.1645 5.18941 9.30225 6.67223 8.88771C7.51475 8.65557 8.17191 8.9872 8.37411 9.81628C8.30671 11.3086 8.45836 12.9834 8.32356 14.4757C8.23931 15.3711 7.48105 16.0178 6.57113 15.6862C6.43633 15.6364 5.82972 15.1721 5.77917 15.2053L2.52706 21.0255C3.08312 21.0752 3.74028 20.9591 4.27949 21.0255V21.0089Z"
                    fill="#202D45"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_179_1056">
                    <rect width="26" height="26" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Sustainable Practices
            </li>
            <li className="usp">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_179_1061)">
                  <path
                    d="M0.00995461 12.1881C0.656646 1.13123 14.2887 -4.09659 22.1807 3.77364C30.1093 11.6798 24.9025 25.3554 13.8205 26.0041H12.196C11.9035 25.9261 11.569 25.9356 11.2636 25.8955C5.53093 25.1348 0.868365 20.4872 0.118528 14.7457C0.0784917 14.4403 0.0873133 14.1058 0.00995461 13.8133C0.0330265 13.2759 -0.0212603 12.7235 0.00995461 12.1881ZM12.9913 4.63884C12.5801 4.64698 12.1973 4.95913 12.0976 5.3595L12.0922 13.0791C12.0908 13.4163 12.3012 13.6043 12.5271 13.812C13.9196 15.0952 15.6758 16.1945 17.1049 17.4614C18.0671 18.0898 19.0877 16.9097 18.3087 16.054L13.9325 12.5077L13.9189 5.3595C13.8171 4.9476 13.4134 4.63002 12.9913 4.63884Z"
                    fill="#202D45"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_179_1061">
                    <rect width="26" height="26.0041" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Timely Completion
            </li>
            <li className="usp">
              <svg
                width="26"
                height="21"
                viewBox="0 0 26 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_179_1064)">
                  <path
                    d="M0 1.11923C0.189251 0.530446 0.548761 0.0875033 1.19316 0.00203496L24.7553 0C25.4648 0.0651187 25.9274 0.608453 25.9986 1.29491V15.1598C26.0319 15.6821 25.3624 16.4527 24.8543 16.4527H15.6387C15.7879 18.0345 16.317 19.6774 17.5678 20.7179H8.4288C9.6803 19.6774 10.2094 18.0352 10.3579 16.4527H1.14229C1.10295 16.4527 0.872998 16.3543 0.810592 16.3278C0.343908 16.1284 0.166188 15.7926 0 15.3355V1.11923ZM24.2703 1.72836H1.72632V14.727H24.2703V1.72836Z"
                    fill="#202D45"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_179_1064">
                    <rect width="26" height="20.7186" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Modern Technology
            </li>
            <li className="usp">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_179_1067)">
                  <path
                    d="M5.58121 25.9626H5.02336C4.70885 25.8677 4.4445 25.7667 4.18489 25.5586C2.81907 24.4646 1.47427 22.7077 0.194536 21.4842L0 20.9433V20.3855C0.119297 20.0744 0.21826 19.7456 0.455498 19.4969L19.741 0.283911C20.3198 -0.0760135 20.9611 -0.0943147 21.5602 0.232397C22.7803 1.53246 24.4525 2.82101 25.573 4.18344C26.6934 5.54586 25.3872 6.67783 24.4234 7.5529L21.7121 4.89786C21.0302 4.48778 20.307 5.00225 20.5211 5.78378C21.3305 6.84119 22.4346 7.67288 23.2846 8.69029L22.1466 9.83717L20.515 8.22327C19.8101 7.84911 19.1058 8.53168 19.438 9.24882L21.0519 10.8844L19.907 12.0652L17.1463 9.35863C16.4332 8.91737 15.653 9.74363 16.1112 10.4438L18.8225 13.1592L17.6384 14.2966C17.5394 14.279 16.4332 13.0589 16.2115 12.8792C15.3385 12.1716 14.4099 13.0989 15.1182 13.9719C15.2978 14.1929 16.5186 15.2984 16.5362 15.3974C16.5491 15.4435 16.5125 15.4624 16.4922 15.4936C16.4373 15.5756 15.5378 16.4765 15.4741 16.509C15.4144 16.5395 15.39 16.5334 15.346 16.4839L12.7309 13.8729C11.9433 13.3897 11.1312 14.201 11.6776 14.9764L14.3035 17.666L13.1654 18.8129L11.5339 17.199C10.8289 16.8249 10.1247 17.5074 10.4568 18.2246L12.0707 19.8602C12.0836 19.9063 12.047 19.9252 12.0266 19.9564C11.969 20.0418 11.0248 20.9881 10.9577 21.0226C10.8981 21.0531 10.8737 21.047 10.8296 20.9976L8.16508 18.3351C7.45201 17.8938 6.67183 18.7201 7.13004 19.4203L9.84134 22.1356L8.65718 23.273C8.51687 23.2479 7.37338 21.8855 7.02769 21.7032C6.32546 21.3331 5.6334 21.9946 5.96621 22.7131C6.11737 23.0392 7.57876 24.2789 7.55571 24.4104C6.94025 24.9906 6.44747 25.7498 5.58053 25.964L5.58121 25.9626Z"
                    fill="#202D45"
                  />
                  <path
                    d="M0 0.40668V0.153174C0.077272 0.0162531 0.21487 -0.0210273 0.366025 0.0115083C1.92977 0.525977 3.71245 0.728647 5.25314 1.26684C6.30716 1.6349 7.12123 2.3073 7.86344 3.11933L3.08004 7.80446C0.785599 6.01907 0.89744 2.93632 0 0.40668Z"
                    fill="#202D45"
                  />
                  <path
                    d="M23.0353 25.9626C22.834 25.9843 22.4253 25.9843 22.2233 25.9626C21.9508 25.9335 21.4153 25.7539 21.1584 25.6325C20.5897 25.3634 19.1941 24.0471 18.7969 23.5306C18.7677 23.4926 18.7142 23.471 18.7264 23.4093L23.4596 18.7153C24.6811 19.9591 26.1282 20.9237 25.9771 22.8941C25.8605 24.4206 24.5706 25.7979 23.0353 25.9626Z"
                    fill="#202D45"
                  />
                  <path
                    d="M19.516 14.8105L22.3195 17.6622L17.591 22.3059L14.8193 19.5045L19.516 14.8105Z"
                    fill="#202D45"
                  />
                  <path
                    d="M8.91127 4.21338L11.2091 6.45901L6.47585 11.1523L4.21191 8.89986L8.91127 4.21338Z"
                    fill="#202D45"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_179_1067">
                    <rect width="26" height="25.9783" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Latest Designs
            </li>
          </ul>
        </div>
      </section>
      <section className="whyChooseSection">
        <h2 className="whyChooseHeading">Why Choose Union Made</h2>
        <div className="featuresWrapper">
          <div className="featureContainer">
            <h3 className="featureHeading">Product Features</h3>
            <p className="featureSubHeading">
              With thousands of selections from branded merchandise to custom
              business gifts, we ensure high-quality, durability, and
              satisfaction. Our in-house capabilities include:
            </p>
            <ul className="featuresList">
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Graphic Design Versatility
              </li>
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Screen Printing & Embroidery
              </li>
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Pad Printing Quality
              </li>
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Cutting & Sewing Consistency
              </li>
            </ul>
          </div>
          <div className="featureContainer">
            <h3 className="featureHeading">Customization Options</h3>
            <p className="featureSubHeading">
              With over 30 years of dedicated service to labor unions across
              Canada, we pride ourselves on a streamlined and fully customized
              apparel creation process for unions:
            </p>
            <ul className="featuresList">
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Free Consultation
              </li>
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Mock Up Design & Approval
              </li>
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Precision Manufacturing
              </li>
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Fast Fulfillment & Delivery
              </li>
            </ul>
          </div>
          <div className="featureContainer">
            <h3 className="featureHeading">Environmental Standards</h3>
            <p className="featureSubHeading">
              Unlike other union apparel manufacturers, Union Made Apparel
              enforces latest environmental standards in all of its
              manufacturing and sourcing processes:
            </p>
            <ul className="featuresList">
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Eco Friendly Technology
              </li>
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Sustainable Packaging
              </li>
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Ethical Material Sourcing
              </li>
              <li className="feature">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.0002 12.2341V13.7569L25.7118 15.7277C24.6604 20.6729 20.6786 24.652 15.7285 25.7029L13.7567 25.9911C13.2526 25.9696 12.7349 26.0199 12.2324 25.9911C0.810271 25.3363 -4.26606 11.0731 4.27918 3.34892C12.3658 -3.96078 25.3818 1.45801 26.0002 12.2333V12.2341ZM19.3276 7.32958C19.0024 7.33437 18.6757 7.48449 18.4296 7.68971L10.9805 15.1232L7.55873 12.0041C6.19818 10.8383 4.53083 12.52 5.78514 13.8775C7.07459 15.2733 8.87375 16.4974 10.2048 17.8885C10.7248 18.3093 11.467 18.2766 11.9544 17.8182L20.3822 9.43688C21.0469 8.59524 20.391 7.3136 19.3284 7.32878L19.3276 7.32958Z"
                    fill="#16C213"
                  />
                </svg>
                Annual Sustainability Audits
              </li>
            </ul>
          </div>
        </div>
      </section>
      <hr className="breaker" />
      <section className="whyChooseSection">
        <h2 className="whyChooseHeading">Founding Values</h2>
        <div className="featuresWrapper">
          <div className="featureContainer">
            <h3 className="featureHeading">Proudly Canadian</h3>
            <svg
              className="mb-4"
              width="100"
              height="101"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_120_408)">
                <path
                  d="M47.0596 100.196V77.0583L22.1559 80.9797L24.8042 69.611L0 50.0039L8.64178 45.9594L3.13818 28.4322L19.4106 32.1572L20.2934 22.1585L33.1343 33.7263L29.6084 10.3916L40.6549 14.0982L50.0956 0L59.3477 14.0982L70.3916 10.3916L66.8657 33.7263L79.7066 22.1585L80.5868 32.1572L96.8618 28.4322L91.3582 45.9594L100 50.0039L75.1382 69.6477L77.8441 80.9797L52.9404 77.0583V100.196H47.0596Z"
                  fill="#E20E0F"
                />
              </g>
              <defs>
                <clipPath id="clip0_120_408">
                  <rect width="100" height="100.196" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="featureSubHeading">
              At Union Made Apparel, we take immense pride in our Canadian
              roots, embodying the spirit of unity and strength that defines
              this great nation. Inspired by the diversity and resilience of
              Canadian workers, we craft high-quality clothing and apparel
              tailored for unions with a commitment to excellence and
              durability. We celebrate our Canadian heritage by championing fair
              labor practices, supporting local communities, and embracing
              sustainable manufacturing processes.
            </p>
          </div>
          <div className="featureContainer">
            <h3 className="featureHeading">Experts On Union Apparel</h3>
            <svg
              className="mb-4"
              width="117"
              height="82"
              viewBox="0 0 117 82"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_120_425)">
                <path
                  d="M22.4679 20.0776C24.8165 22.4807 25.6567 26.0743 24.8034 29.3067C22.9663 27.3499 21.7169 24.4941 20.0017 22.4611C16.0053 17.7312 9.16621 21.5795 10.8793 27.3455L20.5306 41.8095C20.6242 44.2583 19.3879 46.3022 18.0318 48.2155L26.3554 61.7283L30.9808 77.1435C31.636 81.6905 25.8265 83.5842 23.6367 79.5988L19.1354 64.8736L10.925 51.4979C6.44102 51.5806 1.77423 49.121 0.413807 44.6566C-1.30359 39.0169 2.71673 27.3891 5.71618 22.3522C9.19451 16.5122 17.6291 15.1235 22.47 20.0754L22.4679 20.0776Z"
                  fill="#E20E0F"
                />
                <path
                  d="M60.0004 26.377V54.4016H31.079L30.8352 54.1578V46.4176H44.2761C46.0632 46.4176 48.2094 44.0428 48.5207 42.3516C49.0148 39.6634 47.0318 35.9891 44.1129 35.9891H30.833V26.377H59.9983H60.0004Z"
                  fill="#E20E0F"
                />
                <path
                  d="M14.9862 21.6904C16.3793 21.4532 17.7658 21.9146 18.6974 22.9529L28.5556 37.2079L43.6312 37.2841C48.4852 37.7282 48.5636 44.6935 43.6312 45.118C38.0459 44.7458 31.8619 45.5947 26.3484 45.118C23.9693 44.9112 23.3011 43.4702 22.0669 41.7419C19.1328 37.6389 15.0363 32.1711 12.6158 27.8939C11.275 25.5257 11.9954 22.1998 14.9884 21.6883L14.9862 21.6904Z"
                  fill="#E20E0F"
                />
                <path
                  d="M24.7724 0.0305639C30.7518 -0.411301 35.5578 4.14883 35.2401 10.1717C35.1225 12.3767 34.0712 17.7661 32.4692 19.2941C30.8671 20.8221 26.825 19.5053 24.8856 18.8849C22.3324 18.0665 19.6377 17.0826 17.8811 14.9734C12.853 8.94186 17.215 0.587792 24.7724 0.0305639Z"
                  fill="#E20E0F"
                />
                <path
                  d="M2.48614 50.0005C3.95104 51.0779 5.54654 51.9769 7.34012 52.397C8.08454 52.5711 9.88247 52.6016 10.3156 53.0065C10.5507 53.2241 11.0949 54.3625 11.2037 54.7239C11.9111 57.0747 11.946 60.0611 12.5685 62.4837C11.158 67.4248 11.0383 74.044 9.33395 78.7652C7.83858 82.9053 1.32379 82.0433 1.85273 76.4993C2.28153 72.0045 4.14912 67.0395 4.61493 62.4663L2.48614 50.0027V50.0005Z"
                  fill="#E20E0F"
                />
              </g>
              <g clipPath="url(#clip1_120_425)">
                <path
                  d="M94.5321 20.0776C92.1835 22.4807 91.3433 26.0743 92.1966 29.3067C94.0337 27.3499 95.2831 24.4941 96.9983 22.4611C100.995 17.7312 107.834 21.5795 106.121 27.3455L96.4694 41.8095C96.3758 44.2583 97.6121 46.3022 98.9682 48.2155L90.6446 61.7283L86.0192 77.1435C85.364 81.6905 91.1735 83.5842 93.3633 79.5988L97.8646 64.8736L106.075 51.4979C110.559 51.5806 115.226 49.121 116.586 44.6566C118.304 39.0169 114.283 27.3891 111.284 22.3522C107.805 16.5122 99.3709 15.1235 94.53 20.0754L94.5321 20.0776Z"
                  fill="#E20E0F"
                />
                <path
                  d="M56.9996 26.377V54.4016H85.921L86.1648 54.1578V46.4176H72.7239C70.9368 46.4176 68.7906 44.0428 68.4793 42.3516C67.9852 39.6634 69.9682 35.9891 72.8871 35.9891H86.167V26.377H57.0017H56.9996Z"
                  fill="#E20E0F"
                />
                <path
                  d="M102.014 21.6904C100.621 21.4532 99.2342 21.9146 98.3026 22.9529L88.4444 37.2079L73.3688 37.2841C68.5148 37.7282 68.4364 44.6935 73.3688 45.118C78.9541 44.7458 85.1381 45.5947 90.6516 45.118C93.0307 44.9112 93.6989 43.4702 94.9331 41.7419C97.8672 37.6389 101.964 32.1711 104.384 27.8939C105.725 25.5257 105.005 22.1998 102.012 21.6883L102.014 21.6904Z"
                  fill="#E20E0F"
                />
                <path
                  d="M92.2276 0.0305639C86.2482 -0.411301 81.4422 4.14883 81.7599 10.1717C81.8775 12.3767 82.9288 17.7661 84.5308 19.2941C86.1329 20.8221 90.175 19.5053 92.1144 18.8849C94.6676 18.0665 97.3623 17.0826 99.1189 14.9734C104.147 8.94186 99.785 0.587792 92.2276 0.0305639Z"
                  fill="#E20E0F"
                />
                <path
                  d="M114.514 50.0005C113.049 51.0779 111.453 51.9769 109.66 52.397C108.915 52.5711 107.118 52.6016 106.684 53.0065C106.449 53.2241 105.905 54.3625 105.796 54.7239C105.089 57.0747 105.054 60.0611 104.432 62.4837C105.842 67.4248 105.962 74.044 107.666 78.7652C109.161 82.9053 115.676 82.0433 115.147 76.4993C114.718 72.0045 112.851 67.0395 112.385 62.4663L114.514 50.0027V50.0005Z"
                  fill="#E20E0F"
                />
              </g>
              <defs>
                <clipPath id="clip0_120_425">
                  <rect width="60" height="81.7754" fill="white" />
                </clipPath>
                <clipPath id="clip1_120_425">
                  <rect
                    width="60"
                    height="81.7754"
                    fill="white"
                    transform="matrix(-1 0 0 1 117 0)"
                  />
                </clipPath>
              </defs>
            </svg>
            <p className="featureSubHeading">
              With years of dedicated experience delivering high quality apparel
              for unions, we have honed our craft to seamlessly blend
              functionality, durability, and style into every garment we
              produce. We are committed to supporting unions throughout Canada,
              ensuring that our clothing not only meets but exceeds the rigorous
              standards of union members. From customizable uniforms to
              emblematic accessories, we pride ourselves on delivering high
              quality products that unite and empower workers across many
              industries. 
            </p>
          </div>
          <div className="featureContainer">
            <h3 className="featureHeading">Quality Craftsmanship</h3>
            <svg
              className="mb-4"
              width="100"
              height="93"
              viewBox="0 0 100 93"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_120_405)">
                <path
                  d="M0 26.5273V26.1359L19.476 0L80.6728 0.0600224L100 26.2611L50.1083 92.3563L0 26.5273ZM33.2081 5.81957H22.3675C18.7374 10.6579 15.1152 15.5119 11.5608 20.4076C10.8745 21.3523 10.0577 22.3466 9.57227 23.4009H27.5451L33.2107 5.81957H33.2081ZM33.5995 23.4009H66.4161L60.7323 5.84044L39.3826 5.80913L33.5995 23.4035V23.4009ZM90.4434 23.4009C89.958 22.3466 89.1385 21.3523 88.4548 20.4076C84.9031 15.5119 81.2808 10.6579 77.6482 5.81957H66.8076L72.4732 23.4009H90.446H90.4434ZM27.5425 29.2622H9.57227L41.4103 71.0666L27.5425 29.2622ZM66.4161 29.2622H33.5995L50.1057 78.4911L66.4161 29.2622ZM90.4434 29.2622H72.4706L58.7985 71.2623L90.4434 29.2622Z"
                  fill="#E20E0F"
                />
              </g>
              <defs>
                <clipPath id="clip0_120_405">
                  <rect width="100" height="92.3563" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="featureSubHeading">
              Canadian Union Made Apparel is dedicated to every stitch, seam,
              and detail being meticulously crafted to ensure durability,
              comfort, and style that lasts. We understand the demanding nature
              of union work and strive to create garments that can withstand the
              rigors of the job while still maintaining a professional
              appearance. Our commitment to excellence is evident in the
              materials we source, the techniques we employ, and the attention
              to detail we bring to every aspect of production.
            </p>
          </div>
        </div>
      </section>
      <section id="testimonials" className="testimonialSection">
        <h2 className="testimonialHeading">What our clients say about us</h2>
        <div className="testimonialWrapper">
          <div className="testimonialcontainer">
            <h5 className="testimonialTitle">Smart Local 30</h5>
            <p className="testimonialRating">5/5</p>
            <p className="testimonial">
              "From design to delivery, our custom apparel order was handled
              professionally and exceeded expectations for our members."
            </p>
          </div>
          <div className="testimonialcontainer">
            <h5 className="testimonialTitle">ATU 113</h5>
            <p className="testimonialRating">4/5</p>
            <p className="testimonial">
              "With attention to detail and timely delivery, Union Made
              Apparel's work became a symbol of quality for every member of our
              union."
            </p>
          </div>
          <div className="testimonialcontainer">
            <h5 className="testimonialTitle">Smart Local 540</h5>
            <p className="testimonialRating">4/5</p>
            <p className="testimonial">
              "Thanks to the seamless process and top-notch quality, apparel
              created by Union Made became an instant favorite among union
              members."
            </p>
          </div>
          <div className="testimonialcontainer">
            <h5 className="testimonialTitle">Trail Hub</h5>
            <p className="testimonialRating">5/5</p>
            <p className="testimonial">
              "We were surprised by the effort and attention to detail from
              concept to delivery that they put into fulfilling the vision for
              our apparel needs from concept all the way to delivery."
            </p>
          </div>
        </div>
      </section>
      <section id="getQuote" className="requestQuoteSection">
        <div className="requestWrapper">
          <form onSubmit={handleSubmit} className="requestFormSection">
            <h2 className="formHeading">Request a Quote</h2>
            <p className="formSubHeading">
              Ready to work together? Build your vision with us!
            </p>
            <div className="formInputs">
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder="Enter your name"
              />
              <input
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                type="text"
                placeholder="Company name"
              />
              <input
                value={formData.companyPosition}
                onChange={(e) =>
                  setFormData({ ...formData, companyPosition: e.target.value })
                }
                type="text"
                placeholder="Company position"
              />
              <input
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                type="email"
                placeholder="Enter you email address"
              />
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell what you need"
              />
            </div>
            <button type="submit" className="getQuoteCta">
              Get Quote
            </button>
          </form>
          <div className="faqSection">
            <div className="faqHeading">Frequently Asked Questions</div>
            <div className="details">
              <details className="details__container">
                <summary className="details__summary">
                  <h2 className="details__title">
                    1. How long does it take to receive a quote?
                  </h2>
                </summary>
              </details>
              <div className="details__desc">
                <div className="details__desc-inner">
                  A member from our team will contact you within 24 hours and
                  provide a detailed quote based on your request.
                </div>
              </div>
            </div>
            <div className="details">
              <details className="details__container">
                <summary className="details__summary">
                  <h2 className="details__title">
                    2. What details do you need to give me a quote?
                  </h2>
                </summary>
              </details>
              <div className="details__desc">
                <div className="details__desc-inner">
                  Please submit as many details as you can in terms of your
                  customization needs and quantity. This will allows us to
                  provide a more accurate quote.
                </div>
              </div>
            </div>
            <div className="details">
              <details className="details__container">
                <summary className="details__summary">
                  <h2 className="details__title">
                    3. Can you provide multiple quotes?
                  </h2>
                </summary>
              </details>
              <div className="details__desc">
                <div className="details__desc-inner">
                  Yes, we can give you multiple quotes on a variation of our
                  customization quests which should allows you to make a
                  decision that works best for your business.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
