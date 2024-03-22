import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Card from "./Card";
import axios from "../axios";

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("/products/get");
      console.log(data);
      setProducts(data);
    };
    fetchData();
  }, []);

  const [products, setProducts] = useState("");

  return (
    <Container>
      <Navbar />
      <Banner>
        {/* <img src="./bg1.jpg" alt="" /> */}
        <img src="./banner.jpg" alt="" />
        <img src="./mobile_banner.jpg" alt="" />
      </Banner>
      <Main>
        {products &&
          products?.data.map((product) => {
            return (
              <Card
                key={product._id}
                id={product._id}
                image={product.imageURL}
                price={product.price}
                rating={product.rating}
                title={product.title}
              />
            );
          })}
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: rgb(234, 237, 237);
`;

const Banner = styled.div`
  width: 100%;
  img {
    width: 100%;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 2),
      rgba(0, 0, 0, 0.95),
      rgba(0, 0, 0, 0.85),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0)
    );

    &:nth-child(2) {
      display: none;
    }

    @media only screen and (max-width: 768px) {
      &:nth-child(1) {
        display: none;
      }
      &:nth-child(2) {
        display: block;
        -webkit-mask-image: none;
      }
    }
  }
`;

const Main = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  grid-auto-rows: 440px;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 20px;
  //* mobiles
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }
  //*tablets
  @media only screen and (min-width: 768px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
    grid-gap: 2;
  }
  @media only screen and (min-width: 768px) {
    margin-top: -130px;
    // margin-top: -500px;
    pad: 10px 0px;
  }
`;

export default Home;
