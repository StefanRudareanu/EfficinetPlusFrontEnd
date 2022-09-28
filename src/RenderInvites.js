import Render from "./Render";
import useLocalStorage from "./useLocal";
import Button from "@mui/material/Button";
const RenderInvites = (props) => {
  let invites = Array(props.invites);
  let invchange = props.invchange;
  let setInvchange = props.setInvchange;
  let username = useLocalStorage().getStorage("username");
  let token = useLocalStorage().getStorage("auth-token");
  let deleteinv = async (invid) => {
    return await fetch(`http://localhost:4000/api/invitation/${invid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
  };
  let accepttask = async (id) => {
    let data = { username: username };
    return await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <div className="InviteList">
      <h2 className="IviteHead">Invite List</h2>
      <div className="InviteHolder">
        {invites[0].map((inv) => (
          <div className="InviteCard" key={inv._id}>
            <div className="Info">
              <div className="UsernameInfo">From:{inv.sender}</div>
              <div className="TasknameInfo">TaskName:{inv.taskname}</div>
            </div>
            <button
              variant="contained"
              color="succes"
              className="Accept"
              onClick={async () => {
                await accepttask(inv.taskid);
                await deleteinv(inv._id);
                setInvchange(++invchange);
              }}
            >
              Accept
            </button>
            <button
              variant="contained"
              color="error"
              className="Reject"
              onClick={async () => {
                await deleteinv(inv._id);
                setInvchange(++invchange);
              }}
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RenderInvites;
