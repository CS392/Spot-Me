import React, { Component } from "react";
import "../assets/css/ComponentScss/FriendCard.css";
import {
  checkUserStatus,
  getUserByUsername,
  updateUser,
} from "../assets/Util/Util";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "reactstrap";

export class FriendCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: {},
      user: {},
    modal: false,
    };
  }

  redirect = async () => {
    window.location.href = `/user/${this.props.friend}`; // Replace 'username' with the correct property for the friend's username
  };

  async componentDidMount() {
    checkUserStatus();
    const f = await getUserByUsername(this.props.friend);
    this.setState({ friendData: f});
    if(this.props.user.helpNeeded &&
        this.props.user.helpNeeded.includes(this.props.friend)){
            this.setState({modal: !this.state.modal})
        }
  }
  async addRequest() {
    const friend = this.state.friendData;
    friend.helpRequests.push(localStorage.getItem("user"));
    await updateUser(friend.id, friend);
    this.setState({ friendData: friend });
  }

  async acceptRequest() {
    const user = this.props.user;
    user.helpRequests = user.helpRequests.filter(
      (name) => name !== this.props.friend
    );
    await updateUser(user.id, user);
    this.setState({ user: user });
    const friend = this.state.friendData;
    friend.helpNeeded.push(user.userName);
    await updateUser(friend.id, friend);
    this.setState({ friendData: friend });
  }

  async acknowledgeRequest() {
    const user = this.props.user;
    user.helpNeeded = user.helpNeeded.filter(
      (name) => name !== this.props.friend
    );
    await updateUser(user.id, user);
    this.setState({ user: user , modal: !this.state.modal }
);
  }

  render() {
    return (
      <div className={"friendCard"}>
        {/* Map user information here & see if anyone request Lift */}
        <div>
          <p onClick={this.redirect}> {this.props.friend} </p>
          {this.state.friendData.helpRequests &&
          this.state.friendData.helpRequests.includes(
            this.props.user.userName
          ) ? (
            <div> Pending Spotter Request </div>
          ) : (
            !this.props.user.helpNeeded.includes(this.props.friend) && (
              <button className={"buttonRed"} onClick={() => this.addRequest()}>
                {" "}
                SPOT ME!{" "}
              </button>
            )
          )}
          {this.props.user &&
            this.props.user.helpRequests.includes(this.props.friend) && (
              <button
                className={"buttonGreen"}
                onClick={() => this.acceptRequest()}
              >
                {" "}
                ACCEPT SPOT REQUEST{" "}
              </button>
            )}
        { (
          <Modal isOpen={this.state.modal} toggle={()=>this.acknowledgeRequest()}>
            <ModalHeader toggle={()=>this.acknowledgeRequest()}>Success!</ModalHeader>
            <ModalBody>{this.props.friend} has accepted your spot request! </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=>this.acknowledgeRequest()}>
                Horray!
              </Button>
            </ModalFooter>
          </Modal>)
        }
        </div>
      </div>
    );
  }
}
