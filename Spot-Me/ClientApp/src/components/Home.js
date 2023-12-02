import React, { Component } from 'react';
import { ExerciseCard } from './ExerciseCard';
import { exerciseArray } from '../assets/Util/ExerciseType';
import weight from '../assets/images/weight-gym-svgrepo-com.svg';
import { ProfileDateCard } from "../components/ProfileDateCard";
import '../assets/css/HomePage.css';

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
            
            dateData: [],
            dateList: tmpDateList,
        };
    }

    render() {
        return (
            <div>
            <section>
                Home
            </section>
                <h4> Weekly Schedule</h4>
                <div className={'profileDate'}>
                    {this.state.dateList.map((date) => {
                        return <ProfileDateCard date={date} />
                    })}
                </div>
            </div>
        );
    }
}
