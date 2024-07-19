import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div className="navbar">
      <img src="/Ecomm-logo.jpg" alt="logo"/>
      {auth ? (
        <ul className="nav-ul">
          <div>E comm Dashboard </div>
          <li>
            <Link to="/" className="no-underline">
              Products
            </Link>
          </li>
          <li>
            <Link to="/add" className="no-underline">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/update" className="no-underline">
              Update Product
            </Link>
          </li>
          <li>
            <Link to="/profile" className="no-underline">
              Profile
            </Link>
          </li>

          <li>
            <Link onClick={logout} to="/signup" className="no-underline">
              LogOut
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <div>E comm Dashboard </div>
          <li>
            <Link to="/signup" className="no-underline">
              SignUp
            </Link>
          </li>
          <li>
            <Link to="/login" className="no-underline">
              LogIn
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
