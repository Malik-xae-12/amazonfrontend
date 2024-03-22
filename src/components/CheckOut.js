import React from "react";
import { useStateValue } from "../StateProvider";
import styled from "styled-components";
import Navbar from "./Navbar";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Reducer";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  // console.log(basket);

  const removeFromBasket = (e, id) => {
    e.preventDefault();

    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <Container>
      <Navbar />
      <Main>
        <ShoppingCart>
          <h2>Shopping cart</h2>
          {basket?.map((product) => (
            <Product key={product.id}>
              <Image>
                <img src={product.image} alt="" />
              </Image>
              <Description>
                <h4>{product.title}</h4>
                <p>$ {product.price}</p>
                <button
                  onClick={(e) => {
                    removeFromBasket(e, product.id);
                  }}
                >
                  Remove
                </button>
              </Description>
            </Product>
          ))}
        </ShoppingCart>
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
          <button onClick={() => navigate("/address")}>
            Proceed to checkout
          </button>
        </SubTotal>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  /* max-width: 1400px; */
  height: fit-content;
  margin: auto;
  background-color: rgb(237, 237, 237);
  position: relative;
`;

const Main = styled.div`
  display: flex;
  padding: 15px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ShoppingCart = styled.div`
  padding: 15px;
  background-color: white;
  flex: 0.7;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgrey;
    padding-bottom: 15px;
  }

  @media only screen and (max-width: 1200px) {
    flex: none;
  }
`;

const SubTotal = styled.div`
  flex: 0.3;
  background-color: white;
  margin-left: 15px;
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

export default CheckOut;
