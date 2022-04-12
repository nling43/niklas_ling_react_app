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
    this.state = {
      register: [],
      sortmethod: " "
    }
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      500
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.register.length === nextState.register.length && this.state.sortmethod != nextState.sortmethod) {
      return false
    }
    return (true)
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  async tick() {
    const response = await axios.get(baseURL + "/api/registration").catch(err => console.log(err))
    const regs = await response.data
    const myData = [].concat(regs)
    switch (this.state.sortmethod) {
      case "date": myData.sort((a, b) => a.date > b.date ? 1 : -1)
        break;
      case "_id": myData.sort((a, b) => a._id > b._id ? 1 : -1)
        break;
      case "studentName": myData.sort((a, b) => a.student[0].name > b.student[0].name ? 1 : -1)
        break;
      case "studentId": myData.sort((a, b) => a.student[0]._id > b.student[0]._id ? 1 : -1)
        break;
      case "courseName": myData.sort((a, b) => a.course[0].name > b.course[0].name ? 1 : -1)
        break;
      case "courseId": myData.sort((a, b) => a.course[0]._id > b.course[0]._id ? 1 : -1)
        break;
      default:
    }
    this.setState({ register: myData })
  }




  getButtonId = (e) => {
    this.setState({ sortmethod: e.target.id })
  }
  render() {

    return (
      <div style={center}>
        <table style={table}>
          <thead >
            <tr>
              <th ><button id="studentName" onClick={this.getButtonId}>Name</button></th>
              <th><button id="studentId" onClick={this.getButtonId}>Student ID</button></th>
              <th><button id="courseName" onClick={this.getButtonId}>Course Name</button></th>
              <th><button id="courseId" onClick={this.getButtonId} >Course ID</button></th>
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
                  <th>{new Date(reg.date).toLocaleDateString("en-US") + ", " + new Date(reg.date).toLocaleTimeString("en-US")}</th>
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
