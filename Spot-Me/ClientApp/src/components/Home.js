import React, { Component } from 'react';
import { ProfileDateCard } from "../components/ProfileDateCard";
import '../assets/css/HomePage.css';
import {checkUserStatus, getUserByUsername} from "../assets/Util/Util";

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        const date = new Date();
        let tmpDateList = [];
        for (let i = 0; i < 5; i++) {
            const tmpDate = new Date();
            tmpDate.setDate(date.getDate() + i);
            tmpDateList.push(tmpDate);
        }
        this.state = {
            user: {}, 
            dateData: [],
            dateList: tmpDateList,
            friendData : [],
            topSquatters: [],
            topBenchers: [],
            topDeadlifters: [],
        };
    }
    
    async componentDidMount() {
        checkUserStatus();
        // get user data from the database and set the state
        const userName = localStorage.getItem('user');
        const userData = await getUserByUsername(userName);
        this.setState({ user: userData }, async () => {
            let friendDataArray = [];
            // construct an array of friend data
            for (let i = 0; i < this.state.user.friends.length; i++) {
                const friend = await getUserByUsername(this.state.user.friends[i]);
                friendDataArray.push(friend);
            }
            this.setState({ friendData: friendDataArray }, () => {
                const allUsers = [this.state.user, ...this.state.friendData];
                // get top squatters, benchers, and deadlifters from all user and their friends and set the state
                const topSquatters = allUsers.sort((a, b) => b.personalBestSquat - a.personalBestSquat).slice(0, 3);
                const topBenchers = allUsers.sort((a, b) => b.personalBestBench - a.personalBestBench).slice(0, 3);
                const topDeadlifters = allUsers.sort((a, b) => b.personalBestDeadlift - a.personalBestDeadlift).slice(0, 3);
                this.setState({ topSquatters: topSquatters, topBenchers: topBenchers, topDeadlifters: topDeadlifters });
            });
        });


        fetch('https://localhost:7229/api/calendar/credentials')
        //this function is used to render out all upcoming events 
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.text();
            })
            .then((data) => {
                if (data.trim() === '') {
                    console.log('No upcoming events');

                } else {
                    console.log('Upcoming events found');
                    console.log('Users:', data);

                    const lines = data.trim().split('\n');
                    const tupleArray = [];

                    for (let i = 0; i < lines.length; i += 3) {
                        const activity = lines[i].split(': ')[1]?.trim() || 'Unknown Activity';
                        const date = lines[i + 1].split(': ')[1]?.trim() || 'Unknown Date';
                        tupleArray.push([date, activity]);
                    }

                    this.setState({ dateData: tupleArray })
                }
            })
            .catch((error) => console.log('Users Fetch Error:', error));
    }

    render() {
        return (
            <section>
                <section style={{marginTop: '5vh'}}>
                    <h4 style={{textAlign: 'left', margin: '0'}}> Weekly Schedule</h4>
                    <div className={'exerciseDate'}>
                        {this.state.dateList.map((date) => {
                            return <ProfileDateCard date={date} perms={true} user = {this.state.user}/>
                        })}
                    </div>
                </section>
                <section className={'calendar'}>
                    <h4 className={'homeH1'}> Upcoming Events </h4>
                    <div className={'events'}>
                        {this.state.dateData.map((type) => {
                            return <h3 style={{ fontSize: '1rem' }}>{type[0].split(" ")[0]+ "  "+type[1] + " "}</h3>;
                        })}
                    </div>
                </section>
                <h4 className={'homeH1'} onClick={() => console.log(this.state.topBenchers)}> Leaderboard </h4>
                <section className={'scoreBoard'}>
                    <div>
                        top squatters:
                        {this.state.topSquatters.map((user, index) => (
                            <div key={index}>{user.userName}: {user.personalBestSquat} lbs</div>
                        ))}
                    </div>
                    <div>
                        top benchers:
                        {this.state.topBenchers.map((user, index) => (
                            <div key={index}>{user.userName}: {user.personalBestBench} lbs</div>
                        ))}
                    </div>
                    <div>
                        top deadlifters:
                        {this.state.topDeadlifters.map((user, index) => (
                            <div key={index}>{user.userName}: {user.personalBestDeadlift} lbs</div>
                        ))}
                    </div>
                </section>
            </section> 
        );
    }
}
