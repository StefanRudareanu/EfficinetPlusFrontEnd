import { useEffect, useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import "./KanBan.css";
import Renderkanban from "./RenderKanBan";
import useLocalStorage from "./useLocal";
const KanBan = () => {
  const { id } = useParams();
  let [tasknr, setTasknr] = useState(0);
  let [name, setName] = useState("");
  let [listhold, setListHold] = useState([]);
  let [listongoing, setListOngoing] = useState([]);
  let [listdone, setListDone] = useState([]);
  let [changed, setChanged] = useState(0);
  let [progrees, setProgress] = useState(0);
  let local = useLocalStorage();
  let token = local.getStorage("auth-token");
  class OrderedData {
    constructor(data) {
      this.data = data;
    }
    holdata() {
      let result = this.data.filter((el) => {
        return el.state == "hold";
      });
      return result;
    }
    ongoingdata() {
      let result = this.data.filter((el) => {
        return el.state == "ongoing";
      });
      return result;
    }
    donedata() {
      let result = this.data.filter((el) => {
        return el.state == "done";
      });
      return result;
    }
    getProgress() {
      let done = this.data.filter((el) => {
        return el.state == "done";
      });
      let nrdone = 0;
      let alltask = 0;
      done.forEach((element) => {
        nrdone++;
      });
      this.data.forEach((element) => {
        alltask++;
      });

      return Math.round((nrdone * 100) / alltask);
    }
  }
  async function addtask(taskname) {
    return await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(taskname),
    });
  }
  async function getData() {
    let data = await fetch(`http://localhost:4000/api/tasks/subtasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    }).then((res) => {
      return res.json();
    });

    console.log(data);
    let instance = new OrderedData(data[0].subtask);
    let hold = instance.holdata();
    let ongoing = instance.ongoingdata();
    let done = instance.donedata();
    let percent = instance.getProgress();
    setListHold(hold);
    setListOngoing(ongoing);
    setListDone(done);
    setProgress(percent);
  }

  let taskadder = (taskname) => {
    try {
      addtask(taskname);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [tasknr, changed]);
  if (token) {
    return (
      <div className="Kanban">
        <div className="Holder">
          <div className="NewTask">
            <form
              className="AddT"
              onSubmit={(e) => {
                e.preventDefault();
                setTasknr(++tasknr);
                taskadder({ name: name, state: "hold" });
                console.log(name);
              }}
            >
              <button className="SubmitK" type="submit">
                Add
              </button>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="NewInput"
                type="text"
              ></input>
            </form>
          </div>
          <div className="List">
            <div className="Hold">
              <div className="insidehold">
                <h5>Task</h5>
              </div>
              <Renderkanban
                tasks={listhold}
                id={id}
                setChanged={setChanged}
                changed={changed}
              ></Renderkanban>
            </div>
            <div className="Doing">
              <div className="insidehold">
                <h5>Doing</h5>
              </div>
              <Renderkanban
                tasks={listongoing}
                id={id}
                setChanged={setChanged}
                changed={changed}
              ></Renderkanban>
            </div>
            <div className="Done">
              <div className="insidehold">
                <h5>Done</h5>
              </div>
              <Renderkanban
                tasks={listdone}
                id={id}
                setChanged={setChanged}
                changed={changed}
              ></Renderkanban>
            </div>
          </div>
          <div className="Outside">
            <div
              className="InsideProgress"
              style={{ width: progrees + "%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to={"/"}></Redirect>;
  }
};
export default KanBan;
