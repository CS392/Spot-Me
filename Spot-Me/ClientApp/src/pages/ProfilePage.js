// Import necessary modules and components
import React, { Component } from "react";
import { ProfileDateCard } from "../components/ProfileDateCard";
import "../assets/css/ProfilePage.css";
import { checkUserStatus, getUserByUsername, updateUser } from "../assets/Util/Util";
import { Button } from "reactstrap";

// Define the ProfilePage component
export class ProfilePage extends Component {
  // Constructor to initialize the state
  constructor(props) {
    super(props);

    this.state = {
      user: {},          // Store user data
      editMode: false,   // Flag to determine whether in edit mode or not
      editSquat: 0,      // Store edited squat value
      editBench: 0,      // Store edited bench value
      editDeadlift: 0,   // Store edited deadlift value
    };
  }

  // Lifecycle method - called after the component is mounted
  async componentDidMount() {
    // Check user status
    checkUserStatus();

    // Get the username from local storage
    const userName = localStorage.getItem("user");

    // Retrieve user data by username
    const userData = await getUserByUsername(userName);

    // Set the user data in the state
    this.setState({ user: userData });

    // Set initial values for edit mode
    this.setState({
      editSquat: parseInt(userData.personalBestSquat),
      editBench: parseInt(userData.personalBestBench),
      editDeadlift: parseInt(userData.personalBestDeadlift),
    });
  }

  // Function to handle the submission of personal records
  submitPRRecord = () => {
    this.setState(
      (prevState) => ({
        editMode: !prevState.editMode,
        user: {
          ...prevState.user,
          personalBestSquat: prevState.editSquat,
          personalBestBench: prevState.editBench,
          personalBestDeadlift: prevState.editDeadlift,
        },
      }),
      () => {
        // Update user data in the database
        updateUser(this.state.user.id, this.state.user);
      }
    );
  };

  // Render method to render the component
  render() {
    return (
      <>
        {/* Profile section */}
        <section>
          <div className={"profileHeader"}>
            <div>
              <div></div>
            </div>
            <div>
              <h4> Username: {this.state.user && this.state.user.userName} </h4>
              <p> Standard Member </p>
              <br />
              <p>Email address </p>
              <p>Phone number </p>
              <p>Current time {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Profile edit button */}
          <div className={"profileEdit"}>
            <button onClick={() => {this.setState({ editMode: !this.state.editMode })}}>Edit Profile</button>
          </div>

          {/* Profile details section */}
          <div className={"profileDetail"}>
            <div>
              <p> Personal Records </p>
              <hr />
              {this.state.editMode ? (
                // Render form for editing personal records
                <>
                <div className={'editMe'}>
                  <div>
                    <p> Squat: </p> <input
                      type={"number"}
                      placeholder={"Squat"}
                      value={this.state.editSquat}
                      onChange={(e) =>
                          this.setState({ editSquat: e.target.value })
                      }/>
                  </div>
                  <div>
                    <p> Bench: </p> <input
                      type={"number"}
                      placeholder={"Bench"}
                      value={this.state.editBench}
                      onChange={(e) =>
                        this.setState({ editBench: e.target.value })
                      }/>
                  </div>
                  <div>
                    <p> Deadlifts: </p> <input
                      type={"number"}
                      placeholder={"Deadlift"}
                      value={this.state.editDeadlift}
                      onChange={(e) =>
                          this.setState({ editDeadlift: e.target.value })
                      }/>
                  </div>
                </div>
                <button onClick={this.submitPRRecord}>Submit</button>
                </>
              ) : (
                // Render user's personal records
                <div>
                  <p>
                    Squat:{" "}
                    {this.state.user && this.state.user.personalBestSquat}
                  </p>
                  <p>
                    Bench:{" "}
                    {this.state.user && this.state.user.personalBestBench}
                  </p>
                  <p>
                    Deadlift:{" "}
                    {this.state.user && this.state.user.personalBestDeadlift}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
}
