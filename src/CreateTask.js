import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./CreateTask.css";
import useLocalStorage from "./useLocal";
const CreateTask =()=>{
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  let subtask =[];
  let local=useLocalStorage();
  let token=local.getStorage('auth-token');
  let [task, setTask] = useState(0);
  let history=useHistory();
  useEffect(() => {
    let username=local.getStorage('username');
    let data = { name:name, description:description,subtask:subtask,authors:username,delright:username};
    if (task != 0) {
      fetch('http://localhost:4000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':local.getStorage('auth-token')
        },
        body: JSON.stringify(data)}
      )
      history.push('/YourTask');    
    }
  }, [task]);
  if(token){
  return (
    <div className="Container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTask(++task);
          
        }}
        className="Input"
      >
        <label className="Taskn">Task Name</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            console.log(name);
          }}
          required
          className="Name"
          type="text"
        ></input>
        <label className="Taskd">Task description</label>
        <input
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            console.log(description);
          }}
          className="Description"
          type="text"
        ></input>
        <button className="Submit" type="submit">
          Add task
        </button>
      </form>
    </div>
  );
        }
        else {
          return <Redirect to={"/"}></Redirect>
        }
};
export default CreateTask;
