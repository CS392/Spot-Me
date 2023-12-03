import React, {Component} from "react";
import {ProfileDateCard} from "../components/ProfileDateCard";
import '../assets/css/ProfilePage.css';
import { checkUserStatus, getUserByUsername } from "../assets/Util/Util";

export class ProfilePage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {

            user: {}
            
        }


        
    }

    async componentDidMount() {
        checkUserStatus();
        const userName = localStorage.getItem('user');
        const userData = await getUserByUsername(userName);
        this.setState({user: userData});
    }
    


    render() {
        return (
            <>
                <section>
                    <h4> Weekly Schedule</h4>

                    <div className={'profileInformation'}>
                        <img 
                            src={'https://imgs.search.brave.com/8o6_F1VZu3lmFOyCodmVOUEssP3vkLKte3ZevQaDexE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTEz/MTMzOTAwL3Bob3Rv/L2dvbGRlbi1yZXRy/aWV2ZXItc2l0dGlu/Zy1pbi1mcm9udC1v/Zi1hLXdoaXRlLWJh/Y2tncm91bmQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXJQ/dUJnZm5fd2NBemFh/OG8yR2hyQTJlQlRk/YnZyVHZZdzRkZW16/Vi1iT3M9'} alt={"default"}/>
                        <h4> User Name: {this.state.user && this.state.user.userName}</h4>
                        <h4> First Name: </h4>
                        <h4> Last Name: </h4>
                        <h4> Email: </h4>
                    <div className={'profileHeader'}>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <h4> Username: {this.state.user && this.state.user.userName} </h4>
                            <p> Standard Member </p>
                            <br/>
                            <p>Email address </p>
                            <p>Phone number </p>
                            <p>Current time {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div className={'profileEdit'}>
                        <button> Edit Profile </button>
                        <button className={'buttonRed'}> Delete Account  </button>
                    </div>
                    
                    <div className={'profileDetail'}>
                        <div>
                            <p> Goals </p>
                            <hr/>
                        </div>
                        </div>
</div>
                </section>
            </>
        )
    }
}