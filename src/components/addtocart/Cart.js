import React, { useEffect, useState } from "react";
import { Col, Drawer, Row, Space } from "antd";
import { Icon } from "@iconify/react";
import "./cart.css";

const Cart = ({ open, setOpen, cartProduct, setCartProduct }) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const onClose = () => {
    setOpen(false);
  };

  const productRemoveHandler = (id) => {
    setCartProduct(cartProduct.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (cartProduct.length >= 0) {
      const totalQuantity = cartProduct.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);

      setTotalQuantity(totalQuantity);
    }
  }, [cartProduct]);

  useEffect(() => {
    if (cartProduct.length >= 0) {
      const totalPrice = cartProduct.reduce((acc, item) => {
        return acc + item.quantity * item.price;
      }, 0);

      setTotalPrice(totalPrice);
    }
  }, [cartProduct]);

  return (
    <div>
      <Drawer
        title={`Your Cart (${totalQuantity})`}
        closeIcon="Close"
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
        className="drawer-wrapper"
      >
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
                  <p>
                    {item.quantity} <Icon icon="uim:multiply" /> ${item.price}
                  </p>
                </div>
              </Col>
            </Row>
          ))}
        </div>
        <div className="subtotal-wrap">
          <span>Subtotal:</span> $ {totalPrice}
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
