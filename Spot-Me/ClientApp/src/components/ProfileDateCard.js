import React, {Component} from "react";
import '../assets/css/ComponentScss/ProfileDateCard.css';

export class ProfileDateCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date
        }
    }
    render() {
        return (
            <>
                <div className={'profileDateCard'}>
                    <p> {this.state.date.toLocaleDateString()}</p>
                    <p>  Exercise Type </p>
                </div>
            </>)
    }       
}