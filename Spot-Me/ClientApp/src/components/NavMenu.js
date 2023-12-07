import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../assets/css/ComponentScss/NavMenu.css'
import { logout } from '../assets/Util/Util';
export class NavMenu extends Component {
  static displayName = NavMenu.name;
  //nav bar that displays the menu and redirect the user to different pages
  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">Spot Me</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              {
                localStorage.getItem("user") === null &&
                  <>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/"> About Us </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/login"> Login </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/signup"> Sign Up </NavLink>
                    </NavItem>
                  </>
              }
              {
                localStorage.getItem("user") !== null &&
                  <>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/home"> Home </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/friends"> Friends </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/profile"> Profile </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/map"> Map </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/" onClick={logout}> Logout </NavLink>
                    </NavItem>
                  </>
              }
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
