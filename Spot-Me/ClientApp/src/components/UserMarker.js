import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

class UserMarker extends Component {
  render() {
    // Get the name, User, and friend props from the Map component
    const { name, User, friend } = this.props;

    // Set the marker style
    const markerStyle = {
      width: 15,
      height: 15,
      borderRadius: "50%",
      backgroundColor: User ? "yellow" : friend ? "blue" : "red", // check what kind of marker to render. User = yellow, friend = blue and gym = red
      border: "3px solid white",
    };
    // Set the text style
    const textStyle = {
      position: "relative",
      bottom: "17px",
      left: "15%",
      color: "#333",
      fontSize: 13,
      whiteSpace: "nowrap",
      zIndex: 2,
    };

    return (
      // If the marker is a user marker, render the marker with a link to the user's profile
      User ? (
        // user marker
        <div style={markerStyle}>
          <p style={textStyle}>{name}</p>
        </div>
      ) : // friend marker
      friend ? (
        <Link to={`/user/${name}`} style={{ textDecoration: "none" }}>
          <div style={markerStyle}>
            <p style={textStyle}>{name}</p>
          </div>
        </Link>
      ) : (
        // gym marker
        <div style={markerStyle}>
          <p style={textStyle}>{name}</p>
        </div>
      )
    );
  }
}
export default UserMarker;
