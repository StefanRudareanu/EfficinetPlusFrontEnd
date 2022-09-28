import useLocalStorage from "./useLocal";

const Renderkanban = (props) => {
  const tasks = Array(props.tasks);
  let changed = props.changed;
  let id = props.id;
  const setChanged = props.setChanged;
  let token = useLocalStorage().getStorage("auth-token");
  let trimTask = (data, taskid) => {
    fetch(`http://localhost:4000/api/tasks/subtasks/${id}/${taskid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <div className="stay">
      {tasks[0].map((ts) => (
        <div className="stayinside" key={ts._id}>
          <p>{ts.name}</p>
          <button
            onClick={() => {
              if (ts.state == "hold") {
                setChanged(++changed);
                let data = { state: "ongoing" };
                trimTask(data, ts._id);
              } else if (ts.state == "ongoing") {
                setChanged(++changed);
                let data = { state: "done" };
                trimTask(data, ts._id);
              }
            }}
          >
            Next
          </button>
        </div>
      ))}
    </div>
  );
};
export default Renderkanban;
