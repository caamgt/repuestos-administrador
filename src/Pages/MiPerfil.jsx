import React, { Component } from 'react';
import {Perfil} from '../Components/Perfil/Perfil';
import { Col } from 'react-bootstrap';
export class MiPerfil extends Component {
    render() {
        const {user} = this.props;
        return(
            <Col xs={12} sm={12} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 2 }} xl={{ span: 3, offset: 3 }} className='pt-2 animated fadeIn'>
                {/* <h2 className='text-center'>Mi perfil</h2> */}
                <Perfil user={user}/>
            </Col>
        );
    }
}