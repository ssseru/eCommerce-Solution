import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeComponent from "./components/HomeComponent";
import SignInComponent from "./components/SignInComponent";
import RegisterComponent from "./components/RegisterComponent";
import { signout } from "./actions/userAction";
import { use } from "passport";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log(userInfo);
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      {userInfo ? (
        <div>
          <p>User's Name: {userInfo.name}</p>
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
    </BrowserRouter>
  );
}

export default App;
