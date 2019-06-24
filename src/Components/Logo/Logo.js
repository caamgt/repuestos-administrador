import React from 'react';
import logo from './logo-glt.png';
import {Link} from 'react-router-dom';
import './Logo.css';

export const Logo = () => {
    return (
        <Link to={'/'}><img className='logo' src={logo} alt={logo}/></Link>
    );
}