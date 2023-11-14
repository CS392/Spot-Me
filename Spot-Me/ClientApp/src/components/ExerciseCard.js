import React, { Component } from "react";

export class ExerciseCard extends Component {
    static description;
    static imageUrl;

    constructor(props) {
        super(props);
        ExerciseCard.description = this.props.desc;
        ExerciseCard.imageUrl = this.props?.imageUrl;
    }

    componentDidMount() {
        // Call your API here and update state with the result
        this.fetchExerciseData();
    }

    async fetchExerciseData() {
        try {
            
            const response = await fetch("api/excerciseDB");
            console.log("check", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("show",data.json());
            // Assuming your API returns an object with imageUrl and description
            ExerciseCard.imageUrl = data.imageUrl;
            ExerciseCard.description = data.description;

            // Force a re-render by updating the component state
            this.forceUpdate();
        } catch (error) {
            console.error("Error fetching exercise data:", error.message);
        }
    }

    render() {
        return (
            <div>
                {/* Change this to image HTML tag */}
                {ExerciseCard.imageUrl !== undefined && <p> {ExerciseCard.imageUrl} </p>}
                <p> {ExerciseCard.description} </p>
            </div>
        );
    }
}
