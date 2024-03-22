import React, { useState } from "react";
import axios from "../axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURl] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const addProduct = (e) => {
    e.preventDefault();
    axios
      .post("/products/add", { title, imageURL, price, rating })
      .then(() => {
        setTitle("");
        setImageURl("");
        setPrice(0);
        setRating(0);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="./amazon_logo.png" alt="logo" />
      </Logo>

      <FormContainer>
        <h3>Add product</h3>
        <InputContainer>
          <p>Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </InputContainer>
        <InputContainer>
          <p>ImageURL</p>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => {
              setImageURl(e.target.value);
            }}
          />
        </InputContainer>
        <InputContainer>
          <p>price</p>
          <input
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </InputContainer>
        <InputContainer>
          <p>Rating</p>
          <input
            type="number"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
        </InputContainer>
        <Button onClick={addProduct}>Add product</Button>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 55%;
  min-width: 450px;
  height: fit-content;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  width: 120px;
  margin-bottom: 10px;
  img {
    width: 100%;
  }
`;

const FormContainer = styled.div`
  border: 1px solid gray;
  width: 55%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;

  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    align-self: flex-start;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid gray;
    margin-top: 5px;

    &:hover {
      border: 1px solid orange;
    }
  }
`;

const Button = styled.button`
  width: 75%;
  height: 35px;
  background-color: #f3b414;
  border-radius: 5px;
  border: none;
  outline: none;
  margin-top: 30px;
`;

export default AddProduct;
