import React  from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

export const ButtonBackToHome = () => {
    return(
        <Link
            className="button is-info"
            to='/listadorepuestos'
        >
            <Button variant="secondary" type='submit'>
                <FontAwesomeIcon icon={faHome}/>&nbsp;Inicio
            </Button>
        </Link>
    );
}