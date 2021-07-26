import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeComponent from "./components/HomeComponent";
import SignInComponent from "./components/SignInComponent";
import RegisterComponent from "./components/RegisterComponent";
import ProductsComponent from "./components/ProductsComponent";

function App(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log(userInfo);
  // const redirect = props.location.search
  //   ? props.location.search.split("=")[1]
  //   : "/products";

  // useEffect(() => {
  //   if (userInfo) {
  //     props.history.push(redirect);
  //   }
  // }, [userInfo, redirect, props.history]);

  // const signoutHandler = () => {
  //   dispatch(signout());
  // };

  return (
    <BrowserRouter>
      <Route exact path="/" component={HomeComponent} />
      <Route path="/signin" component={SignInComponent} />
      <Route path="/register" component={RegisterComponent} />
      <Route path="/products" component={ProductsComponent} />
    </BrowserRouter>
  );
}

export default App;
