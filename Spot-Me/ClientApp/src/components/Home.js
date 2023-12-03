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
        for (let i = 2; i > -3; i--) {
            const tmpDate = new Date();
            tmpDate.setDate(date.getDate() - i);
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
        this.setState({user: userData});
    }

    componentDidUpdate() {
        console.log(this.state.user)
    }

    render() {
        return (
            <section style={{marginTop: '5vh'}}>
                <h4 style={{textAlign: 'left', margin: '0'}}> Weekly Schedule</h4>
                <div className={'exerciseDate'}>
                    {this.state.dateList.map((date) => {
                        return <ProfileDateCard date={date} />
                    })}
                </div>
            </section>
        );
    }
}
