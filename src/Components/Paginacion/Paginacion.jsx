import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

export class Paginacion extends Component {
    
    render() {
        
        const {repuestosList} = this.props;
        console.log(repuestosList);

        let active = 2;
            let items = [];
            for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                {number}
                </Pagination.Item>,
            );
            }


        return(
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        );
    }
}