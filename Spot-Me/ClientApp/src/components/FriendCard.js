import React, {Component} from "react";
import '../assets/css/ComponentScss/FriendCard.css'

export class FriendCard extends Component {
    
    redirect = () => {
        window.location.href = '/user/1'
    }
    
    render() {
        return (
            <div className={"friendCard"} onClick={this.redirect}>
                <div>
                    <div>
                        Profile Picture
                    </div>
                    <div>
                        random
                    </div>
                    <div> 
                        Status, Last online?
                    </div>
                </div>
            </div>
        );      
    }
}