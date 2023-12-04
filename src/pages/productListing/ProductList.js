import React, { useEffect, useState } from "react";
import { getDataHandler } from "../../components/apicalling/Apicalling";
import { Breadcrumb, Col, Row } from "antd";
import "./ProductList.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../context/LoaderContext";
import ReactStars from "react-stars";
import { ProductListItems } from "../../components/helper/NavHelper";
import { useDispatch, useSelector } from "react-redux";
import { isLoaderHandler } from "../../redux/slices/LoaderSlice";
import { fetchProductData } from "../../redux/slices/apiCallingSlice";

const ProductList = () => {
  // const [productData, setProductData] = useState([]);
  const { setIsLoading } = useLoadingContext();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.apicall.data);
  const { loading } = useSelector((state) => state.apicall);

  useEffect(() => {
    // getProductsHandler();
    // dispatch(isLoaderHandler(true));

    dispatch(fetchProductData("products"));

    // dispatch(isLoaderHandler(false));
  }, [dispatch]);

  useEffect(() => {
    if (loading === "loading") {
      return <div style={{ color: "#f00", fontSize: "500px" }}>Loading...</div>;
    }
    if (loading === "failed") {
      return <div>Error loading data: {userData.error}</div>;
    }
  }, [loading]);

  // const getProductsHandler = async () => {
  //   // setIsLoading(true);
  //   dispatch(isLoaderHandler(true));
  //   await getDataHandler("https://dummyjson.com/products").then((response) => {
  //     if (response.status === "success") {
  //       setProductData(response?.response.products);
  //       // setIsLoading(false);
  //       dispatch(isLoaderHandler(false));
  //     }
  //   });
  // };

  const singleProductHandler = (id) => {
    navigate(`/product/${id}`);
  };

  const pageName = pathname.split("/").filter((part) => part !== "");

  const items =
    pageName.length === 0
      ? ProductListItems((pageName[0] = "Product"))
      : ProductListItems(pageName[0]);

  return (
    <>
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
        <Row gutter={[30, 60]}>
          {userData?.products.map(
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
                  <Link
                    to={`/category/${item.category}`}
                    className="product-category"
                  >
                    {item.category}
                  </Link>
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
