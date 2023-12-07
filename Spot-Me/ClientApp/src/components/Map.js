import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import UserMarker from "./UserMarker";
import { updateUser, checkUserStatus } from "../assets/Util/Util";
export class Map extends Component {
  // constructor for Map component
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 15,
      nearbyLocations: [],
      user: {},
      friendLocations: []
    };
  }
  // Async function to get the user's current location
  async getLocation(){
    // Get the user's current location
    try {
      const apiUrl = `https://localhost:7229/api/geolocate`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // return user location data as json
      const data = await response.json();

      // set the center of the map to the user's location
      this.setState({
        center: {
          lat: data.location.lat,
          lng: data.location.lng
        }
      })

      // return the user location data
      return data;
    } catch (error) {
      // if there is an error, log it
      console.error("Error fetching exercise data:", error.message);
    }
  }

  // Async function to get nearby gym locations
  async getNearbyLocations() {
    try {
      // get lat + long of user
      const locationData = await this.getLocation();

      // get user data
      const user = localStorage.getItem('user');
      const res = await fetch(`https://localhost:7229/api/user/username/${user}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // update user data with lat + long
      const data = await res.json();
      data.location.latitude = locationData.location.lat;
      data.location.longitude = locationData.location.lng;
      this.setState({ user: data });
      updateUser(data.id, data);

      // get friend locations
      const friends = data.friends;
      for (let i = 0; i < friends.length; i++) {
        const friend = await fetch(`https://localhost:7229/api/user/username/${friends[i]}`);
        if (!friend.ok) {
          throw new Error(`HTTP error! Status: ${friend.status}`);
        }
        const friendData = await friend.json();
        const friendLocationData = {
          name:friendData.userName,
          latitude: friendData.location.latitude,
          longitude: friendData.location.longitude
        }
        // add friend location to state
        this.setState({ friendLocations: [...this.state.friendLocations, friendLocationData] });
      }

      if (locationData) {
        // get nearby gym locations
        const apiUrl = `https://localhost:7229/api/map/places/nearby?latitude=${locationData.location.lat}&longitude=${locationData.location.lng}&radius=1000`;
        const response = await fetch(apiUrl);

        // if there is an error, log it
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // return nearby gym locations as json
        const data = await response.json();

        // map nearby gym locations to an array of objects
        const NearbyGyms= data.results.map(gym => ({
          name: gym.name,
          latitude: gym.geometry.location.lat,
          longitude: gym.geometry.location.lng
        }));

        // set nearby gym locations to state
        this.setState({
          nearbyLocations: NearbyGyms
        });
      }
    } catch (error) {
      console.error("Error fetching nearby locations:", error.message);
    }
  }
  
  // get nearby gym locations on component mount
  componentDidMount() {
    
    // check if user is logged in ref = "../assets/Util/Util"
    checkUserStatus();

    // get nearby gym locations
    this.getNearbyLocations();
  }
  // render the map component
  render() {
    return (

      <div style={{ height: '85vh', width: '100%'}}>

        <GoogleMapReact // Google Maps API component
          bootstrapURLKeys={{ key: "AIzaSyCDzY8GN4vjP4cEwoc1Lc5tuQCnpVK2TW0" }}
          defaultCenter={{lat : 0, long : 0}}
          defaultZoom={this.state.zoom}
          center={this.state.center}
        >
          <UserMarker // User marker component
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            name={"USER"}
            User={true}
          />
          
          {this.state.nearbyLocations.map((gym, index) => (
            <UserMarker // Gym marker component
              key={index}
              lat={gym.latitude}
              lng={gym.longitude}
              name={gym.name}

            />
            
          ))}

          {this.state.friendLocations.map((friend, index) => (
            <UserMarker // Friend marker component ref = "./UserMarker"
              key={index}
              lat={friend.latitude}
              lng={friend.longitude}
              name={friend.name}
              friend={true}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

