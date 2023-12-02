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
                <section className={'dateCardSection'}>
                    <p> {this.state.date.toLocaleDateString()} </p>
                    <div>
                        <p> Body Type: </p>
                        <p> Exercise name: </p>
                    </div>
                    
                    <div onClick={() => window.location.href = ExercisePageRoute}>
                        <p> + </p>
                    </div>
                </section>
            </>)
    }       
}