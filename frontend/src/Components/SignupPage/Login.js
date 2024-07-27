import React, { useEffect, useState } from "react";
import AlertV from "../ValidationAlert/AlertV";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth)
    {
        navigate('/');
    }
  });

  async function submitdata() {
    console.log(email+password);
    let res = await fetch("https://ecommerce-backend-q7n6.onrender.com/login",{
        'method':'post',
        'headers':{'content-type':'application/json'},
        'body': JSON.stringify({"Email":email,"Password":password})
    });
    let data = await res.json();
    console.log(data);
    if(res.ok)
    {
        console.log("sent success & checked");
        localStorage.setItem('token',JSON.stringify(data.auth))
        localStorage.setItem('user',JSON.stringify(data.user))
        navigate("/");
    }
  }
  return (
    <div className="signup-container">
        <h1>Login Form</h1>
      <input
        type="email"
        placeholder="enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={() => {
          if (email && password) {
            setValidate(false);
            submitdata();
          } else {
            console.log("err");
            setValidate(true);
          }
        }}>submit</button>
        {validate && <AlertV message="Fields are empty" />}
    </div>
  );
}

export default Login;
