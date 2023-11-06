import React, { Component } from 'react';
import {ExerciseCard} from "./ExerciseCard";
import '../assets/css/HomePage.css'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
          <ExerciseCard imageUrl={"Useless"} desc={"Potato"}/>
      </div>
    );
  }
}
