import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import {
  Container,
  Input,
  Label,
  Form,
  Col,
  Button,
  FormGroup,
} from "reactstrap";
// import LoadingBox from "../components/LoadingBox";
// import MessageBox from "../components/MessageBox";

function RegisterComponent(props) {
  // set states for email and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // redirect user to shipping screen after sign in
  //first check if there is redirect query param on the url
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  //get userInfo from redux store
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  // handle login form submit
  const submitHandler = (e) => {
    e.preventDefault();
    // check if password and confirm password match
    if (password !== confirmPassword) {
      alert("password and confirm password do not match");
    } else {
      // register action here
      dispatch(register(name, email, password));
    }
  };

  // if userInfo, redirect user on page load
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, redirect, props.history]);

  return (
    <>
      <Container>
        <Form onSubmit={submitHandler}>
          <div>
            <h4>Create An Account</h4>
            {/* {loading && <LoadingBox />}
          {error && <MessageBox variant="danger">{error}</MessageBox>} */}
          </div>
          <FormGroup row>
            <Label for="name" md={2}>
              Name:{" "}
            </Label>
            <Col md={10}>
              <Input
                type="text"
                id="name"
                placeholder="Enter name senpai"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </FormGroup>
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
          <FormGroup row>
            <Label for="confirmPassword" md={2}>
              Confirm Password:{" "}
            </Label>
            <Col md={10}>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Enter password again"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
          </FormGroup>
          <Button type="submit" color="success">
            Register
          </Button>
        </Form>
        <div>
          Already a customer? <Link to={`/signin`}>SignIN</Link>
        </div>
      </Container>
    </>
  );
}

export default RegisterComponent;
