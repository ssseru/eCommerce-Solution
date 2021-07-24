import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeComponent from "./components/HomeComponent";
function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <BrowserRouter>
      <Route exact path="/" component={HomeComponent} />
      {/* <Route path="/signin" component={SignInComponent} /> */}
      {/* <Route path="/register" component={RegisterComponent} /> */}
    </BrowserRouter>
  );
}

export default App;
