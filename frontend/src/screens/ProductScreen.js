import React from "react";
import { useParams } from "react-router-dom";
import products from "../products";

const ProductScreen = () => {
  const { id: productID } = useParams();
  const product = products.find((p) => p._id === productID);

  return <div>ProductScreen</div>;
};

export default ProductScreen;
