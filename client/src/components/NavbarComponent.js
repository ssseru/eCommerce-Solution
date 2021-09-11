import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../actions/userAction";
function NavbarComponent() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <>
      <nav className="nav-wrapper" style={{ backgroundColor: "cyan" }}>
        <div className="container">
          <Link to="/" className="brand-logo left">
            SaiKart
          </Link>

          <ul className="right">
            {userInfo == null ? (
              <li>
                <Link to="/signin">Sign in</Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/"
                  onClick={signoutHandler}
                  style={{ color: "black" }}
                >
                  Sign Out
                </Link>
              </li>
            )}

            <li>
              <Link to="/">Catalog</Link>
            </li>
            <li>
              <Link to="/cart">My Cart</Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="material-icons">shopping_cart</i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavbarComponent;
