import React, {Component} from "react";
import '../assets/css/ComponentScss/FriendCard.css'

export class FriendCard extends Component {

    constructor(props) {
        super(props);
    }
    
    redirect = () => {
        window.location.href = '/user/1'
    }
    
    render() {
        return (
            <div className={"friendCard"} onClick={this.redirect}>
                {/* Map user information here & see if anyone request Lift */}
                <div>
                    <p> {this.props.friend} </p>
                    <button className={'buttonRed'}> Request </button>
                    <button className={'buttonGreen'}> Help </button>
                </div>
            </div>
        );      
    }
}