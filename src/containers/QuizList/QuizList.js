import React, { Component } from 'react';
import classes from './QuizList.module.scss'
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { loadQuizes } from '../../store/actions/quiz';

class QuizList extends Component {

    renderQuizes() {
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink
                        to={'/quiz/' + quiz.id}
                    >
                        {quiz.name}
                    </NavLink>
                </li>
            )
        });
    }

    componentDidMount() {
        this.props.loadQuizes();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz List</h1>

                    {this.props.loading && this.props.quizes.length !== 0
                        ? <Loader/>
                        :
                        <ul>
                            {this.renderQuizes()}
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapSTateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadQuizes: () => dispatch(loadQuizes())
    }
}

export default connect(mapSTateToProps, mapDispatchToProps)(QuizList);
