import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import UserMarker from "./UserMarker";
import { updateUser, checkUserStatus } from "../assets/Util/Util";
export class Map extends Component {
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
  async getLocation(){
    try {
      const apiUrl = `https://localhost:7229/api/geolocate`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({
        center: {
          lat: data.location.lat,
          lng: data.location.lng
        }
      })
      return data;
    } catch (error) {
      console.error("Error fetching exercise data:", error.message);
    }
  }

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
        this.setState({ friendLocations: [...this.state.friendLocations, friendLocationData] });
      }

      if (locationData) {
        const apiUrl = `https://localhost:7229/api/map/places/nearby?latitude=${locationData.location.lat}&longitude=${locationData.location.lng}&radius=1000`;
        const response = await fetch(apiUrl);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const NearbyGyms= data.results.map(gym => ({
          name: gym.name,
          latitude: gym.geometry.location.lat,
          longitude: gym.geometry.location.lng
        }));
        this.setState({
          nearbyLocations: NearbyGyms
        });
      }
     
    } catch (error) {
      console.error("Error fetching nearby locations:", error.message);
    }
  }
  
  componentDidMount() {
    checkUserStatus();
    this.getNearbyLocations();
  }
  render() {
    return (

      <div style={{ height: '85vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCDzY8GN4vjP4cEwoc1Lc5tuQCnpVK2TW0" }}
          defaultCenter={{lat : 0, long : 0}}
          defaultZoom={this.state.zoom}
          center={this.state.center}
        >
          <UserMarker
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            name={"USER"}
            User={true}
          />
          
          {this.state.nearbyLocations.map((gym, index) => (
            <UserMarker
              key={index}
              lat={gym.latitude}
              lng={gym.longitude}
              name={gym.name}

            />
            
          ))}

          {this.state.friendLocations.map((friend, index) => (
            <UserMarker
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

