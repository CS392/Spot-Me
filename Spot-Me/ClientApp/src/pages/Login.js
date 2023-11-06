import React, {Component} from "react";
import "../assets/css/loginPage.css";
export default class Login extends Component {
    render() {
        return (
            <main> 
                <section>
                    <h1> Login </h1>
                    <div>
                        <h4> User Name </h4>
                        <input type={"text"} placeholder={"User Name"}/>
                        <h4> Password </h4>
                        <input type={"text"} placeholder={"Password"}/>
                    </div>
                    <button> Login </button>
                    <hr/>
                    <p> 
                        No account yet? <a href={"/signup"}> Sign Up </a>
                    </p>
                </section>
            </main>
        );
    }
}
