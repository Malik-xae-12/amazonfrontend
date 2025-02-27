import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useStateValue } from "../StateProvider";

const Login = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [{}, dispatch] = useStateValue();

   const login = (e) => {
     e.preventDefault();

     axios
       .post("/auth/login", { email, password })
       .then((res) => {
         if (!res.data.error) {
           dispatch({
             type: "SET_USER",
             user: res.data,
           });

           localStorage.setItem("user", JSON.stringify(res.data));

           navigate("/");
         } else if (res.data.error) {
           alert(res.data.error);
         }
       })
       .catch((err) => console.warn(err));
   };
  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="./amazon_logo.png" alt="logo" />
      </Logo>

      <FormContainer>
        <h3>Sign - In</h3>
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

        <LoginButton onClick={login}>Login</LoginButton>

        <InfoText>
          By continuing, you agree to Amazon's <span>Conditions of Use</span>{" "}
          and <span>Privacy Notice</span>.
        </InfoText>
      </FormContainer>
      <SignUpButton onClick={() => navigate("/signup")}>
        Create Account in Amazon
      </SignUpButton>
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
  width: 75%;
  height: 35px;
  background-color: #f3b414;
  border-radius: 5px;
  border: none;
  outline: none;
  margin-top: 30px;
`;
const InfoText = styled.p`
  font-size: 12px;
  width: 100%;
  word-wrap: normal;
  word-break: normal;
  margin-top: 20px;
  span {
    color: #426bc0;
  }
`;

const SignUpButton = styled.button`
  width: 55%;
  height: 35px;
  font-size: 12px;
  margin-top: 20px;
  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;

export default Login;
