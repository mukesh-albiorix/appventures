import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useLoadingContext } from "../../context/LoaderContext";
import { getDataHandler } from "../../components/apicalling/Apicalling";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";

const ProductCategory = () => {
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { category } = useParams();
  const { setIsLoading } = useLoadingContext();
  const navigate = useNavigate();

  useEffect(() => {
    getProductsHandler();
    getCategoriesHandler();
  }, [category]);

  const getProductsHandler = async () => {
    setIsLoading(true);
    await getDataHandler("https://dummyjson.com/products").then((response) => {
      if (response.status === "success") {
        setProductData(response?.response.products);
        setIsLoading(false);
      }
    });
  };
  const getCategoriesHandler = async () => {
    setIsLoading(true);
    await getDataHandler("https://dummyjson.com/products/categories").then(
      (response) => {
        if (response.status === "success") {
          setCategories(response?.response);
          setIsLoading(false);
        }
      }
    );
  };

  const categorySetHandler = (category) => {
    navigate(`/product-category/${category}`);
  };

  const singleProductHandler = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProductData = productData?.filter(
    (item) => item.category === category
  );

  return (
    <div>
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
                    <p className="product-category">{productItem.category}</p>
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
