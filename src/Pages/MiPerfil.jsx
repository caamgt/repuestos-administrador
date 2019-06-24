import React, { Component } from 'react';
import {Perfil} from '../Components/Perfil/Perfil';
import { Col } from 'react-bootstrap';
export class MiPerfil extends Component {
    render() {
        const {user} = this.props;
        return(
            <Col md={{ span: 6, offset: 3 }} className='pt-5 animated fadeIn'>
                {/* <h2 className='text-center'>Mi perfil</h2> */}
                <Perfil user={user}/>
            </Col>
        );
    }
}