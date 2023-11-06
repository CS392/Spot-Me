import React, { Component } from 'react';
import {ExerciseCard} from "./ExerciseCard";
import {exerciseArray} from "../assets/Util/ExerciseType";
import '../assets/css/HomePage.css'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <section>
          {/* Disable for second time user */}
          <div className={"welcome"}>
            <h2> Welcome to Spot Me! </h2>
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
