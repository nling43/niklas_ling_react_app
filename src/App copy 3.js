import axios from "axios";
import React from "react";
import "./App.css";
const baseURL = "http://localhost:3000";



class App extends React.Component {

  /*export function App() {
    const [Data, setData] = React.useState([]);
    const [Clock, setclock] = React.useState(new Date())
    React.useEffect(() =>
      async () => {
        const response = await axios.get(baseURL + "/api/registration").catch(err => console.log(err))
        const regs = await response.data
  
  
        console.log(regs);
        setData(regs)
        tick()
      },
      [])
  
  
    function tick() {
      setclock(new Date())
    }
  */

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
    console.log(this.state.register);
  }
  render() {
    return (
      <div>
        {
          this.state.register.map(reg =>
            <h1>{reg.date}</h1>
          )

        }

      </div>
    )
  }
}
export default App;
