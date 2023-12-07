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
     //we will redirect the user to the friend's profile page once clicked'
    window.location.href = `/user/${this.props.friend}`;  
  };

  async componentDidMount() {
    // check if user is logged in, if not redirect to login page
    checkUserStatus();

    // get friend data from the database and set the state
    const f = await getUserByUsername(this.props.friend);
    this.setState({ friendData: f});

    // if a friend accepted to spot the user, show a modal
    if(this.props.user.helpNeeded &&
        this.props.user.helpNeeded.includes(this.props.friend)){
            this.setState({modal: !this.state.modal})
        }
  }

  //function to request help from a friend
  async addRequest() { 
    // add the friend to the user's help request list
    const friend = this.state.friendData;
    friend.helpRequests.push(localStorage.getItem("user"));
    await updateUser(friend.id, friend);
    this.setState({ friendData: friend });
  }

  // function to accept a spot request
  async acceptRequest() {
    // remove the friend from the user's help request list
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

  // function to acknowledge that a friend has accepted to spot the user
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
