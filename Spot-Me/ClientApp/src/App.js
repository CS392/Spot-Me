import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './assets/Util/AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        {/*  Routing that iterates over all the object within AppRoutes and link it to a component */}
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    );
  }
}
