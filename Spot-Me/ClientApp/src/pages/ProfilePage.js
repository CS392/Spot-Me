import React, { Component } from "react";
import { ProfileDateCard } from "../components/ProfileDateCard";
import "../assets/css/ProfilePage.css";
import { checkUserStatus, getUserByUsername, updateUser } from "../assets/Util/Util";
import { Button } from "reactstrap";
export class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      editMode: false,
      editSquat: 0,
      editBench: 0,
      editDeadlift: 0,
    };
  }

  async componentDidMount() {
    checkUserStatus();
    const userName = localStorage.getItem("user");
    const userData = await getUserByUsername(userName);
    this.setState({ user: userData });
    this.setState({
        editSquat: parseInt(userData.personalBestSquat),
        editBench: parseInt(userData.personalBestBench),
        editDeadlift: parseInt(userData.personalBestDeadlift),
        });
  };
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
        updateUser(this.state.user.id, this.state.user);
      }
    );
  };
  
  render() {
    return (
      <>
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

          <div className={"profileEdit"}>
            <button onClick={() => {this.setState({ editMode: !this.state.editMode })}}>Edit Profile</button>
          </div>

          <div className={"profileDetail"}>
            <div>
              <p> Personal Records </p>
              <hr />
              {this.state.editMode ? (
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
