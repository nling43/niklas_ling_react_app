import axios from "axios";
import React from "react";
const baseURL = "http://localhost:3000";
const center = {
  "display": "grid",
  "placeContent": "center"
}

const table = {
  "borderSpacing": "2rem"

}

class App extends React.Component {

  constructor() {
    super()
    this.state = { register: [] };
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  async tick() {
    const response = await axios.get(baseURL + "/api/registration").catch(err => console.log(err))
    const regs = await response.data
    this.setState({ register: regs })
  }


  sortedDescending = () => this.state.register.sort((a, b) => {
    return a.student[0].name - b.student[0].name;
  });

  getButtonId = (e) => {
    this.setState({
      register: sortedDescending()
    })
    console.log(this.state.register);

  }
  render() {

    return (
      <div style={center}>
        <table style={table}>
          <thead >
            <tr>
              <th ><button id="student[0].name" onClick={this.getButtonId}>Name</button></th>
              <th><button id="student[0]._id" onClick={this.getButtonId}>Student ID</button></th>
              <th><button id="course[0].name" onClick={this.getButtonId}>Course Name</button></th>
              <th><button id="course[0]._id" onClick={this.getButtonId} >Course ID</button></th>
              <th><button id="_id" onClick={this.getButtonId} >Reg ID</button></th>
              <th><button id="date" onClick={this.getButtonId} >Date</button></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.register.map(reg =>
                <tr key={reg._id}>
                  <th>{reg.student[0].name}</th>
                  <th>{reg.student[0]._id}</th>
                  <th>{reg.course[0].name}</th>
                  <th>{reg.course[0]._id}</th>
                  <th>{reg._id}</th>
                  <th>{reg.date}</th>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}
export default App;
