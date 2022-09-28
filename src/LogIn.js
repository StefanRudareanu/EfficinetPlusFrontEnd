import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./LogIn.css";
import useLocalStorage from "./useLocal";
const LogIn = () => {
  let history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [invalidlog, setInvalidlog] = useState("");
  let local = useLocalStorage();
  let token = local.getStorage("auth-token");
  let auth = async (data) => {
    return await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  let userobject = async (token) => {
    return await fetch("http://localhost:4000/api/users/me", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "auth-token": token,
      }),
    });
  };
  if (token) {
    return <Redirect to="/Home"></Redirect>;
  } else {
    return (
      <div className="LogInCard">
        <div className="LeftLogin">
          <img className="Head" src={require("./loging.png")} />
        </div>
        <div className="LogF">
          <h2 className="FormHeader">Log In</h2>
          <form
            className="LogInForm"
            onSubmit={async (e) => {
              e.preventDefault();
              let data = { email: email, password: password };
              try {
                let response = await auth(data);
                if (response.status != 400) {
                  let token = await response.json();
                  let object = await userobject(token.token);
                  let user = await object.json();
                  console.log(user);
                  local.saveStorage("auth-token", token.token);
                  local.saveStorage("username", user.username);
                  history.push(`/Home`);
                } else {
                  setInvalidlog("Invalid Password or Email");
                }
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            <div className="insideform">
              <label className="LB">E-mail</label>
              <input
                className="Username"
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              ></input>
            </div>
            <div className="insideform">
              <label className="LB">Password</label>
              <input
                className="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              ></input>
            </div>
            <button className="Logbtn" type="submit">
              Log In
            </button>
          </form>
          <button
            className="Logbtn"
            onClick={() => {
              history.push("/register");
            }}
          >
            Register
          </button>
          <p className="invalid mail" color="blue">
            {invalidlog}
          </p>
        </div>
      </div>
    );
  }
};
export default LogIn;
