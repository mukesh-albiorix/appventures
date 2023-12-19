import { Breadcrumb, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { getDataHandler } from "../../components/apicalling/Apicalling";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import { useDispatch } from "react-redux";
import { ProductListItems } from "../../components/helper/NavHelper";

const ProductCategory = () => {
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    getProductsHandler();
    getCategoriesHandler();
  }, [category]);

  const getProductsHandler = async () => {
    await getDataHandler("https://dummyjson.com/products").then((response) => {
      if (response.status === "success") {
        setProductData(response?.response.products);
      }
    });
  };
  const getCategoriesHandler = async () => {
    await getDataHandler("https://dummyjson.com/products/categories").then(
      (response) => {
        if (response.status === "success") {
          setCategories(response?.response);
        }
      }
    );
  };

  const categorySetHandler = (category) => {
    navigate(`/category/${category}`);
  };

  const singleProductHandler = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProductData = productData?.filter(
    (item) => item.category === category
  );
  const pageName = pathname.split("/").filter((part) => part !== "");

  const items = ProductListItems(pageName[0]);

  return (
    <div>
      <div className="shop-hero">
        <div className="container">
          <Row align={"center"} justify={"center"}>
            <Col>
              <h1>Shop</h1>
              <Breadcrumb
                items={items.map((item) => item)}
                className="breadcrumb"
              ></Breadcrumb>
            </Col>
          </Row>
        </div>
      </div>
      <div className="container">
        <Row gutter={[30, 30]}>
          <Col lg={6} md={8} xs={24}>
            <ul>
              {categories?.map((category, index) => (
                <li key={index} onClick={() => categorySetHandler(category)}>
                  {category}
                </li>
              ))}
            </ul>
          </Col>
          <Col lg={18} md={16} xs={24}>
            <Row gutter={[30, 30]}>
              {filteredProductData?.length > 0 ? (
                filteredProductData.map((productItem, index) => (
                  <Col md={8} sm={12} xs={24} key={index}>
                    <div
                      className="product-image"
                      onClick={() => singleProductHandler(productItem.id)}
                    >
                      <span className="discount-tag">
                        {productItem.discountPercentage} % OFF
                      </span>
                      <img src={productItem.thumbnail} />
                    </div>
                    <Link
                      to={`/category/${productItem.category}`}
                      className="product-category"
                    >
                      {productItem.category}
                    </Link>
                    <h3
                      className="product-title"
                      onClick={() => singleProductHandler(productItem.id)}
                    >
                      {productItem.title}
                    </h3>
                    <ReactStars
                      count={5}
                      value={productItem?.rating}
                      size={24}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffa965"
                    />
                    <p className="product-price">$ {productItem.price}</p>
                  </Col>
                ))
              ) : (
                <h2>No data Found</h2>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductCategory;
