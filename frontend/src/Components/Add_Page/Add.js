import React, { useState } from "react";
import AlertV from "../ValidationAlert/AlertV";

function Add() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [validate, setValidate] = useState(false);

  async function addProduct() {
    const userid = JSON.parse(localStorage.getItem("user"));
    const add = await fetch("https://ecommerce-backend-q7n6.onrender.com/addproduct", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify({
        Name: name,
        Price: price,
        Category: category,
        Company: company,
        userId: userid._id,
      }),
    });
    if (add.ok) {
      alert("Successfully added product");
      setName("");
      setPrice("");
      setCategory("");
      setCompany("");
    } else {
      alert("Not added");
    }
  }

  if (validate) {
    setTimeout(() => {
      setValidate(false);
    }, 3000);
  }

  return (
    <div className="signup-container">
      <input
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter product category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter product company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          if (name && price && category && company) {
            addProduct();
          } else {
            setValidate(true);
          }
        }}
      >
        Add Product
      </button>
      {validate && <AlertV message="fields are empty" />}
    </div>
  );
}

export default Add;
