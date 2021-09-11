import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../actions/userAction";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function NavbarComponent() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);
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
                {totalItems > 0 ? (
                  <Badge badgeContent={totalItems} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                  <ShoppingCartIcon />
                )}
              </Link>
            </li>
            <li></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavbarComponent;
