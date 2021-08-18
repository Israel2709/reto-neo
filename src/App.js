import React, { useState, useEffect } from 'react';
import './App.scss';

import ListUsers from './Sections/ListUsers'
import UploadFromFile from './Sections/UploadFromFile'
import Nav from './Components/Nav'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  Container,
  Row,
  Col
} from 'reactstrap'


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Container fluid className="p-3">
            <Row>
              <Col xs={12} md={3}>
                <Nav/>
              </Col>
              <Col xs={12} md={9}>
                <Row>
                <Switch>
                  <Route exact path="/">
                    <ListUsers />
                  </Route>
                  <Route path="/load">
                    <UploadFromFile />
                  </Route>
                </Switch>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    </div>
  );
}

export default App;
