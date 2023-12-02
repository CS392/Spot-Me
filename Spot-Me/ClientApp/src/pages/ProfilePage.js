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
                    {/* <div className={'profileDate'}>
                        {this.state.dateList.map((date) => {
                            return <ProfileDateCard date={date}/>
                        })}
                    </div> */}
  
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
                            <p> Personal Records </p>
                            <hr/>
                            <p>Squat: {this.state.user && this.state.user.personalBestSquat}</p>
                            <p>Bench: {this.state.user && this.state.user.personalBestBench}</p>
                            <p>Deadlift: {this.state.user && this.state.user.personalBestDeadlift}</p>
                        </div>
                        </div>
                </section>
            </>
        )
    }
}