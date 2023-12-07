import React, {Component} from "react";
import "../assets/css/loginPage.css";
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    // If user is already logged in, redirect to home page
    componentDidMount() {
        if (localStorage.getItem("user") !== null) {
            window.location.href = "/";
        }
    }

    // Check if user exists in database and if so, log them in
    handleSignIn = async () => {
        const users = await fetch("https://localhost:7229/api/user").then(res => res.json());
        console.log(users);
        for (let index = 0; index < users.length; index++) {
            if (users[index].userName === this.state.username && users[index].password === this.state.password) {
                localStorage.setItem("user", users[index].userName);
                window.location.href = "/home";
                return;
            }
        }
        alert("Incorrect username or password");
    }

    // Update state when user types in input fields
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    
    render() {
        return (
            <main> 
                <section className={"oauth"}>
                    <h1> Login </h1>
                    <div>
                        <h4> User Name </h4>
                        <input type={"text"} name="username" onChange={this.handleChange} placeholder={"User Name"}/>
                        <h4> Password </h4>
                        <input type={"password"} name="password" onChange={this.handleChange} placeholder={"Password"}/>
                    </div>
                    <button onClick={this.handleSignIn}> Login </button>
                    <hr/>
                    <p> 
                        No account yet? <a href={"/signup"}> Sign Up </a>
                    </p>
                </section>
            </main>
        );
    }
}
