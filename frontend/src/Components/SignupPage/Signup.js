import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertV from "../ValidationAlert/AlertV";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  if (validate === true) {
    setTimeout(() => {
      setValidate(false);
    }, 3000);
  }

  async function submitdata() {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ Name: name, Email: email, Password: password }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      localStorage.setItem("token", JSON.stringify(data.auth));
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    }
  }

  return (
    <div className="signup-container">
      <h1>Sign Up form</h1>
      <input
        type="text"
        placeholder="Enter your name"
        id="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <br />
      <input
        type="email"
        placeholder="Enter your email"
        id="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br />
      <input
        type="password"
        placeholder="Set Password"
        id="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <br />
      <br />
      <button
        onClick={() => {
          if (name && email && password) {
            setValidate(false);
            submitdata();
          } else {
            console.log("err");
            setValidate(true);
          }
        }}
      >
        Sign Up
      </button>
      {validate && <AlertV message="Fields are empty" />}
    </div>
  );
}

export default Signup;
