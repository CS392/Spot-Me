import React, {Component} from "react";
import {FriendCard} from "./FriendCard";

export class FriendStatusBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockHeader: this.props.header,
            showMain: true
        };
    }
    
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
                    <h4> 0 </h4>
                </div>
                <hr/>
                {this.state.showMain && <main id={`${this.state.blockHeader}-main`}>
                    <FriendCard/>
                </main>}
            </section>
        )
    }
}
