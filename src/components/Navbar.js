import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const signOut = () => {  
    dispatch({
      type: "SET_USER",
      user: null,
    });

    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <Container>
      <Inner>
        <Logo>
          <img src="./Amazon-Logo-1.png" alt="" onClick={() => navigate("/")} />
          {/* <img src="./logo.png" alt="" /> */}
        </Logo>
        <SearchBar>
          <input type="text" placeholder="search...." />
          <SearchIcon onClick={() => navigate("/addproduct")}>
            <img src="./searchIcon.png" alt="" />
          </SearchIcon>
        </SearchBar>
        <RightContainer>
          {!user ? (
            <NavButton onClick={() => navigate("/signup")}>
              <p>Hello,</p>
              <p>Sign - In</p>
            </NavButton>
          ) : (
            <NavButton
              onClick={user ? () => signOut() : () => navigate("/login")}
            >
              <p>Hello,</p>
              <p>{user ? user?.fullName : "Guest"}</p>
            </NavButton>
          )}
          <NavButton onClick={() => navigate("/orders")}>
            <p>Return</p>
            <p>& Orders</p>
          </NavButton>
          <BasketButton onClick={() => navigate("/checkout")}>
            <img src="./basket-icon.png" alt="" />

            <p>{basket.length}</p>
          </BasketButton>
        </RightContainer>
      </Inner>
      <MobileSearchBar>
        <input type="text" placeholder="search...." />
        <SearchIcon onClick={() => navigate("/addproduct")}>
          <img src="./searchIcon.png" alt="" />
        </SearchIcon>
      </MobileSearchBar>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  /* height: 60px; */
  height: 80px;
  background-color: #131921;
  /* background-color: #f1e2b5d1; */
  display: flex;
  align-items: center;
  position: relative;
  @media only screen and (max-width: 767px) {
    height: 120px;
    flex-direction: column;
  }
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 767px) {
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  img {
    width: 100px;
    margin-top: 10px;
  }
`;

const SearchBar = styled.div`
  height: 35px;
  flex: 1; //* this will occupy the remianing space
  display: flex;
  align-items: center;
  margin-right: 20px;

  input {
    flex: 1;
    height: 92%;
    border: none;
    border-radius: 5px 0px 0px 5px;
    border: none;
    outline: none;

    &::placeholder {
      padding-left: 5px;
    }
  }
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const MobileSearchBar = styled.div`
  height: 35px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 10px;
  input {
    flex: 1;
    height: 94%;
    border: none;
    border-radius: 5px 0px 0px 5px;

    &::placeholder {
      padding-left: 10px;
    }
  }
  @media only screen and (min-width: 767px) {
    display: none;
  }
`;

const SearchIcon = styled.div`
  background-color: #febd69;
  /* background-color: green; */
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 5px 5px 0px;
  img {
    /* filter: invert(1); */
    width: 22px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-around;
  height: 100%;
  padding: 5px 15px;
`;

const NavButton = styled.div`
  color: white;
  /* color: black; */
  padding: 5px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 15px;
  p {
    &:nth-child(1) {
      font-size: 12px;
      margin: 0;
    }
    &:nth-child(2) {
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }
  }
`;

const BasketButton = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  cursor: pointer;
  img {
    width: 30px;
    margin-right: 10px;
    /* filter: invert(1); */
  }
  p {
    color: white;
    /* color: black; */

    font-weight: 500;
  }
`;

export default Navbar;
