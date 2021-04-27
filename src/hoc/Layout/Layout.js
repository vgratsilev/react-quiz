import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MenuToggle from 'components/Navigation/MenuToggle/MenuToggle';
import Drawer from 'components/Navigation/Drawer/Drawer';
import classes from './Layout.module.scss';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: false
        };
    }

    toggleMenuHandler = () => {
        this.setState((prevState) => ({
            menu: !prevState.menu
        }));
    };

    menuCloseHandler = () => {
        this.setState({ menu: false });
    };

    render() {
        const { menu } = this.state;
        const { isAuthenticated, children } = this.props;

        return (
            <div className={classes.Layout}>
                <Drawer isOpen={menu} onClose={this.menuCloseHandler} isAuthenticated={isAuthenticated} />
                <MenuToggle onToggle={this.toggleMenuHandler} isOpen={menu} />
                <main>{children}</main>
            </div>
        );
    }
}

Layout.propTypes = {
    isAuthenticated: PropTypes.bool,
    children: PropTypes.element
};

Layout.defaultProps = {
    isAuthenticated: false,
    children: null
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    };
}

export default connect(mapStateToProps)(Layout);
