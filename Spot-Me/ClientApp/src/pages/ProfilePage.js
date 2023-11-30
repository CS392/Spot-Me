import React, {Component} from "react";
import {ProfileDateCard} from "../components/ProfileDateCard";
import '../assets/css/ProfilePage.css';
import { checkUserStatus } from "../assets/Util/Util";

export class ProfilePage extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        let tmpDateList = [];
        for (let i = 2; i > -3; i --) {
            const tmpDate = new Date();
            tmpDate.setDate(date.getDate() - i);
            tmpDateList.push(tmpDate);
        }
        this.state = {
            dateList: tmpDateList,
            dateData: []
        }
        
        for (let i = 0; i < this.state.dateList.length; i ++) {
            console.log(this.state.dateList[i]);
        }
        
    }

    componentDidMount() {
        checkUserStatus();
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
            <>
                <section>
                    <h4> Weekly Schedule</h4>
                    <div className={'profileDate'}>
                        {this.state.dateList.map((date) => {
                            return <ProfileDateCard date={date}/>
                        })}
                    </div>
                    <div className={'profileInformation'}>
                        <img 
                            src={'https://imgs.search.brave.com/8o6_F1VZu3lmFOyCodmVOUEssP3vkLKte3ZevQaDexE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTEz/MTMzOTAwL3Bob3Rv/L2dvbGRlbi1yZXRy/aWV2ZXItc2l0dGlu/Zy1pbi1mcm9udC1v/Zi1hLXdoaXRlLWJh/Y2tncm91bmQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXJQ/dUJnZm5fd2NBemFh/OG8yR2hyQTJlQlRk/YnZyVHZZdzRkZW16/Vi1iT3M9'} alt={"default"}/>
                        <h4> User Name: </h4>
                        <h4> First Name: </h4>
                        <h4> Last Name: </h4>
                        <h4> Email: </h4>
                        <h4> Recent Workout: {this.state.dateData.map((type) => {
                            return <span style={{ fontSize: '12px' }}>{type[1] + " "}</span>;
                        })}</h4>

                    </div>
                </section>
            </>
        )
    }
}