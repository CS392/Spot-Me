import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

class UserMarker extends Component {
  render() {
    const { name, User, friend } = this.props;

    const markerStyle = {
      width: 15,
      height: 15,
      borderRadius: '50%',
      backgroundColor: User ? "yellow" : friend ? "blue" : "red",
      border: "3px solid white",
    };

    const textStyle = {
      position: 'relative',
      bottom: '17px',
      left: '15%',
      color: '#333',
      fontSize: 13,
      whiteSpace: 'nowrap',
      zIndex: 2,
    };

    return (
        User ? (
            <div style={markerStyle}>
            <p style={textStyle}>{name}</p>
          </div>
        ) : (
          friend ? (
            <Link to={`/user/${name}`} style={{ textDecoration: 'none' }}>
            <div style={markerStyle}>
              <p style={textStyle}>{name}</p>
            </div>
            </Link>
          ) : (
            <Link to={`/gym/${name}`} style={{ textDecoration: 'none' }}>
            <div style={markerStyle}>
              <p style={textStyle}>{name}</p>
            </div>
          </Link>
        )
      )
    );
    }
  }
export default UserMarker;
