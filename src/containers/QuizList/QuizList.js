import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'components/UI/Loader/Loader';
import { loadQuizes } from 'store/actions/quiz';
import classes from './QuizList.module.scss';

class QuizList extends Component {
    renderQuizes() {
        const { quizes } = this.props;

        return quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
                </li>
            );
        });
    }

    componentDidMount() {
        const { loadQuizList } = this.props;
        loadQuizList();
    }

    render() {
        const { loading, quizes } = this.props;
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz List</h1>

                    {loading && quizes.length !== 0 ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
                </div>
            </div>
        );
    }
}

QuizList.propTypes = {
    loadQuizList: PropTypes.func,
    loading: PropTypes.bool,
    quizes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        })
    )
};

QuizList.defaultProps = {
    loadQuizList: null,
    loading: true,
    quizes: null
};

function mapSTateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadQuizList: () => dispatch(loadQuizes())
    };
}

export default connect(mapSTateToProps, mapDispatchToProps)(QuizList);
