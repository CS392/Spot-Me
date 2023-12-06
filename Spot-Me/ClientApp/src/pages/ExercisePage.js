import React from "react";
import {
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import "../assets/css/ExercisePage.css";
import {
  updateUser,
  checkUserStatus,
  getUserByUsername,
} from "../assets/Util/Util";

export class ExercisePage extends React.Component {
  // constructor for ExercisePage component
  constructor(props) {
    super(props);
    // Set the initial state of the exercise Area for the button selection
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
      user: {},
      modal: false,
    };
  }

  // the function to toggle the submission modal
  toggleModal = () => {
    // toggle the modal
    this.setState({ modal: !this.state.modal });
  };

  // Async function to get the user's data from the database
  async componentDidMount() {
    // check if the user is logged in
    const userName = localStorage.getItem("user");

    // receive the user data from the database 
    const user = await getUserByUsername(userName);

    // parsed the date from the url 
    const curr_date = window.location.pathname.split("/")[2];

    // set the state of the user and the body part mapping
    this.setState({ user: user });

    // check if the user has already submitted an exercise for the current date in the database 
    if (user.exercise[curr_date] != null) {

      // set the state of the body part mapping to the user's exercise for the current date
      this.setState({ bodyPartMapping: user.exercise[curr_date] });
    }
  }

  // Async function to get the exercise data from the ExerciseDB API call 
  async fetchExerciseData(type) {
    try {
      // fetch the exercise data from the ExerciseDB API call
      const apiUrl = `https://localhost:7229/api/excerciseDB/data?type=${type}`;

      // check if the response is ok
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // parse the data from the response
      const parsed = [];
      const data = await response.json();

      // map the exercise data into the parsed array
      data.forEach((exercise) => {
        const obj = {
          bodyPart: exercise.bodyPart,
          name: exercise.name,
        };
        parsed.push(obj);
      });
      // set the state of the exercise data
      this.setState({ exercises: parsed });
    } catch (error) {
      console.error("Error fetching exercise data:", error.message);
    }
  }

  // when any body part button clicked, the function to update the result of the exercise selection
  updateResult = (exercise) => {
    // fetch the exercise data from the select body part from the ExerciseDB API call
    this.fetchExerciseData(exercise);
    this.setState({
      selectedBodyPart: exercise,
      selectedExercise: "",
      choosedExercise: [],
    });
  };
  // the function to add the selected exercise to the body part mapping
  handleAdd = () => {
    const { selectedExercise } = this.state;
    // Check if the selected body part is already included

    // Create the new state object with the selected exercise
    if (selectedExercise) {
      const newState = {
        choosedExercise: [...this.state.choosedExercise, selectedExercise],
        bodyPartMapping: {
          ...this.state.bodyPartMapping,
          [this.state.selectedBodyPart]: [
            ...(this.state.bodyPartMapping[this.state.selectedBodyPart] || []),
            selectedExercise,
          ],
        },
      };
      this.setState(newState);
    }
  };
  // the function to submit the exercise selection to the database
  handleSubmit = () => {
    // get the current date from the url
    const curr_date = window.location.pathname.split("/")[2];

    // get the body part mapping from the state
    const { bodyPartMapping } = this.state;
    const exercise = {
      [curr_date]: bodyPartMapping,
    };

    // update the user's exercise data in the state
    const NewUser = this.state.user;
    NewUser.exercise = { ...NewUser.exercise, ...exercise };
    
    // update the user's exercise data in the database reference of the function from the top of the file
    updateUser(this.state.user.id, NewUser);

    // toggle the submission modal
    this.toggleModal();
  };
  // the function to remove the selected exercise from the body part mapping
  handleRemoveExercise = (index, bodyPart) => {
    // remove the selected exercise from the body part mapping 
    const updatedChoosedExercise = this.state.bodyPartMapping[bodyPart].filter(
      (_, i) => i !== index
    );
    // update the body part mapping in the state
    this.setState({
      bodyPartMapping: {
        ...this.state.bodyPartMapping,
        [bodyPart]: updatedChoosedExercise,
      },
    });
  };
// render the ExercisePage component
  render() {
    return (
    
      <div>
        <div className={"addDiv"}>
          {this.exerciseArea.map((exercise) => (
            // render the exercise area buttons
            <button key={exercise} onClick={() => this.updateResult(exercise)}>
              {exercise}
            </button>
          ))}
        </div>
        <h1> Choose your Exercise </h1>

        <div>
          
          <Label>Exercise Choice </Label>
          <Input // render the exercise selection
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
              // render the exercise selection options
              <option key={index} value={exercise.name}>
                {exercise.name}
              </option>
            ))}
          </Input>
          <div className={"exerciseContainer"}>
            {
            // render the exercise selection result by iterating the body part object using the key value pair 
            Object.keys(this.state.bodyPartMapping).map((key) =>
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
          </div>
        </div>
        {/* This is the modal that will toggle if a user sucessfully submit the exercises to the database once a user click submit*/}
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Success!</ModalHeader>
          <ModalBody>Your submission was successful. </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
