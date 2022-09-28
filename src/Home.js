import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "./Home.css";
import useLocalStorage from "./useLocal";
import RenderInvites from "./RenderInvites";
import { Redirect } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);
const Home = () => {
  let [chartLabels, setLabes] = useState([]);
  let [chartValues, setchartValues] = useState([]);
  let username = useLocalStorage().getStorage("username");
  let token = useLocalStorage().getStorage("auth-token");
  let [invchange, setInvchange] = useState(0);
  let [invites, setInvites] = useState([]);
  async function getInvites() {
    let response = await fetch(
      `http://localhost:4000/api/invitation/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    ).then((res) => {
      return res.json();
    });
    setInvites(response);
  }
  async function getAlltasksPrepareChar() {
    let response = await fetch(`http://localhost:4000/api/tasks/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    }).then((res) => {
      return res.json();
    });
    let chartLabels = [];
    let chartValues = [];
    console.log(Array(response));
    Array(response)[0].forEach((e) => {
      let done = 0;
      Array(e.subtask)[0].forEach((elm) => {
        if (elm.state == "done") done++;
      });
      let numberotasks = Array(e.subtask)[0].length;
      console.log(numberotasks);
      let value = Math.round((done * 100) / numberotasks);
      if (value > 0) {
        chartValues.push(value);
        chartLabels.push(e.name);
      }
    });
    setLabes(chartLabels);
    setchartValues(chartValues);
  }
  useEffect(() => {
    try {
      getAlltasksPrepareChar();
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    try {
      getInvites();
      console.log(invites);
    } catch (error) {
      console.log(error.message);
    }
  }, [invchange]);
  let data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Number of Subtask done for each Task",
        data: chartValues,
        backgroundColor: [
          "rgba(251, 107, 15)",
          "rgba(155, 155, 133)",
          "rgba(207, 32, 245)",
          "rgba(247, 170, 174)",
          "rgba(155, 226, 113)",
          "rgba(120, 54, 228)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  if (token) {
    return (
      <div className="DisplayChart">
        <div className="Chart">
          <Pie data={data} />
        </div>
        <RenderInvites
          invites={invites}
          invchange={invchange}
          setInvchange={setInvchange}
        ></RenderInvites>
      </div>
    );
  } else {
    return <Redirect to={"/"}></Redirect>;
  }
};

export default Home;
