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
    
    clicked = (key) => {
        let element = document.getElementById(key);
        if (element.classList.contains('inprogress')) {
            element.classList.remove('inprogress');
            element.classList.add('done');
        } else {
            element.classList.remove('done');
            element.classList.add('inprogress');
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
                                    Object.keys(All_dates[date]).map((exercisePart, exerciseIndex) => (
                                            <div className={'inprogress'} key={All_dates[date][exercisePart]}
                                                 id={`${All_dates[date][exercisePart].toString().replaceAll(" ", "")}-${date}`} 
                                                 onClick={() => this.clicked(`${All_dates[date][exercisePart].toString().replaceAll(" ", "")}-${date}`)}>
                                                <p style={{fontWeight: 'bolder'}}> {exercisePart} </p>
                                                <p style={{fontSize: '12px'}}>{All_dates[date][exercisePart]} </p>
                                            </div>
                                        ))
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