import React, {Component} from "react";
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
        }
    }

    // If user is already logged in, redirect to home page
    componentDidMount() {
        if (localStorage.getItem("user") !== null) {
            window.location.href = "/";
        }
    }

    // function to sign up an user
    handleSignUp = async () => {

        // check if username already exists
        const users = await fetch("https://localhost:7229/api/user").then(res => res.json());
        for (let index = 0; index < users.length; index++) {
            if (this.state.username === users[index].userName) {
                alert("Username already exists");
                return;
            }
        }

        // check if passwords match, username contains spaces, password is 4-20 characters long, and username is 4-12 characters long
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (this.state.username.includes(" ")) {
            alert("Username cannot contain spaces");
            return;
        }
        if (this.state.password.length < 4 || this.state.confirmPassword.length > 20) {
            alert("Password must be 4-20 characters long");
            return;
        }
        if (this.state.username.length < 4 || this.state.username.length > 12) {
            alert("Username must 4-12 characters long");
            return;
        }

        // create the user credentials
        const entry = {
            username: this.state.username,
            password: this.state.password,
        }
        // add the user to the database
        fetch('https://localhost:7229/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        })
        .then(res => res.json())
        .catch(error => console.log(error));
        alert("Account created successfully");
        window.location.href = "/login";
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <main>
                <section className={"oauth"}>
                    <h1> Sign Up </h1>
                    <div>
                        <h4> User Name </h4>
                        <input type={"text"} placeholder={"User Name"} name="username" onChange={this.handleChange}/>
                        <h4> Password </h4>
                        <input type={"password"} placeholder={"Password"} name="password" onChange={this.handleChange}/>
                        <h4> Confirm Password </h4>
                        <input type={"password"} placeholder={"Re-enter your password"} name="confirmPassword" onChange={this.handleChange}/>
                    </div>
                    <button onClick={this.handleSignUp}> Sign Up </button>
                    <hr/>
                    <p>
                        Already have an account? <a href={"/login"}> Login </a>
                    </p>
                </section>
            </main>
        );
    }
}
