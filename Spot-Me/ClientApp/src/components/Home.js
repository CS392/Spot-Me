import React, { Component } from 'react';
import {ExerciseCard} from "./ExerciseCard";
import {exerciseArray} from "../assets/Util/ExerciseType";
import '../assets/css/HomePage.css'

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = {
      users: {}
    };
  }
  
  componentDidMount() {
    fetch("https://localhost:7229/api/user")
      .then(res => res.json())
      .then(d => {
        console.log(d);
        this.setState({users: d});
      })
      .catch(e => console.log(e));
  }

  render() {
    console.log(this.state.users);
    return (
        <section>
          {/* Disable for second time user */}
          <div className={"welcome"}>
            <h2> Welcome user </h2>
          </div>
          <div className={"selections"}>
              { exerciseArray.map((exercise) => {
                  return <button> {exercise} </button>
              })}
          </div>
          <section className={'exerciseTypes'}>
            <ExerciseCard imageUrl={"Useless"} desc={"Potato"}/>
          </section>
        </section>
    );
  }
}
