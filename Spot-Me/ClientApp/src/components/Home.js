import React, { Component } from 'react';
import { ExerciseCard } from './ExerciseCard';
import { exerciseArray } from '../assets/Util/ExerciseType';
import '../assets/css/HomePage.css';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            excercise: {},
        };
    }

    componentDidMount() {
        fetch('https://localhost:7229/api/map/places/nearby')
            .then((res) => res.json())
            .then((data) => {
                console.log('Users:', data);
                this.setState({ users: data });
            })
            .catch((e) => console.log('Users Fetch Error:', e));

        fetch('https://localhost:7229/api/excerciseDB/data')
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data);
                this.setState({ excercise: data });
            })
            .catch((e) => console.log('Users Fetch Error:', e));
    }

    render() {
        console.log('Users:', this.state.users);
        console.log('Exercise:', this.state.excercise);
        return (
            <section>
                <div className={'welcome'}>
                    <h2>Welcome user</h2>
                </div>
                <div className={'selections'}>
                    {exerciseArray.map((exercise) => (
                        <button key={exercise}>{exercise}</button>
                    ))}
                </div>
                <section className={'exerciseTypes'}>
                    <ExerciseCard users={this.state.excercise} />
                </section>
            </section>
        );
    }
}
