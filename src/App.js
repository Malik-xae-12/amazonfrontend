import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import styled from "styled-components";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import CheckOut from "./components/CheckOut";
import Address from "./components/Address";
import Payment from "./components/Payment";
import Success from "./components/Success";
import Failure from "./components/Failure";
//* for payment integration
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AddProduct from "./components/AddProduct";
import Orders from "./components/Orders";


const promise = loadStripe(
  "pk_test_51OwaFvSAYmxyccwdlxYg2OVXLZ8Drfwe1LKhuAq9bmGVdbbO4W3X0JDvpFTXCd31XHUD69verhWUPxdGLj6e9Ghm002fAP1zNc"
);

const App = () => {
  return (
    <>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/login" element={<Login />} />
            <Route path="/address" element={<Address />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/success" element={<Success />} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/failure" element={<Failure />} />
            <Route
              path="/payment"
              element={
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              }
            />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(234,237,237);
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
`;

export default App;
