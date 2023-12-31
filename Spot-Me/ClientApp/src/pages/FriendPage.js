import React, {Component} from "react";
import '../assets/css/FriendPage.css';
import { getUserByUsername } from "../assets/Util/Util";
import {ProfileDateCard} from "../components/ProfileDateCard";
export class FriendPage extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        let tmpDateList = [];
        // Generates the next Five dates 
        for (let i = 0; i < 5; i++) {
            const tmpDate = new Date();
            tmpDate.setDate(date.getDate() + i);
            tmpDateList.push(tmpDate);
        }
        this.state = {
            friend: {},
            dateData: [],
            dateList: tmpDateList,
        }
    }

    async componentDidMount() {
        // get friend userName from the current URL
        const friendName = window.location.pathname.split('/')[2];

        // get friend data from the database and set the state
        const friends = await getUserByUsername(friendName);
        this.setState({ friend: friends });
 

    }

    render() {
        return (
            <section className={'friendPage'}>
                <section>
  
                    <div className={'profileHeader'}>
                        <div>
                            <div></div>
                        </div>
                            {/*map out friend's basic information*/}
                        <div>
                            <h4> Friend: {this.state.friend && this.state.friend.userName} </h4>
                            <p> Standard Member </p>
                            <br/>
                            <p>Email address </p>
                            <p>Phone number </p>
                            <p>Current time {new Date().toLocaleDateString()}</p>

                        </div>
                    </div>
                    {/*map out friend's personal records*/}
                    <div className={'profileDetail'}>
                        <div>
                            <p> Personal Records </p>
                            <hr/>
                            <p>Squat: {this.state.friend && this.state.friend.personalBestSquat}</p>
                            <p>Bench: {this.state.friend && this.state.friend.personalBestBench}</p>
                            <p>Deadlift: {this.state.friend && this.state.friend.personalBestDeadlift}</p>
                        </div>
                        </div>
                </section>
                    {/*map out friend's schedule*/}
                <section style={{ marginTop: '5vh' }}>
                    <h4 style={{ textAlign: 'left', margin: '0' }}> Weekly Schedule</h4>
                    <div className={'exerciseDate'}>
                        {this.state.dateList.map((date) => {
                            return <ProfileDateCard date={date} perms={false} user={this.state.friend} />
                        })}
                    </div>
                </section>


            </section>
        );
    }
}



