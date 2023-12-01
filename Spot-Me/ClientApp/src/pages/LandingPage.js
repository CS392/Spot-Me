import React, {Component} from "react";
import { ExerciseCard } from '../components/ExerciseCard';
import { ProfileDateCard } from "../components/ProfileDateCard";
import { exerciseArray } from '../assets/Util/ExerciseType';
import weight from '../assets/images/weight-gym-svgrepo-com.svg';
import '../assets/css/HomePage.css';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        //plan display
        const date = new Date();
        let tmpDateList = [];
        for (let i = 2; i > -3; i--) {
            const tmpDate = new Date();
            tmpDate.setDate(date.getDate() - i);
            tmpDateList.push(tmpDate);
        }
        this.state = {
            user: {},
            exercise: 'back',
            dateData: [],
            dateList: tmpDateList,
        };
    }

    handleExerciseClick = async (exerciseType) => {
        this.setState({ exercise: exerciseType });

        try {
            const response = await fetch(`https://localhost:7229/api/excerciseDB/data?type=${exerciseType}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            this.refs.childComponent.setState({ exercises: data });
        } catch (error) {
            console.error("Error fetching exercise data:", error.message);
        }
    };

    componentDidMount() {
        const user = localStorage.getItem('user');
        fetch(`https://localhost:7229/api/user/username/${user}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('User:', data);
                this.setState({ user: data });
            })
            .catch((e) => console.log('Users Fetch Error:', e));



        //Calendar code
        fetch('https://localhost:7229/api/calendar/credentials')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.text();
            })
            .then((data) => {
                if (data.trim() === '') {
                    console.log('No upcoming events');

                } else {
                    console.log('Upcoming events found');
                    console.log('Users:', data);

                    const lines = data.trim().split('\n');
                    const tupleArray = [];

                    for (let i = 0; i < lines.length; i += 3) {
                        const activity = lines[i].split(': ')[1]?.trim() || 'Unknown Activity';
                        const date = lines[i + 1].split(': ')[1]?.trim() || 'Unknown Date';
                        tupleArray.push([date, activity]);
                    }

                    console.log('Tuple Array:', tupleArray);
                    this.setState({ dateData: tupleArray })
                    console.log('TArray:', this.state.dateData);



                }
            })
            .catch((error) => console.log('Users Fetch Error:', error));

    }

    render() {
        return (
            <section>
                <div className={'homeIntroduction'}>
                    <div>
                        <div>
                            <h1> Work harder. <br/> be better.</h1>
                            <p> Do what is impossible, be the best version of your self for a better tomorrow.</p>

                        </div>
                    </div>
                    <div>
                        <img src={weight} alt={"Weight Image"}/>
                    </div>
                </div>

                {/* Redirect to Tracker Page */}
                <div>
                    <button className={'homeRedirect'} onClick={() => window.location.href = '/signup'}> Start Now </button>
                </div>

                <div className={'recommendation'}>
                    <div>
                        <div>
                            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF8C00FF" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.288"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M12 18V12M15 15.001L9 15M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <h4> Track your schedule </h4>
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg fill="#fff" width="64px" height="64px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>friend</title> <path d="M17.25 20.5c1.281 0.719 2 1.906 1.875 3.125-0.063 0.75-0.031 0.75-1 0.875-0.594 0.063-4.375 0.094-8.219 0.094-4.375 0-8.938-0.031-9.281-0.125-1.281-0.344-0.531-2.719 1.156-3.844 1.344-0.844 4.063-2.156 4.813-2.313 1.031-0.219 1.156-0.875 0-2.844-0.25-0.469-0.531-1.813-0.563-3.25-0.031-2.313 0.375-3.875 2.406-4.656 0.375-0.125 0.813-0.188 1.219-0.188 1.344 0 2.594 0.75 3.125 1.844 0.719 1.469 0.375 5.313-0.375 6.719-0.906 1.594-0.813 2.094 0.188 2.344 0.625 0.156 2.688 1.125 4.656 2.219zM24.094 18.531c1 0.531 1.563 1.5 1.469 2.438-0.031 0.563-0.031 0.594-0.781 0.688-0.375 0.063-2.344 0.094-4.656 0.094-0.406-0.969-1.188-1.844-2.25-2.406-1.219-0.688-2.656-1.406-3.75-1.875 0.719-0.344 1.344-0.625 1.625-0.688 0.781-0.188 0.875-0.625 0-2.188-0.219-0.375-0.469-1.438-0.5-2.563-0.031-1.813 0.375-3.063 1.938-3.656 0.313-0.094 0.656-0.156 0.969-0.156 1.031 0 2 0.563 2.406 1.438 0.531 1.156 0.281 4.156-0.281 5.281-0.688 1.25-0.625 1.625 0.156 1.813 0.5 0.125 2.094 0.906 3.656 1.781z"></path> </g></svg>
                            <h4> Socialize with Friends </h4>
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg fill="#fff" width="64px" height="64px" viewBox="0 0 15 15" id="fitness-centre" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="daec40ff-71f5-4432-9d75-dcba7b9c1b89" d="M14.5,7V8h-1v2h-1v1H11V8H4v3H2.5V10h-1V8H.5V7h1V5h1V4H4V7h7V4h1.5V5h1V7Z"></path> </g></svg>
                            <h4> Varies Exercise Programs</h4>
                        </div>
                    </div>
                </div>

                <h1 className={"homeH1"}> Exercise Areas </h1>

                <div className={'selections'}>
                    {exerciseArray.map((exercise) => (
                        <button key={exercise} onClick={() => this.handleExerciseClick(exercise)}>
                            {exercise}
                        </button>
                    ))}
                </div>

                {/*<section className={'exerciseTypes'}>*/}
                {/*    <ExerciseCard key={this.state.exercise} type={this.state.exercise} ref="childComponent" />*/}
                {/*</section>*/}

                <section className={'calendar'}>
                    <h4> Upcoming Events: {this.state.dateData.map((type) => {
                        return <h3 style={{ fontSize: '12px' }}>{type[0]+ "  "+type[1] + " "}</h3>;
                    })}</h4>
                </section>
                <section>
                    <h4> Weekly Schedule</h4>
                    <div className={'profileDate'}>
                        {this.state.dateList.map((date) => {
                            return <ProfileDateCard date={date} />
                        })}
                    </div>
                </section>
            </section>
        );
    }
}