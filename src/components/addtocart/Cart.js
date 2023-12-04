import React, { useEffect, useState } from "react";
import { Col, Drawer, Row } from "antd";
import { Icon } from "@iconify/react";
import "./cart.css";
import { Link } from "react-router-dom";

const Cart = ({ open, setOpen, cartProduct, setCartProduct }) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Set All Products quantity
  useEffect(() => {
    const totalQuantity = cartProduct.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    setTotalQuantity(totalQuantity);
  }, [cartProduct]);

  // Set All Products Price
  useEffect(() => {
    const totalPrice = cartProduct.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);

    setTotalPrice(totalPrice);
  }, [cartProduct]);

  const onClose = () => {
    setOpen(false);
  };

  const productRemoveHandler = (id) => {
    setCartProduct(cartProduct.filter((item) => item.id !== id));
  };

  const quantityDicHandler = (id) => {
    let existingProductIndex = cartProduct.findIndex((item) => item.id === id);

    const updatedCart = [...cartProduct];

    if (
      existingProductIndex !== -1 &&
      updatedCart[existingProductIndex].quantity >= 1
    ) {
      updatedCart[existingProductIndex].quantity = --updatedCart[
        existingProductIndex
      ].quantity;
      setCartProduct(updatedCart);
    }

    updatedCart[existingProductIndex]?.quantity === 0 &&
      productRemoveHandler(id);
  };

  const quantityIncHandler = (id) => {
    const updatedCart = [...cartProduct];

    let existingProductIndex = cartProduct.findIndex((item) => item.id === id);

    if (
      updatedCart[existingProductIndex]?.quantity <
      updatedCart[existingProductIndex]?.stock
    ) {
      updatedCart[existingProductIndex].quantity = ++updatedCart[
        existingProductIndex
      ].quantity;
      setCartProduct(updatedCart);
    }
  };

  const quantityHandler = (id) => {
    cartProduct?.map((item) => {
      if (item.id === id) {
      }
    });
  };

  return (
    <div>
      <Drawer
        title={`Your Cart (${totalQuantity})`}
        closeIcon="Close"
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
      >
        {cartProduct?.length >= 1 ? (
          <div className="drawer-wrapper">
            <div className="cartproducts-warpper">
              {cartProduct.map((item, index) => (
                <Row gutter={[20, 30]} key={index}>
                  <Col xs={8}>
                    <img src={item.thumbnail} />
                  </Col>
                  <Col xs={16}>
                    <div className="cart-wrapper">
                      <button
                        onClick={() => productRemoveHandler(item.id)}
                        className="remove-product"
                      >
                        <Icon icon="material-symbols:cancel-outline" />
                      </button>
                      <h3>{item.title}</h3>
                      <br />
                      <div className="quantity">
                        <span
                          className="quantity-btn"
                          onClick={() => quantityDicHandler(item.id)}
                        >
                          <Icon icon="ic:round-minus" />
                        </span>
                        <input
                          className="quantity-counter"
                          value={item.quantity}
                          onChange={() => quantityHandler(item.id)}
                        />
                        <span
                          className="quantity-btn"
                          onClick={() => quantityIncHandler(item.id)}
                        >
                          <Icon icon="ic:round-plus" />
                        </span>
                      </div>
                      <br />
                      <p>
                        {item.quantity} <Icon icon="uim:multiply" /> $
                        {item.price}
                      </p>
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
            <div className="subtotal-wrap">
              <h3>Subtotal:</h3> <h3>$ {totalPrice}</h3>
            </div>
            <button className="btn">View Cart</button>
          </div>
        ) : (
          <div className="continue-shopping">
            <Icon icon="mdi-light:cart" className="cart-icon" />
            <p>Shopping cart is empty!</p>
            <Link to={"/"} className="btn">
              Continue Shopping
            </Link>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Cart;
