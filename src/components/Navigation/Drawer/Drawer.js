import React, { Component } from 'react';
import classes from './Drawer.module.scss';
import BackDrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom'

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose();
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        });
    }

    render() {
        const cls = [
            classes.Drawer
        ];

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const links = [{
            to: '/',
            label: 'List',
            exact: true
        }];

        console.log('Auth', this.props.isAuthenticated);

        if (this.props.isAuthenticated) {
            links.push({
                to: '/quiz-creator',
                label: 'Create Quiz',
                exact: false
            });
            links.push({
                to: '/logout',
                label: 'Logout',
                exact: false
            });
        } else {
            links.unshift({
                to: '/auth',
                label: 'Authorization',
                exact: false
            });
        }

        return (
            <>
                <nav
                    className={cls.join(' ')}
                >
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen &&
                <BackDrop onClick={this.props.onClose}/>
                }
            </>
        )
    }
}

export default Drawer;
