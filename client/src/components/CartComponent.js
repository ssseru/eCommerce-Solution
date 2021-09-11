import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import { addToCart, removeFromCart } from "../actions/cartAction";

function CartComponent(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }

  const productId = props.match.params.id;

  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Shopping Cart </h1>
          <br />
          <hr />
          {cartItems.length === 0 ? (
            <p>
              Cart is empty. <Link to="/"> Go Shopping</Link>
            </p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <Row>
                    <Col>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="small"
                        width="50%"
                        height="50%"
                      />
                    </Col>
                    <Col className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col>
                      <Input
                        type="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Input>
                    </Col>
                    <Col>Rs.{item.price}</Col>
                    <Col>
                      <Button
                        type="button"
                        color="danger"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </li>
              ))}
            </ul>
          )}
        </Col>
        <Col>
          <Card>
            <CardHeader>Summary</CardHeader>
            <CardBody>
              No of Items:
              <strong> {cartItems.reduce((a, c) => a + c.qty, 0)}</strong>
              <br />
              Subtotal :
              <strong>
                {" "}
                Rs.
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </strong>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CartComponent;
