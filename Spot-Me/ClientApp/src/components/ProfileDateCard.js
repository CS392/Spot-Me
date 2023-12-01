import React, {Component} from "react";
import { Link } from "react-router-dom";
import '../assets/css/ComponentScss/ProfileDateCard.css';

export class ProfileDateCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date
        }
    }
    render() {

        const ExercisePageRoute = `/exercise/${this.state.date.toLocaleDateString().replaceAll("/", '-')}`;
        return (
            <>
                <Link className={'profileDateCard'} to = {ExercisePageRoute}>
                    <p> {this.state.date.toLocaleDateString()}</p>
                    <p>  Exercise Type </p>
                </Link>
            </>)
    }       
}