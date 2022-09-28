import "./App.css";
import Navbar from "./Navbar";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import CreateTask from "./CreateTask";
import YourTask from "./YourTask";
import Home from "./Home";
import KanBan from "./KanBan";
import LogIn from "./LogIn";
import Register from "./Register";
function App() {
  return (
    <Router>
      <div className="App">
        <Route
          exact
          path={["/Home", "/CreateTask", "/YourTask", "/KanBan/:id"]}
        >
          <Navbar />
        </Route>
        <div className="Content">
          <Route exact path="/register">
            <Register></Register>
          </Route>
          <Route exact path="/">
            <LogIn></LogIn>
          </Route>
          <Route exact path="/Home">
            {" "}
            <Home></Home>
          </Route>
          <Route exact path="/CreateTask">
            <CreateTask></CreateTask>
          </Route>
          <Route exact path="/YourTask">
            <YourTask></YourTask>
          </Route>
          <Route exact path="/Kanban/:id">
            <KanBan />
          </Route>
        </div>
      </div>
    </Router>
  );
}
export default App;
