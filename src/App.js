import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/auth';

class App extends Component {
    componentDidMount() {
        const { automaticLogin } = this.props;
        automaticLogin();
    }

    render() {
        const { isAuthenticated } = this.props;

        let routes = (
            <Switch>
                <Route path={'/auth'} component={Auth} />
                <Route path={'/quiz/:id'} component={Quiz} />
                <Route path={'/'} exact={true} component={QuizList} />
                <Redirect to={'/'} />
            </Switch>
        );

        if (isAuthenticated) {
            routes = (
                <Switch>
                    <Route path={'/quiz-creator'} component={QuizCreator} />
                    <Route path={'/quiz/:id'} component={Quiz} />
                    <Route path={'/logout'} component={Logout} />
                    <Route path={'/'} exact={true} component={QuizList} />
                    <Redirect to={'/'} />
                </Switch>
            );
        }

        return <Layout>{routes}</Layout>;
    }
}

App.propTypes = {
    isAuthenticated: PropTypes.bool,
    automaticLogin: PropTypes.func
};

App.defaultProps = {
    isAuthenticated: false,
    automaticLogin: null
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        automaticLogin: () => dispatch(autoLogin())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
