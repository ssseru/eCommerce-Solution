import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userAction";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productAction";
import { Col, Container, Row } from "reactstrap";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";

function ProductsComponent(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  var listOfProducts = [];

  const productList = useSelector((state) => state.productList);
  if (productList.loading == false) {
    listOfProducts = [...productList.products];
  }
  // console.log(listOfProducts);
  // console.log("productlist:", productList);
  // console.log("products:", products);

  const user = jwt_decode(userInfo.token.substring(7));

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const imgStyle = {
    height: 200,
    width: 200,
  };

  useEffect(() => {
    // console.log("dispatch");
    dispatch(listProducts());
  }, []);
  // console.log("products::", products.length);

  const lp = listOfProducts.map((product) => (
    <Col md={4}>
      <Container>
        <Card>
          <Link to={`/products/${product._id}`}>
            {console.log(`/products/${product._id}`)}
            <CardImg
              style={imgStyle}
              bottom
              src={product.image}
              alt={product.name}
            />
          </Link>
          <CardBody>
            <Link to={`/products/${product._id}`}>
              <CardTitle tag="h5">{product.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {product.brand}
              </CardSubtitle>
              <CardText>{product.category}</CardText>
            </Link>
          </CardBody>
        </Card>
      </Container>
    </Col>
  ));

  return (
    <Container>
      <div className="lead">
        Welcome <strong>{user.name}</strong>,
      </div>
      <Row>{lp}</Row>
    </Container>
  );
}

export default ProductsComponent;
