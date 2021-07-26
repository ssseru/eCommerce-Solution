import React from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userAction";
import { Link } from "react-router-dom";

function ProductsComponent() {
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log("userInfo", userInfo);

  // console.log("User Token:", userInfo.token);
  // console.log("User Details:", user);

  return (
    <div>
      <Link to="/" onClick={signoutHandler}>
        Sign Out
      </Link>
      Products Yeet!!!!{userInfo.name}
    </div>
  );
}

export default ProductsComponent;
