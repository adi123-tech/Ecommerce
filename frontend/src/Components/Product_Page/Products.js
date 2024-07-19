import React from "react";
import AlertV from "../ValidationAlert/AlertV";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [res, setRes] = useState([]);
  const [data, setData] = useState(false);

  async function getList() {
    const data = await fetch("http://localhost:5000/listproduct", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const result = await data.json();

    if (result.length <= 0) {
      setData(true);
      setRes(result);
    } else {
      setRes(result);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  async function deleteProduct(id) {
    const data = await fetch(`http://localhost:5000/deleteproduct/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    if (data.ok) {
      getList();
    } else {
      alert("fail to delete");
    }
  }

  async function search(e) {
    let key = e.target.value;
    if (key === "") {
      getList();
      setData(false);
    }
    const res = await fetch(`http://localhost:5000/search/${key}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await res.json();
    if (data.length <= 0) {
      setData(true);
      setRes(data);
    } else {
      setRes(data);
    }
  }

  return (
    <div className="products">
      <h1>Products</h1>
      <div className="signup-container">
        <input type="text" placeholder="search any product" onChange={search} />
        <br />
      </div>
      <ul className="product-ul">
        {res.map((item, index) => (
          <li key={index} style={{ backgroundColor: "grey" }}>
            <img
              key={`img${index}`}
              src="/Ecomm-logo.jpg"
              alt=""
              style={{ height: "160px", borderRadius: "50%" }}
            />
            <br />
            <span
              key={`name${index}`}
              style={{
                color: "#282C34",
                fontSize: "2rem",
                fontWeight: "bolder",
              }}
            >
              {item.Name}
            </span>
            <br />
            Price : {item.Price} Rs.
            <br />
            Category : {item.Category}
            <br />
            Company : {item.Company}
            <br />
            <button
              onClick={() => {
                deleteProduct(item._id);
              }}
            >
              Delete Product
            </button>
            <button>
              <Link
                to={"/update/" + item._id}
                style={{ textDecoration: "none", color: "black" }}
              >
                Update
              </Link>
            </button>
          </li>
        ))}
      </ul>
      {data && <AlertV message="No data" />}
    </div>
  );
}

export default Products;
