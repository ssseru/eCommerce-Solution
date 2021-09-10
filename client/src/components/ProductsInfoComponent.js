import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
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
    <Container>
      {!productDetails.loading ? (
        <p>{product.brand}</p>
      ) : (
        <p>Loading Info...</p>
      )}
    </Container>
  );
}

export default ProductsInfo;
