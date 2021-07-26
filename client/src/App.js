import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeComponent from "./components/HomeComponent";
import SignInComponent from "./components/SignInComponent";
import RegisterComponent from "./components/RegisterComponent";
import ProductsComponent from "./components/ProductsComponent";
import { signout } from "./actions/userAction";
import { use } from "passport";
import jwt_decode from "jwt-decode";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  if (userInfo) {
    const user = jwt_decode(userInfo.token.substring(7));
    console.log("User Token:", userInfo.token);
    console.log("User Details:", user);
  }
  return (
    <BrowserRouter>
      {userInfo ? (
        <div>
          {/* <p>User's Name: {user.name}</p> */}
          <Link to="#signout" onClick={signoutHandler}>
            Sign Out
          </Link>
        </div>
      ) : (
        <p></p>
      )}
      <Route exact path="/" component={HomeComponent} />
      <Route path="/signin" component={SignInComponent} />
      <Route path="/register" component={RegisterComponent} />
      <Route path="/products" component={ProductsComponent} />
    </BrowserRouter>
  );
}

export default App;
