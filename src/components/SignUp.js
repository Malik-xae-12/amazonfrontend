import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
const SignUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const signup = (e) => {
   e.preventDefault();
   axios
     .post("/auth/signup", { email, password, fullName })
     .then((res) => alert(res.data.message))
     .catch((err) => console.warn(err));

   navigate("/login");
 };
  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="./amazon_logo.png" alt="logo" />
      </Logo>

      <FormContainer>
        <h3>Sign - Up</h3>
        <InputContainer>
          <p>FullName</p>
          <input
            type="text"
            placeholder="John Smith"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </InputContainer>
        <InputContainer>
          <p>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputContainer>

        <SignUpButton onClick={signup}>Create Account in Amazon</SignUpButton>
      </FormContainer>
      <LoginButton onClick={() => navigate("/login")}>
        Back to Login
      </LoginButton>
    </Container>
  );
};

const Container = styled.div`
  width: 55%;
  min-width: 450px;
  height: fit-content;
  padding: 20px;
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
  height: 450px;
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

const LoginButton = styled.button`
  width: 55%;
  height: 35px;
  background-color: #f3b414;
  border-radius: 5px;
  border: none;
  outline: none;
  margin-top: 30px;
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 12px;
  margin-top: 20px;
  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;

export default SignUp;
