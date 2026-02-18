import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fetch products when page loads
  useEffect(() => {
    axios.get("http://localhost:8080/products")
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.error("Error fetching products:", error);
        });
  }, []);

  // Add new product
  const addProduct = () => {
    axios.post("http://localhost:8080/products", {
      productName,
      price,
      quantity
    }).then(response => {
      setProducts([...products, response.data]);
      setProductName("");
      setPrice("");
      setQuantity("");
    });
  };

  return (
      <div style={{padding: "20px" }}>
        <h1>Inventory Manager</h1>

        <input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
        />

        <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />

        <input
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
        />

        <button onClick={addProduct}>
          Add Product
        </button>

        <hr />

        <h2>Product List</h2>
        <ul>
          {products.map(product => (
              <li key={product.id}>
                {product.productName} - ₹{product.price} - Qty: {product.quantity}
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
