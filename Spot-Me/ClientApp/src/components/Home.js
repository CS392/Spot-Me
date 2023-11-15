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
            exercise: 'back' 
        };
    }

    handleExerciseClick = async (exerciseType) => {
        this.setState({ exercise: exerciseType }); 

        try {
            const response = await fetch(`https://localhost:7229/api/excerciseDB/data?type=${exerciseType}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            this.refs.childComponent.setState({ exercises: data });
        } catch (error) {
            console.error("Error fetching exercise data:", error.message);
        }
    };

    componentDidMount() {
        fetch('https://localhost:7229/api/map/places/nearby')
            .then((res) => res.json())
            .then((data) => {
                console.log('Users:', data);
                this.setState({ users: data });
            })
            .catch((e) => console.log('Users Fetch Error:', e));
    }

    render() {
        return (
            <section>
                <div className={'welcome'}>
                    <h2>Welcome user</h2>
                </div>
                <div className={'selections'}>
                    {exerciseArray.map((exercise) => (
                        <button key={exercise} onClick={() => this.handleExerciseClick(exercise)}>
                            {exercise}
                        </button>
                    ))}
                </div>
                <section className={'exerciseTypes'}>

                    <ExerciseCard key={this.state.exercise} type={this.state.exercise} ref="childComponent" />

                </section>
            </section>
        );
    }
}
