import Axios from "axios";
import React from "react";
import { createRoot } from 'react-dom/client';

class App extends React.Component {
    state = {

        registration: []
    }

    constructor() {
        super()

        Axios({
            method: "GET",
            baseURL: "http://localhost:3000",
            url: "/api/registration",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(res.data);

                this.state = { registration: res.data }
                this.state.registration
                    .map(reg =>
                        console.log(reg.student_ID)
                    )
                console.log(this.state.registration[0].student_ID);
            })



    }
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Student Id</th>
                            <th>Student Name</th>
                            <th>Course Id</th>
                            <th>Course Name</th>
                            <th>Date</th>
                            <th>Register Id</th>
                        </tr>

                    </thead>


                    <tbody>

                        <tr>
                            <th></th>
                            <th>Student Name</th>
                            <th>Course Id</th>
                            <th>Course Name</th>
                            <th>Date</th>
                            <th>Register Id</th>
                        </tr>
                    </tbody>

                </table>
            </div >

        )

    }

}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);