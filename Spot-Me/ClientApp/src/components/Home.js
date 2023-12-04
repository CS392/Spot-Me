import React, { Component } from 'react';
import { ExerciseCard } from './ExerciseCard';
import { exerciseArray } from '../assets/Util/ExerciseType';
import weight from '../assets/images/weight-gym-svgrepo-com.svg';
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
        };
    }
    
    async componentDidMount() {
        checkUserStatus();
        const userName = localStorage.getItem('user');
        const userData = await getUserByUsername(userName);
        this.setState({ user: userData });


        fetch('https://localhost:7229/api/calendar/credentials')
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

                    console.log('Tuple Array:', tupleArray);
                    this.setState({ dateData: tupleArray })
                    console.log('TArray:', this.state.dateData);



                }
            })
            .catch((error) => console.log('Users Fetch Error:', error));
    }

    componentDidUpdate() {
        //console.log(this.state.user.excercise)
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
                            <h4 className={'homeH1'}> Upcoming Events </h4>
                <section className={'calendar'}>
                    <div className={'events'}>
                        {this.state.dateData.map((type) => {
                            return <h3 style={{ fontSize: '1rem' }}>{type[0].split(" ")[0]+ "  "+type[1] + " "}</h3>;
                        })}
                    </div>
                </section></section> 
        );
    }
}
