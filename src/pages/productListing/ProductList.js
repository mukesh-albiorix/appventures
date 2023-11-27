import React, { useEffect, useState } from "react";
import { getDataHandler } from "../../components/apicalling/Apicalling";
import { Breadcrumb, Col, Row } from "antd";
import "./ProductList.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../context/LoaderContext";
import ReactStars from "react-stars";
import { ProductListItems } from "../../components/helper/NavHelper";

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const { setIsLoading } = useLoadingContext();

  const navigate = useNavigate();

  useEffect(() => {
    getProductsHandler();
  }, []);

  const getProductsHandler = async () => {
    setIsLoading(true);
    await getDataHandler("https://dummyjson.com/products").then((response) => {
      if (response.status === "success") {
        setProductData(response?.response.products);
        setIsLoading(false);
      }
    });
  };

  const singleProductHandler = (id) => {
    navigate(`/product/${id}`);
  };

  const items = ProductListItems();

  return (
    <>
      <div className="shop-hero">
        <div className="container">
          <Row align={"center"} justify={"center"}>
            <Col>
              <h1>Shop</h1>
              <Breadcrumb items={items.map((item) => item)}></Breadcrumb>
            </Col>
          </Row>
        </div>
      </div>
      <div className="container">
        <Row gutter={[30, 60]}>
          {productData.map(
            (item, index) =>
              item?.category !== "groceries" &&
              item?.category !== "home-decoration" && (
                <Col md={8} xs={12} key={index}>
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
    </>
  );
};

export default ProductList;
