import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  // Layout file for React Routing
  render() {
    return (
      <div>
        <NavMenu />
        <Container>
            <main>
                {this.props.children}
            </main>
        </Container>
      </div>
    );
  }
}
