import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDataHandler } from "../../components/apicalling/Apicalling";
import { Icon } from "@iconify/react";
import { Breadcrumb, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../context/LoaderContext";
import ReactStars from "react-stars";
import { ProductDetailsItems } from "../../components/helper/NavHelper";
import Cart from "../../components/addtocart/Cart";

const ProductDetails = () => {
  const [relatedProductData, setRelatedProductData] = useState([]);

  const [singleProduct, setSingleProduct] = useState({});

  const [cartProduct, setCartProduct] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [addcart, setAddCart] = useState(false);

  const { setIsLoading } = useLoadingContext();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getSingleProductHandler();
    getProductsHandler();
    setAddCart(false);
    setQuantity(1);
  }, [id]);

  const getProductsHandler = async () => {
    setIsLoading(true);
    await getDataHandler("https://dummyjson.com/products").then((response) => {
      if (response.status === "success") {
        setRelatedProductData(response?.response.products);
        setIsLoading(false);
      }
    });
  };

  const getSingleProductHandler = async () => {
    setIsLoading(true);
    await getDataHandler(`https://dummyjson.com/products/${id}`).then(
      (response) => {
        if (response.status === "success") {
          setSingleProduct(response?.response);
          setIsLoading(false);
        }
      }
    );
  };

  const quantityDicHandler = () => {
    quantity >= 1 && setQuantity((prev) => prev - 1);
  };
  const quantityIncHandler = () => {
    setQuantity((prev) => prev + 1);
  };

  const singleProductHandler = (productId) => {
    navigate(`/product/${productId}`);
  };

  const items = ProductDetailsItems(singleProduct);

  const addToCartHandler = () => {
    const existingProductIndex = cartProduct.findIndex(
      (item) => item.id === singleProduct.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartProduct];
      updatedCart[existingProductIndex].quantity += quantity;
      setCartProduct(updatedCart);
    } else {
      setCartProduct([...cartProduct, { ...singleProduct, quantity }]);
    }

    setAddCart(true);
    setOpenDrawer(true);
  };

  return (
    <>
      <Cart
        setOpen={setOpenDrawer}
        open={openDrawer}
        setCartProduct={setCartProduct}
        cartProduct={cartProduct}
      />
      <div className="product-details-wrapper">
        <div className="container">
          <Breadcrumb
            items={items.map((item) => item)}
            className="navigate"
          ></Breadcrumb>

          <Row gutter={[30, 30]}>
            <Col md={12} xs={24}>
              <div className="product-image-warpper">
                <img src={singleProduct.thumbnail} />
              </div>
            </Col>
            <Col md={12} xs={24}>
              <div className="product-content-warp">
                <h1 className="product-name">{singleProduct.title}</h1>
                <ReactStars
                  count={5}
                  value={singleProduct?.rating}
                  size={24}
                  isHalf={true}
                  edit={false}
                  activeColor="#ffa965"
                />
                <h3 className="price">$ {singleProduct?.price}</h3>
                <p className="description">{singleProduct?.description}</p>
                <p className="stock-title">
                  Stock:{" "}
                  {singleProduct?.stock >= 0 ? (
                    <span>{singleProduct?.stock}</span>
                  ) : (
                    <span>Out of stock</span>
                  )}
                </p>
                <div className="add-to-cart-wrapper">
                  <div className="quantity">
                    <span className="quantity-btn" onClick={quantityDicHandler}>
                      <Icon icon="ic:round-minus" />
                    </span>
                    <input
                      className="quantity-counter"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                    />
                    <span className="quantity-btn" onClick={quantityIncHandler}>
                      <Icon icon="ic:round-plus" />
                    </span>
                  </div>
                  <button
                    className="btn add-to-cart-btn"
                    onClick={addToCartHandler}
                  >
                    Add To Cart {addcart && <Icon icon="ci:check" />}
                  </button>
                </div>
                <button className="btn buy-btn">Buy It Now</button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="related-products-wrapper">
        <div className="container">
          <h2 className="section-title">Related products</h2>
          <Row gutter={[30, 30]}>
            {relatedProductData.map(
              (item, index) =>
                singleProduct?.category === item?.category && (
                  <Col key={index} md={8} xs={12}>
                    <div
                      className="product-image"
                      onClick={() => singleProductHandler(item.id)}
                    >
                      <span className="discount-tag">
                        {item.discountPercentage} % OFF
                      </span>
                      <img src={item.thumbnail} />
                    </div>
                    <p className="product-category">{item.category}</p>
                    <h3
                      className="product-title"
                      onClick={() => singleProductHandler(item.id)}
                    >
                      {item.title}
                    </h3>
                    <ReactStars
                      count={5}
                      value={item?.rating}
                      size={24}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffa965"
                    />

                    <p className="product-price">$ {item.price}</p>
                  </Col>
                )
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
