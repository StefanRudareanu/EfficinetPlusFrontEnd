import "./Navbar.css";
import { Link, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";

const Navbar = () => {
  return (
    <div className="Navigation">
      <h1>EfficientPlus</h1>
      <Link to={"/Home"}>Home</Link>
      <Link to={"/CreateTask"}>CreateTask</Link>
      <Link to={"/YourTask"}>Your task</Link>
    </div>
  );
};
export default Navbar;
