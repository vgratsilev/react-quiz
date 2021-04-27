import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from 'store/actions/auth';

class Logout extends Component {
    componentDidMount() {
        const { logoutUser } = this.props;
        logoutUser();
    }

    render() {
        return <Redirect to={'/'} />;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => dispatch(logout())
    };
}

Logout.propTypes = {
    logoutUser: PropTypes.func
};

Logout.defaultProps = {
    logoutUser: null
};

export default connect(null, mapDispatchToProps)(Logout);
