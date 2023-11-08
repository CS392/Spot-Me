import React, { Component } from 'react';


class ExerciseModel extends Component {
    constructor() {
        super();
        this.exerciseArea = ["back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders","upper arms"];
        this.input = [];
    }

    getExerciseList() {
        return this.exerciseArea;
    }

    async updateResult(execriseType) {
        try {
            const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${execriseType}?limit=10`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'f69f2da5c1msh1331231abd4a573p1d8d45jsn4af60eda3f35',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const body = await response.json();
            console.log(body);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    render() {
        return <div>ExerciseModel Component</div>;
    }
}

export default ExerciseModel;

