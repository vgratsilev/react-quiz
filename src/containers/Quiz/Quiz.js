import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActiveQuiz from 'components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from 'components/FinishedQiuz/FinishedQiuz';
import Loader from 'components/UI/Loader/Loader';
import { loadQuizByID, quizAnswerClick, quizRetry } from 'store/actions/quiz';
import classes from './Quiz.module.scss';

class Quiz extends Component {
    componentDidMount() {
        const { loadQuiz, match } = this.props;
        const { id } = match.params;
        loadQuiz(id);
    }

    componentWillUnmount() {
        const { retryQuiz } = this.props;
        retryQuiz();
    }

    render() {
        const { loading, quiz, isFinished, results, retryQuiz, activeQuestion, quizAnswerClickHandler, answerState } = this.props;

        const showLoader = loading || !quiz.length > 0;
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer the questions:</h1>

                    {showLoader && <Loader />}
                    {!showLoader && isFinished && <FinishedQuiz results={results} quiz={quiz} onRetry={retryQuiz} />}
                    {!showLoader && !isFinished && (
                        <ActiveQuiz
                            answers={quiz[activeQuestion]?.answers}
                            question={quiz[activeQuestion]?.question}
                            onAnswerClick={quizAnswerClickHandler}
                            quizLength={quiz.length}
                            answerNumber={activeQuestion + 1}
                            state={answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

Quiz.propTypes = {
    loadQuiz: PropTypes.func,
    retryQuiz: PropTypes.func,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.node
        }).isRequired
    }).isRequired,
    loading: PropTypes.bool,
    isFinished: PropTypes.bool,
    quiz: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            question: PropTypes.string,
            rightAnswerID: PropTypes.number,
            answers: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    text: PropTypes.string
                })
            )
        })
    ),
    results: PropTypes.shape({
        id: PropTypes.string
    }),
    activeQuestion: PropTypes.number,
    quizAnswerClickHandler: PropTypes.func,
    answerState: PropTypes.shape({
        id: PropTypes.string
    })
};

Quiz.defaultProps = {
    loadQuiz: null,
    retryQuiz: null,
    loading: true,
    isFinished: false,
    quiz: [],
    results: null,
    activeQuestion: 0,
    quizAnswerClickHandler: null,
    answerState: null
};

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadQuiz: (ID) => dispatch(loadQuizByID(ID)),
        quizAnswerClickHandler: (answerID) => dispatch(quizAnswerClick(answerID)),
        retryQuiz: () => dispatch(quizRetry())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
