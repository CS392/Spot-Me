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

    componentDidMount() {
        checkUserStatus();
    }

    
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
        const res = await getAllUsers(); //we are finding in our databas to see if the searched user exist 
        const found = res.find(user => user.userName === this.state.search)
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
            //add something here
            // this.setState({ userNotFound: true });
            // console.log("User not found")
            alert("User not found")
        }
        document.getElementById('friendSearch').value = "";
    }

    handleAccept = async (userName) => {
        try {
            const updatedUser = this.state.user;
            updatedUser.pending = updatedUser.pending.filter(name => name !== userName)
            updatedUser.friends.push(userName)
            this.setState({user: updatedUser})
            await updateUser(this.state.user.id, updatedUser)
            const friend = await getUserByUsername(userName)
            friend.friends.push(this.state.user.userName)
            await updateUser(friend.id, friend)
        } catch (error) {
            console.error("Error accepting friend request:", error.message);
        }
    }

    handleDecline = async (userName) => {
        try {
            const updatedUser = this.state.user;
            updatedUser.pending = updatedUser.pending.filter(name => name !== userName);
            this.setState({user: updatedUser})
            await updateUser(this.state.user.id, updatedUser)
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
