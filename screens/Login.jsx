import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/lib/init-firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function checkLogin(e) {
    e.preventDefault()
    setError("")
    const ref = doc(db, "users", email);
    getDoc(ref).then(response => {

      var un = response.data().email;
      var pw = response.data().password;

      if (un === email) {
        if (pw === password) {
          localStorage.setItem("username", email);
          switch (response.data().role) {
            case "customer": goHome();
              break;
            case "clerk": goClerck();
              break;
            case "admin": goAdmin();
              break;
            case "pm": goPm();
              break;
            case "ca": goCa();
              break;
          }
        } else {
          setError("incorrect password")
        }
      } else {
        setError("incorrect username")
      }

    }).catch((error) => { setError("No User Found") })
  }

  function goClerck() {
    navigate("/clerk")
  }

  function goAdmin() {
    navigate("/admin")
  }

  function goPm() {
    navigate("/pm")
  }

  function goCa() {
    navigate("/ca")
  }

  function goHome() {
    navigate("/")
  }

  function goRegister() {
    navigate("/register")
  }

  return (
    <div>
      <h2 className={"bg-primary text-white text-center p-5"}>Welcome Login</h2>
      <div className="d-flex justify-content-center m-5">
        <div className={"card p-3 w-50"}>
          <form >
            <div className="mb-3">
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
            </div>
            <label className="form-label text-danger">{error}</label>
          </form>
          <button type="submit" onClick={() => goRegister()} className="btn btn-secondary mt-3 btn-sm">Create New Account</button>
          <button type="submit" onClick={(e) => checkLogin(e)} className="btn btn-primary mt-1">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
