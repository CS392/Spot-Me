import React from "react";
import { FormGroup, Label, Input, Col, Button, ButtonGroup, Form } from "reactstrap";
import '../assets/css/ExercisePage.css'

export class ExercisePage extends React.Component {
  constructor(props) {
    super(props);
    this.exerciseArea = [
      "back",
      "cardio",
      "chest",
      "lower arms",
      "lower legs",
      "neck",
      "shoulders",
      "upper arms"
    ];
    this.state = {
      exercises: [],
      selectedExercise: "", 
      selectedBodyPart: "",
      bodyPartMapping: {},
    };
  }

  async componentDidMount() {
    this.fetchExerciseData();
  }

  async fetchExerciseData(type) {
    try {
      const apiUrl = `https://localhost:7229/api/excerciseDB/data?type=${type}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const parsed = []
      const data = await response.json();
      data.forEach((exercise) => {
        const obj = {
            bodyPart: exercise.bodyPart,
            name: exercise.name,
        };
        parsed.push(obj);
    });
      this.setState({ exercises: parsed });
    } catch (error) {
      console.error("Error fetching exercise data:", error.message);
    }
  }

  updateResult = (exercise) => {
    this.fetchExerciseData(exercise);
    this.setState({ selectedBodyPart: exercise,
        selectedExercise: "" ,
        choosedExercise: []
    }
        );
  };

  handleAdd = () => {
    const { selectedExercise, exercises } = this.state;

    if (selectedExercise) {
        const selectedObj = exercises.find(
            (exercise) => exercise.name === selectedExercise
        );
        const name = selectedObj.name;

        // Check if the selected body part is already included

        // Create the new state object
        const newState = {
            choosedExercise: [...this.state.choosedExercise, name],
            bodyPartMapping: {
                ...this.state.bodyPartMapping,
                [this.state.selectedBodyPart]: [
                    ...(this.state.bodyPartMapping[this.state.selectedBodyPart] || []),
                    name,
                ],
            },
        };

        // If the selected body part is not included, update the state

        // Update the state
        this.setState(newState, () => {
            console.log(this.state);
        });
    }
};


handleRemoveExercise = (index, bodyPart) => {
    const updatedChoosedExercise = this.state.bodyPartMapping[bodyPart].filter((_, i) => i !== index);

    this.setState({
        bodyPartMapping: {
            ...this.state.bodyPartMapping,
            [bodyPart]: updatedChoosedExercise,
        },
    });
};


  
  render() {
    return (
      <div>
        <div className={'addDiv'}>
          {this.exerciseArea.map((exercise) => (
              <button
                  key={exercise}
                  onClick={() => this.updateResult(exercise)}>
                {exercise}
              </button>
          ))}
        </div>
        <h1> Choose your Exercise </h1>

        <div>
          <Label>Exercise Choice </Label>
          <Input
                className={'exerciseSelect'}
                multiple
                name="selectMulti"
                type="select"
                rows={5}
                onChange={(e) =>
                    this.setState({ selectedExercise: e.target.value })
                }
            >
              {this.state.exercises.map((exercise, index) => (
                  <option key={index} value={exercise.name}>
                    {exercise.name}
                  </option>
              ))}
          </Input>
            <div className={'exerciseContainer'}>
            {Object.keys(this.state.bodyPartMapping).map((key) => (
            this.state.bodyPartMapping[key].map((exercise, index) => (
            <li key={index} onClick={() => this.handleRemoveExercise(index,key)}>
                {exercise}
            </li>
        ))
    ))}
            </div>
            <div className={'exerciseBtnContainer'}>
              <button className={'appendExerciseBtn'} onClick={this.handleAdd}>Add</button>
              <button> Submit </button>
              <button onClick={() => console.log(this.state)}> test </button>
            </div>
        </div>
      </div>
    );
  }
}
