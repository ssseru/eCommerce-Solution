import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userAction";
import {
  Container,
  Input,
  Label,
  Form,
  Col,
  Button,
  FormGroup,
} from "reactstrap";
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';

function SignInComponent(props) {
  // set states for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redirect user to shipping screen after sign in
  //first check if there is redirect query param on the url
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/products";

  //get userInfo from redux store
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  // handle login form submit
  const submitHandler = (e) => {
    e.preventDefault();
    // signin action here
    dispatch(signin(email, password));
  };

  // if userInfo, redirect user on page load
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, redirect, props.history]);

  return (
    <Container>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup row>
          <Label for="email" md={2}>
            Email:{" "}
          </Label>
          <Col md={10}>
            <Input
              type="email"
              id="email"
              placeholder="Enter email senpai"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" md={2}>
            Password:{" "}
          </Label>
          <Col md={10}>
            <Input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </FormGroup>
        <br />
        <br />
        <Button type="submit">Sign In</Button>
        <br />
      </Form>
      <div>
        New customer? <Link to={`/register`}>Create your account</Link>
      </div>
    </Container>
  );
}

export default SignInComponent;
