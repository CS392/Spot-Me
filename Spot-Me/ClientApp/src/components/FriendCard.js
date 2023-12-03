import React, {Component} from "react";
import '../assets/css/ComponentScss/FriendCard.css'
import { checkUserStatus, getUserByUsername, updateUser } from "../assets/Util/Util";

export class FriendCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friendData: {},
            user: {}
        }
    }
    
    redirect = () => {
        window.location.href = '/user/0'
    }

    async componentDidMount() {
        checkUserStatus();
        const f = await getUserByUsername(this.props.friend);
        this.setState({friendData: f});
    }

    
    async addRequest () {
        const friend = this.state.friendData;
        friend.helpRequests.push(localStorage.getItem('user'));
        await updateUser(friend.id, friend);
        this.setState({ friendData: friend });
    }

    async acceptRequest () {
        const user = this.props.user;
        user.helpRequests = user.helpRequests.filter(name => name !== this.props.friend);
        await updateUser(user.id, user);
        this.setState({ user: user });
    }

    render() {
        return (
            <div className={"friendCard"}>
                {/* Map user information here & see if anyone request Lift */}
                <div>
                    <p> {this.props.friend} </p>
                    {this.state.friendData.helpRequests && this.state.friendData.helpRequests.includes(this.props.user.userName) ? <div> Pending Spotter Request </div>: <button className={'buttonRed'} onClick={() => this.addRequest()}> SPOT ME! </button>}
                    {this.props.user && (this.props.user.helpRequests.includes(this.props.friend)) && <button className={'buttonGreen'} onClick={() => this.acceptRequest()}> ACCEPT SPOT REQUEST </button>}
                </div>
            </div>
        );      
    }
}