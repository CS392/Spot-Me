import React, {Component} from "react";
import "../assets/css/loginPage.css";
export default class SignUp extends Component {
    render() {
        return (
            <main>
                <section>
                    <h1> Sign Up </h1>
                    <div>
                        <h4> User Name </h4>
                        <input type={"text"} placeholder={"User Name"}/>
                        <h4> Password </h4>
                        <input type={"text"} placeholder={"Password"}/>
                        <h4> Confirm Password </h4>
                        <input type={"text"} placeholder={"Re-enter your password"}/>
                    </div>
                    <button> Sign Up </button>
                    <hr/>
                    <p>
                        Already have an account? <a href={"/login"}> Login </a>
                    </p>
                </section>
            </main>
        );
    }
}
