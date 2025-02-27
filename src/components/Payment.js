import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useStateValue } from "../StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Reducer";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = () => {
  const navigate = useNavigate();
  const [{ address, basket ,user}, dispatch] = useStateValue();

  const [clientSecret, setClientSecret] = useState("");

  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await axios.post("/payment/create", {
        amount: getBasketTotal(basket),
      });
      console.log(data.data.clientSecret);
      setClientSecret(data.data.clientSecret);
    };

    fetchClientSecret();
    console.log("clientSecret is >>>>", clientSecret);
  }, []);

  const confirmPayment = async (e) => {
    e.preventDefault();

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        axios.post("/orders/add", {
          basket: basket,
          price: getBasketTotal(basket),
          email: user?.email,
          address: address,
        });
        dispatch({
          type: "EMPTY_BASKET",
        });
        // alert("Payment successful");
        navigate("/");
      })
      .catch((err) => console.warn(err));
  };

  return (
    <Container>
      <Navbar />
      <Main>
        <ReviewContainer>
          <h2>Review Your Order</h2>
          <AddressContainer>
            <h5>Shipping Address</h5>

            {address ? (
              <div>
                <p>{address.fullName}</p>
                <p>{address.flat}</p>
                <p>{address.area}</p>
                <p>{address.landmark}</p>
                <p>
                  {address.city} {address.state}
                </p>
                <p>{address.phone}</p>
              </div>
            ) : (
              <div>
                <p>No shipping address provided</p>
              </div>
            )}
          </AddressContainer>
          <PaymentContainer>
            <h5>Payment Method</h5>
            <div>
              <p>Card detaild</p>
              {/* card Element */}
              <CardElement />
            </div>
          </PaymentContainer>
          <OrderContainer>
            <h5>Your Order</h5>
            <div>
              {basket?.map((product) => (
                <Product key={product.id}>
                  <Image>
                    <img src={product.image} alt="" />
                  </Image>
                  <Description>
                    <h4>{product.title}</h4>
                    <p>$ {product.price}</p>
                  </Description>
                </Product>
              ))}
            </div>
          </OrderContainer>
        </ReviewContainer>
        <SubTotal>
          <CurrencyFormat
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={(value) => (
              <>
                <p>
                  SubTotal({basket.length} items):
                  <strong>{value}</strong>
                </p>
                <small>
                  <input type="checkbox" />
                  <span>This order contains a gift</span>
                </small>
              </>
            )}
          />
          <button onClick={confirmPayment}>Place Order</button>
        </SubTotal>
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
  padding: 15px;
  display: flex;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;
const ReviewContainer = styled.div`
  background-color: white;
  flex: 0.7;
  padding: 15px;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid gray;
    padding-bottom: 15px;
  }
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
const SubTotal = styled.div`
  flex: 0.3;
  margin-left: 10px;
  background-color: white;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 10px;
  }

  p {
    font-size: 20px;
  }
  small {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  span {
    margin-left: 10px;
  }
  button {
    width: 65%;
    height: 33px;
    margin-top: 20px;
    background-color: #ffd814;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const PaymentContainer = styled.div`
  margin-top: 15px;
  div {
    margin-top: 15px;
    margin-left: 15px;
    p {
      font-size: 14px;
    }
  }
`;

const OrderContainer = styled.div`
  margin-left: 5px;
  margin-top: 30px;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;
const Image = styled.div`
  flex: 0.3;
  margin-left: 50px;
  img {
    width: 70%;

    margin-right: 10px;
  }
`;

const Description = styled.div`
  flex: 0.7;
  h4 {
    font-weight: 400;
    font-size: 18px;
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

export default Payment;
