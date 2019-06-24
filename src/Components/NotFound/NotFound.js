import React from 'react';
import './NotFound.css';
import NotFoundImage from './NotFound.png';
import { Col } from 'react-bootstrap';

export const NotFound = () =>{
    return (
        <Col md={{ span: 4, offset: 3 }} className='pt-5 animated fadeIn'>
            <div className='notFound'>
                <h1>404!</h1>
                <p>No existe esta página</p>
                <figure>
                    <img src={NotFoundImage} alt=""/>
                </figure>
            </div>
        </Col>
    );
}