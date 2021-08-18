import React from 'react'
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logo from '../../logo.svg';
import './styles.scss'

const Nav = () => {
    return (
        <nav className="px-3">
            <img src={logo} className="w-50 mx-auto my-3 d-block" alt="" />
            <ListGroup flush>
                <ListGroupItem>
                    <Link to="/">Lista de usuarios</Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to="/load">Carga desde archivo</Link>
                </ListGroupItem>
            </ListGroup>
        </nav>
    )
}

export default Nav