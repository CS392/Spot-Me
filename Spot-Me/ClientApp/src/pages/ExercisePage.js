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
      choosedExercise: [],
      selectedExercise: "", 
      selectedBodyPart: "",
      bodyPart:[]
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
      const data = await response.json();
      this.setState({ exercises: data });
    } catch (error) {
      console.error("Error fetching exercise data:", error.message);
    }
  }

  updateResult = (exercise) => {
    this.fetchExerciseData(exercise);
    this.setState({ selectedBodyPart: exercise });
  };

  handleExerciseSubmission = () => {
    const { selectedExercise, exercises, choosedExercise } = this.state;

    if (selectedExercise) {
      const selectedObj = exercises.find(
        (exercise) => exercise.name === selectedExercise
      );

      this.setState({
        choosedExercise: [...choosedExercise, selectedObj],
        selectedExercise: "",
        bodyPart: [...this.state.bodyPart, this.state.selectedBodyPart],
        selectedBodyPart: ""
      });
      console.log(this.state)
    }
  };
  handleRemoveExercise = (index) => {
    const updatedChoosedExercise = [...this.state.choosedExercise];
    updatedChoosedExercise.splice(index, 1);
    this.setState({ choosedExercise: updatedChoosedExercise });
  };
  render() {
    const buttonStyle = { margin: "5px", display: "inline-block" };
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
              {this.state.choosedExercise.map((exercise, index) => (
                  <li key={index} onClick={() => this.handleRemoveExercise(index)}>
                    {exercise.name}
                  </li>
              ))}
            </div>
            <div className={'exerciseBtnContainer'}>
              <button className={'appendExerciseBtn'} onClick={this.handleExerciseSubmission}>Add</button>
              <button className={'buttonGreen'}> Submit </button>
            </div>
        </div>
      </div>
    );
  }
}
