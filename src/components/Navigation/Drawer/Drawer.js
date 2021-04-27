import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackDrop from 'components/UI/Backdrop/Backdrop';
import classes from './Drawer.module.scss';

class Drawer extends Component {
    clickHandler = () => {
        const { onClose } = this.props;
        onClose();
    };

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>
                    <NavLink to={link.to} exact={link.exact} activeClassName={classes.active} onClick={this.clickHandler}>
                        {link.label}
                    </NavLink>
                </li>
            );
        });
    }

    render() {
        const cls = [classes.Drawer];
        const { isOpen, isAuthenticated, onClose } = this.props;

        if (!isOpen) {
            cls.push(classes.close);
        }

        const links = [
            {
                to: '/',
                label: 'List',
                exact: true
            }
        ];

        if (isAuthenticated) {
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
                <nav className={cls.join(' ')}>
                    <ul>{this.renderLinks(links)}</ul>
                </nav>
                {isOpen && <BackDrop onClick={onClose} />}
            </>
        );
    }
}

Drawer.propTypes = {
    isAuthenticated: PropTypes.bool,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};

Drawer.defaultProps = {
    isAuthenticated: false,
    isOpen: false,
    onClose: null
};

export default Drawer;
