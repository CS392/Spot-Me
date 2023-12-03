import React, {Component} from "react";
import { Link } from "react-router-dom";
import '../assets/css/ComponentScss/ProfileDateCard.css';

export class ProfileDateCard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            user: this.props.user,


        }
    }
    componentDidUpdate(){
        //console.log(this.state.date)
        
        //console.log(this.props.user.exercise)
        if(this.state.user !== this.props.user){
            this.setState({user: this.props.user})
        }

    }
    
    render() {
        const ExercisePageRoute = `/exercise/${this.state.date.toLocaleDateString().replaceAll("/", '-')}`;
        const All_dates = this.state.user.exercise;
    
        console.log(this.state.user);
    
        return (
            <>
                <section className={'dateCardSection'}>
                    <p> {this.state.date.toLocaleDateString()} </p>
                    {All_dates &&
                        Object.keys(All_dates).map((date, dateIndex) => {
                            console.log(date.replaceAll("-", '/'));
                            console.log(All_dates[date]);
    
                            // Check if the date matches the current date
                            if (date.replaceAll("-", '/') == this.state.date.toLocaleDateString()) {
                                return (
                                    <div key={dateIndex}>
                                        <p> Body Type: {Object.keys(All_dates[date])} </p>
                                        <p> Exercise: </p>
                                        {Object.keys(All_dates[date]).map((exercisePart, exerciseIndex) => (
                                            <div key={exerciseIndex}>
                                                <p>{All_dates[date][exercisePart]} </p>
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                        })}
    
                    {this.props.perms && (
                        <div onClick={() => (window.location.href = ExercisePageRoute)}>
                            <p> + </p>
                        </div>
                    )}
                </section>
            </>
        );
    }
    
    
}