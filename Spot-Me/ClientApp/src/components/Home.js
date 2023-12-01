import React, { Component } from 'react';
import { ExerciseCard } from './ExerciseCard';
import { exerciseArray } from '../assets/Util/ExerciseType';
import weight from '../assets/images/weight-gym-svgrepo-com.svg';
import '../assets/css/HomePage.css';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            exercise: 'back',
            dateData: []
        };
    }

    render() {
        return (
            <section>
                Home
            </section>
        );
    }
}
