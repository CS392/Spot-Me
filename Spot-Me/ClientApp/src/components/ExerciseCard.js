import React, { Component } from "react";

export class ExerciseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        };
    }

    componentDidMount() {
        this.fetchExerciseData();
    }

    async fetchExerciseData() {
        try {
            const response = await fetch('https://localhost:7229/api/excerciseDB/data');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ exercises: data });
        } catch (error) {
            console.error("Error fetching exercise data:", error.message);
        }
    }

    render() {
        const { exercises } = this.state;

        return (
            <div className="exercise-list">
                {exercises.map((exercise, index) => (
                    <div key={index}>
                        <img src={exercise.gifUrl} alt="Exercise" />
                        <p>{`${exercise.bodyPart} - ${exercise.equipment} - ${exercise.name}`}</p>
                    </div>
                ))}
            </div>
        );
    }
}
