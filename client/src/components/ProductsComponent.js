import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userAction";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productAction";
import { Container } from "reactstrap";

function ProductsComponent(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productList = useSelector((state) => state.productList);
  console.log(productList);

  const user = jwt_decode(userInfo.token.substring(7));

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <Container>
      <div>Welcome {user.name},</div>
    </Container>
  );
}

export default ProductsComponent;
