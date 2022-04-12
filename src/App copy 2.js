import axios from "axios";
import React from "react";
import "./App.css";
const baseURL = "http://localhost:3000";





export function App() {
  const [Data, setData] = React.useState([]);
  const [Clock, setclock] = React.useState(new Date())
  React.useEffect(() =>
    async () => {
      const response = await axios.get(baseURL + "/api/registration").catch(err => console.log(err))
      const regs = await response.data


      console.log(regs);
      setData(regs)
    },
    [])




  return (
    <div>
      <h2>It is {Clock.toLocaleTimeString()}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Course Name</th>
            <th>Course ID</th>
            <th>Reg ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {Data.map(data =>
            <tr>
              <th>{data.student[0].name}</th>
              <th>{data.student[0]._id}</th>
              <th>{data.course[0].name}</th>
              <th>{data.course[0]._id}</th>
              <th>{data._id}</th>
              <th>{data.date}</th>
            </tr>
          )}


        </tbody>
      </table>
    </div>
  )
}

export default App;
