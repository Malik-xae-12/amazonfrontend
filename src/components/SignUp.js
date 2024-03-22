import React from 'react'
import styled from 'styled-components'

const SignUp = () => {
  return (
    <Container>
      <Logo>
        <img src="./amazon_logo.png" alt="logo" />
      </Logo>

      <FormContainer>
        <h3>Sign - Up</h3>
        <InputContainer>
            <p>Full Name</p>
            <input type="text" placeholder="John Smith" />
        </InputContainer>
        <InputContainer>
            <p>Email</p>
            <input type="text" placeholder="example@example.com" />
        </InputContainer>
        <InputContainer>
            <p>Password</p>
            <input type="password" placeholder="********" />
        </InputContainer>
        <SignUpButton>Create Account in amazon</SignUpButton>              
      </FormContainer>
      <LoginButton>Back to Login</LoginButton>
    </Container>
  )
}

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
  margin-bottom:10px;
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

    h3{
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
    p{
        font-size: 14px;
        font-weight: 600;
    }
    input{
        width: 95%;
        height: 33px;
        padding-left:5px;
        border-radius: 5px;
        border: 1px solid gray;
        margin-top: 5px;

        &:hover{
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
    &:hover{
        background-color: #dfdfdf;
        border: 1px solid gray;
    }
`;

export default SignUp
