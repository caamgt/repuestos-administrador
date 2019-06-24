import React  from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';

export const ButtonBackToRepuestos = () => {
    return(
        <Link
            className="button is-info"
            to='/listadorepuestos'
        >
            <Button variant="secondary" type='submit'>
                <FontAwesomeIcon icon={faArrowCircleLeft}/>&nbsp;Regresar
            </Button>
        </Link>
    );
}