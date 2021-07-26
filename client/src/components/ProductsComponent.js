import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userAction";
import { Link } from "react-router-dom";

function ProductsComponent(props) {
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log("userInfo", userInfo);
  const user = jwt_decode(userInfo.token.substring(7));
  // console.log("User Token:", userInfo.token);
  // console.log("User Details:", user);

  return (
    <div>
      <Link to="/" onClick={signoutHandler}>
        Sign Out
      </Link>
      Products Yeet!!!!{user.name}
    </div>
  );
}

export default ProductsComponent;
