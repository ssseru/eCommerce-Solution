import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Media, Col } from "reactstrap";
import { detailsProduct } from "../actions/productAction";

function ProductsInfo(props) {
  const dispatch = useDispatch();

  const productId = props.match.params.id;

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  // decontruct product, loading, error from productDetails
  const { product } = productDetails;
  // console.log(product);
  console.log("Product details:", productDetails);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return (
    <>
      {!productDetails.loading ? (
        <Container>
          <Row>
            <Link to="/"> Back To Catalog</Link>
          </Row>
          <Row>
            <Col>
              <img
                className="large"
                src={product.image}
                alt={product.name}
                width="100%"
                height="100%"
              />
            </Col>
            <Col>
              <h4>{product.brand}</h4>
              <h6>{product.name}</h6>
              <p>{product.description}</p>
              <hr />
              <p>In stock: {product.countInStock}</p>
              <p>
                Price: Rs.<strong>{product.price}</strong>
              </p>
            </Col>
          </Row>
        </Container>
      ) : (
        <p>Loading Info...</p>
      )}
    </>
  );
}

export default ProductsInfo;
