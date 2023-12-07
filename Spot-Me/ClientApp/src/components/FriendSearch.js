import React, {Component} from "react";
import {getAllUsers, getUserByUsername, updateUser, checkUserStatus} from "../assets/Util/Util";

export class FriendSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            user: this.props.user,
            showMain: true,
            userNotFound:false
        }
    }

    // check if user is logged in, if not redirect to login page
    componentDidMount() {
        checkUserStatus();
    }

    // update state if user changes
    componentDidUpdate() {
        if (this.state.user !== this.props.user) {
            this.setState({user: this.props.user})
        }
    }
    
    toggleMainVisibility = () => {
        this.setState({
            showMain: !this.state.showMain
        })
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
        console.log(this.state.search)
        console.log(this.state)
    }

    handleAddFriend = async () => {
        // get all users from the database
        const res = await getAllUsers(); 
        // check if the searched user exists in the database
        const found = res.find(user => user.userName === this.state.search)

        // if the user exists, check if they are already friends or if a request has already been sent
        if (found){
            if (found.pending.includes(this.state.user.userName)){
                alert("Already sent a request")
            }else if (found.friends.includes(this.state.user.userName)){
                alert("Already friends")
            }else{
                found.pending.push(this.state.user.userName)
                updateUser(found.id, found)
                this.setState({ userNotFound: false });
                alert("Friend request sent")
            }
        } else {
            alert("User not found")
        }
        document.getElementById('friendSearch').value = "";
    }

    // accept friend request
    handleAccept = async (userName) => {
        try {
            // update user's pending and friends list
            const updatedUser = this.state.user;

            // remove the user from the pending list and add them to the friends list
            updatedUser.pending = updatedUser.pending.filter(name => name !== userName)
            updatedUser.friends.push(userName)
            this.setState({user: updatedUser})

            // update the user in the database
            await updateUser(this.state.user.id, updatedUser)

            // update the friend's friends list
            const friend = await getUserByUsername(userName)
            friend.friends.push(this.state.user.userName)
            await updateUser(friend.id, friend)
        } catch (error) {
            console.error("Error accepting friend request:", error.message);
        }
    }

    // decline friend request
    handleDecline = async (userName) => {
        try {
            // update user's pending list
            const updatedUser = this.state.user;
            updatedUser.pending = updatedUser.pending.filter(name => name !== userName);
            this.setState({user: updatedUser})
            await updateUser(this.state.user.id, updatedUser)

            // update friend's pending list
            const friend = await getUserByUsername(userName)
            friend.pending = friend.pending.filter(name => name !== this.state.user.userName);
            await updateUser(friend.id, friend)
        } catch (error) {
            console.error("Error declining friend request:", error.message);
        }
    }

    render() {
        return (
            <section style={{marginTop: '0px'}}>
                <h4> Add a friend</h4>
                <div className={'addFriend'}>
                    <input
                        type={"text"}
                        id={'friendSearch'}
                        placeholder={"Type in their username"}
                        value={this.state.search}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleAddFriend}>Add</button>
                    {this.state.userNotFound && <p>User not found</p>}
                </div>

                <h4 onClick={this.toggleMainVisibility}> Friend Requests</h4>
                
                <hr/>
                <div>

                {this.state.showMain && this.state.user.pending && this.state.user.pending.map((userName, idx) => {
                    return (
                        <div key={idx} className={'pendingFriends'}>
                            <p>{userName}</p>
                            <button className={'buttonGreen'}  onClick={() => this.handleAccept(userName)}>Accept</button>
                            <button className={'buttonRed'} onClick={() => this.handleDecline(userName)}>Decline</button>
                        </div>
                    )
                })}
                </div>
            </section>
        );
    }
}
