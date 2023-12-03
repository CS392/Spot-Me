import React from "react";
import {
  Label,
  Input,
} from "reactstrap";
import "../assets/css/ExercisePage.css";
import { updateUser, checkUserStatus, getUserByUsername} from "../assets/Util/Util";
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
      "upper arms",
    ];
    this.state = {
      exercises: [],
      selectedExercise: "",
      selectedBodyPart: "",
      bodyPartMapping: {},
      user: {}
    };
  }

  async componentDidMount() {
    const userName = localStorage.getItem('user');
    const user = await getUserByUsername(userName);
    console.log(user, "user")
    const curr_date = window.location.pathname.split("/")[2];
    this.setState({ user: user });
    if(user.exercise[curr_date] != null) {
      this.setState({ bodyPartMapping: user.exercise[curr_date]});
    }

  }

  async fetchExerciseData(type) {
    try {
      const apiUrl = `https://localhost:7229/api/excerciseDB/data?type=${type}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const parsed = [];
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
    this.setState({
      selectedBodyPart: exercise,
      selectedExercise: "",
      choosedExercise: [],
    });
  };
  
  handleAdd = () => {
    const { selectedExercise, exercises } = this.state;
      // Check if the selected body part is already included

      // Create the new state object
      const newState = {

        choosedExercise: [...this.state.choosedExercise, selectedExercise],
        bodyPartMapping: {
          ...this.state.bodyPartMapping,
          [this.state.selectedBodyPart]: [
            ...(this.state.bodyPartMapping[this.state.selectedBodyPart] || []),
            selectedExercise ,
          ],
        },
        
      };
      this.setState(newState);

  };
  handleSubmit = () => {
    const curr_date = window.location.pathname.split("/")[2];
    const { bodyPartMapping } = this.state;
    const exercise = {
        [curr_date]: bodyPartMapping
    }
    const NewUser = this.state.user;
    NewUser.exercise = {...NewUser.exercise, ...exercise};
    updateUser(this.state.user.id, NewUser);
  };

  handleRemoveExercise = (index, bodyPart) => {
    const updatedChoosedExercise = this.state.bodyPartMapping[bodyPart].filter(
      (_, i) => i !== index
    );

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
        <div className={"addDiv"}>
          {this.exerciseArea.map((exercise) => (
            <button key={exercise} onClick={() => this.updateResult(exercise)}>
              {exercise}
            </button>
          ))}
        </div>
        <h1> Choose your Exercise </h1>

        <div>
          <Label>Exercise Choice </Label>
          <Input
            className={"exerciseSelect"}
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
          <div className={"exerciseContainer"}>
            {this.state.bodyPartMapping != null && Object.keys(this.state.bodyPartMapping).map((key) =>
              this.state.bodyPartMapping[key].map((exercise, index) => (
                <div key={`${index}-div`}>
                  <button
                    key={index}
                    className={"buttonRed"}
                    onClick={() => this.handleRemoveExercise(index, key)}
                  >
                    {" "}
                    Remove{" "}
                  </button>
                  <p key={`${index}-li`}>{exercise}</p>
                </div>
              ))
            )}
          </div>
          <div className={"exerciseBtnContainer"}>
            <button className={"appendExerciseBtn"} onClick={this.handleAdd}>
              Add
            </button>
            <button className={"buttonGreen"} onClick={this.handleSubmit}>
              {" "}
              Submit{" "}
            </button>
            <button onClick={() => console.log(this.state)}> test </button>
          </div>
        </div>
      </div>
    );
  }
}
