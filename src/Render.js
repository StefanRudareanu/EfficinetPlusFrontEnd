import { useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "./useLocal";

const Render = (props) => {
  let task = props.task;
  let changed = props.changed;
  let setChanged = props.setChanged;
  let username = useLocalStorage().getStorage("username");
  let token = useLocalStorage().getStorage("auth-token");
  let [view, setView] = useState("default");
  async function deleteTask(url) {
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    return response;
  }
  return (
    <div className="RenderContainer">
      {task.map((ts) => (
        <div className="ContainerTask" key={ts._id}>
          <div
            className="Gradient"
            onFocus={() => {
              console.log("True");
              setView("default");
            }}
            onAbort={() => {
              setView("none");
              console.log("False");
            }}
          >
            <Link
              className="DelB"
              style={{ display: view }}
              onClick={() => {
                let url = `http://localhost:4000/api/tasks/${username}/${ts._id}`;
                try {
                  deleteTask(url);
                  setChanged(++changed);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              x
            </Link>
          </div>
          <Link className="Descri" to={`/KanBan/${ts._id}`}>
            {ts.name}
          </Link>
          <p>{ts.description}</p>
        </div>
      ))}
    </div>
  );
};
export default Render;
