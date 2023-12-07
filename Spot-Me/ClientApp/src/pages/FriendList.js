import React, {Component} from "react";
import {FriendSearch} from "../components/FriendSearch";
import '../assets/css/FriendList.css'
import {FriendStatusBlock} from "../components/FriendStatusBlock";
import { checkUserStatus, getUserByUsername } from "../assets/Util/Util";
export class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    // get user data from the database and set the state
    async componentDidMount() {
        checkUserStatus();
        const name = localStorage.getItem('user');
        const userData = await getUserByUsername(name);
        this.setState({user: userData});
    }
    render() {
        return (
            <section className={'friendList'}> 
                <FriendSearch user={this.state.user}/>
                <FriendStatusBlock
                    header={"Friends"} user={this.state.user}/>
            </section>
        );
    }
}
