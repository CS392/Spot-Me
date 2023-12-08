import React, {Component} from "react";
import {FriendCard} from "./FriendCard";

export class FriendStatusBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockHeader: this.props.header,
            showMain: true,
            user: this.props.user
        };
    }

    componentDidUpdate() {
        if (this.state.user !== this.props.user) {
            this.setState({user: this.props.user})
        }
    }
    
    // Toggle the visibility of the friends section
    toggleMainVisibility = () => {
        this.setState({
            showMain: !this.state.showMain
        })
    }
    
    render() {
        return (
            <section>
                <div className={'blockHeader'} 
                     onClick={this.toggleMainVisibility}>
                    <h4> {this.state.blockHeader} </h4>
                    <h4> {this.props.user.friends && this.props.user.friends.length} </h4>
                </div>
                <hr/>
                {/* Loop through friends with required information */}
                {this.state.showMain && <main id={`${this.state.blockHeader}-main`}>
                    {this.state.user.friends && this.state.user.friends.map((friend, index) => {
                        return <FriendCard key={index} friend={friend} user={this.state.user}/>
                    })}
                </main>}
            </section>
        )
    }
}
