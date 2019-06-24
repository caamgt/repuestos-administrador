import React, { Component } from "react";
import '../Sidebar/Sidebar.css';
import {MainContainer} from '../MainContainer/MainContainer';
import { Col } from "react-bootstrap";
export class Home extends Component {
  render() {
    return (
        <Col xs={12} sm={12} md={8} lg={9} xl={10}  className='animated fadeIn'>
            <MainContainer />
        </Col>
    );
  }
}
