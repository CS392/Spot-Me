import React, { Component } from "react";
import '../assets/css/ComponentScss/Exercise.css'

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
            const { type } = this.props; 
            
            const apiUrl = `https://localhost:7229/api/excerciseDB/data?type=${type}`; 
            console.log("type display", apiUrl);
            const response = await fetch(apiUrl);
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
