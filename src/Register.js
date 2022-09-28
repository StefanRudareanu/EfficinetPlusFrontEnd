import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";
import useLocalStorage from "./useLocal";
import Button from "@mui/material/Button";

const Register = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  let local = useLocalStorage();
  let history = useHistory();
  async function register(data) {
    return await fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  async function userObj(token) {
    return await fetch("http://localhost:4000/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
  }
  return (
    <div className="RegisterCard">
      <h2 className="FormHeader">Register</h2>
      <form
        className="RegisterForm"
        onSubmit={async (e) => {
          e.preventDefault();
          let data = { username: username, email: email, password: password };
          try {
            let response = await register(data);
            if (response.status != 400) {
              history.push("/");
            } else {
              let res = await response.json();
              console.log(res);
            }
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <label className="RLabel">Username</label>
        <input
          required
          className="RegisterInp"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <label className="RLabel">Email</label>
        <input
          required
          className="RegisterInp"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label className="RLabel">Password</label>
        <input
          required
          type="password"
          className="RegisterInp"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <Button
          // className="RegBut" type="submit"
          variant="contained"
          size="50%"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
export default Register;
