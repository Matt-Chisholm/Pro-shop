import express from "express";
import products from "./data/products.js";

const port = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
