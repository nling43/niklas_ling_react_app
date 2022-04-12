import axios from "axios";
import React from "react";
import "./App.css";
const baseURL = "http://localhost:3000";
export function App() {
  const [regs, setRegs] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL + "/api/registration").then((response) => {
      setRegs(response.data);
    });
  }, []);

  if (!regs) return null;
  return (
    <div>

      <div className="tableHead">

        <button>Student Id</button>
        <button>Student Name</button>
        <button>Course Id</button>
        <button>Course Name</button>
        <button>Date</button>
        <button>Register Id</button>


      </div>


      <div className="tableBody">
        {regs.map(reg =>
          <div>
            <h1>{reg.student_ID}</h1>
            <h1>Student Name</h1>
            <h1>{reg.course_ID}</h1>
            <h1>Course Name</h1>
            <h1>{reg.date}</h1>
            <h1>{reg._id}</h1>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
