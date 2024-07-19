import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertV from "../ValidationAlert/AlertV";

function Update() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  if (show) {
    setTimeout(() => {
      setShow(false);
      navigate("/");
    }, 3000);
  }

  let id = useParams().id;
  useEffect(
    () => {
      prefill();
    }, // eslint-disable-next-line
    []
  );

  async function prefill() {
    const res = await fetch(
      `http://localhost:5000/prefillformforupdate/${id}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setName(data.Name);
      setPrice(data.Price);
      setCategory(data.Category);
      setCompany(data.Company);
    } else {
      console.log("errr");
    }
  }
  async function updatedata() {
    const res = await fetch("http://localhost:5000/update/" + id, {
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify({
        Name: name,
        Price: price,
        Category: category,
        Company: company,
      }),
    });
    if (res.ok) {
      setShow(true);
      //navigate("/");
    }
  }

  return (
    <div className="signup-container">
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter Company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          updatedata();
        }}
      >
        Update
      </button>
      {show && <AlertV message="update successfull" />}
    </div>
  );
}

export default Update;
