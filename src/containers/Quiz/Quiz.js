import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQiuz/FinishedQiuz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { loadQuizByID, quizAnswerClick, quizRetry } from '../../store/actions/quiz';

class Quiz extends Component {

    componentDidMount() {
        this.props.loadQuizByID(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.quizRetry();
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer the questions:</h1>

                    {this.props.loading || !this.props.quiz.length > 0
                        ? <Loader/>
                        : this.props.isFinished ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.props.quizRetry}
                            />
                            :
                            < ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadQuizByID: (ID) => dispatch(loadQuizByID(ID)),
        quizAnswerClick: (answerID) => dispatch(quizAnswerClick(answerID)),
        quizRetry: () => dispatch(quizRetry())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
