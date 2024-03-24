import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useStateValue } from "../StateProvider";
import axios from "../axios";

const Orders = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .post("/orders/get", { email: user.email })
      .then((res) => {
        // console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(orders);
  return (
    <Container>
      <Navbar />
      <Main>
        <OrderContainer>
          <h2>Your Orders</h2>
          {orders.map((order) => 
            <OrderDetail key={order._id}>
              <AddressContainer>
                <h4>Shipping Address</h4>
                <div>
                  <p>{order.address.fullName}</p>
                  <p>{order.address.flat}</p>
                  <p>{order.address.area}</p>
                  <p>{order.address.city}{order.address.state}</p>
                  <p>Phone : {order.address.phone}</p>
                </div>
              </AddressContainer>
              <OrderBasket>
                <h4>Order</h4>
                <p>
                  Subtotal : $ <span>{order.price}</span>
                </p>
                {
                  order.products.map((product)=>
                    <Product key={product.id}>
                      <Image>
                        <img
                          src={product.image}
                          alt=""
                        />
                      </Image>
                      <Description>
                        <h4>{product.title}</h4>
                        <p>$ {product.price}</p>
                      </Description>
                    </Product>
                  )
                }
                
              </OrderBasket>
            </OrderDetail>
          )}
        </OrderContainer>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: fit-content;
  background-color: rgb(234, 237, 237);
`;
const Main = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;
const OrderContainer = styled.div`
  padding: 15px;
  background-color: white;
  width: 95%;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgrey;
    padding-bottom: 15px;
  }
`;
const OrderDetail = styled.div`
  border-bottom: 1px solid lightgrey;
  padding-bottom: 20px;
`;
const AddressContainer = styled.div`
  margin-top: 20px;
  div {
    margin-top: 10px;
    margin-left: 10px;
    p {
      font-size: 14px;
      margin-top: 4px;
    }
  }
`;
const OrderBasket = styled.div`
  margin-top: 20px;
  p {
    font-size: 15px;
    margin-left: 15px;
    margin-top: 15px;
    span {
      font-weight: 600;
    }
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;
const Image = styled.div`
  flex: 0.15;
  margin-left: 50px;
  img {
    width: 70%;
  }
`;

const Description = styled.div`
  margin-bottom: 10px;
  flex: 0.8;
  h4 {
    font-weight: 400;
    font-size: 18px;
    @media only screen and (max-width: 1200px) {
      font-size: 14px;
      font-weight: 500;
    }
  }
  p {
    font-weight: 600;
    margin-top: 10px;
  }
  button {
    background-color: transparent;
    color: #1384b4;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Orders;
