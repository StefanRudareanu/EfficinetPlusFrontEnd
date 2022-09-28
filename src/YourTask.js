import { useEffect, useState } from "react";
import "./YourTask.css";
import Render from "./Render";
import useLocalStorage from "./useLocal";
import { Redirect } from "react-router-dom";
const YourTask = () => {
  let [date, setData] = useState([]);
  let [changed, setChanged] = useState(0);
  let local = useLocalStorage();
  let token = local.getStorage("auth-token");
  const [taskname, setTaskname] = useState(" ");
  let [username, setUsername] = useState("");
  let [options, setOptions] = useState([]);
  let [taskid, setTaskid] = useState("");
  let localusername = local.getStorage("username");
  let createivite = async () => {
    let data = {
      taskname: taskname,
      reciver: username,
      sender: localusername,
      taskid: taskid,
    };
    return await fetch("http://localhost:4000/api/invitation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(data),
    });
  };
  useEffect(() => {
    let username = local.getStorage("username");
    let token = local.getStorage("auth-token");
    fetch(`http://localhost:4000/api/tasks/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        let options = data.filter((e) => {
          return e.delright == username;
        });
        setOptions(options);
      });
  }, [changed]);

  if (token) {
    return (
      <div className="Cont">
        <div className="AddPeople">
          <select
            className="selectTag"
            onChange={(e) => {
              setTaskname(e.target.value);
              let index = e.target.options.selectedIndex;
              let id = e.target.options[index].getAttribute("data-key");
              setTaskid(id);
            }}
            required
          >
            <option className="Opt" selected disabled hidden>
              Choose a task
            </option>
            {options.map((e) => (
              <option className="Opt" key={e._id} data-key={e._id}>
                {e.name}
              </option>
            ))}
          </select>
          <form
            className="InviteForm"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await createivite();
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            <input
              className="InviteInp"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            ></input>
            <button className="InviteBtn" type="submit">
              Invite
            </button>
          </form>
        </div>
        {<Render task={date} changed={changed} setChanged={setChanged} />}
      </div>
    );
  } else {
    return <Redirect to={"/"}></Redirect>;
  }
};
export default YourTask;
