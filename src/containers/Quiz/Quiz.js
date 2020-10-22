import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQiuz/FinishedQiuz';
//import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { loadQuizByID } from '../../store/actions/quiz';

class Quiz extends Component {
    // state = {
    //     results: {},		// { [id]: 'success'/'error' }
    //     isFinished: false,
    //     activeQuestion: 0,
    //     answerState: null,	// { [id]: 'success'/'error' }
    //     quiz: [],
    //     loading: true
    // };

    componentDidMount() {
        this.props.loadQuizByID(this.props.match.params.id)
    }

    onAnswerClickHandler = (answerID) => {
        if (this.props.answerState) {
            const key = Object.keys(this.props.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.props.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerID === answerID) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: {[answerID]: 'success'},
                results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true});
                    console.log('Finished');
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeout);
            }, 1000)

        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerID]: 'error'},
                results
            });
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        });
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer the questions:</h1>

                    {this.props.loading || !this.props.quiz
                        ? <Loader/>
                        : this.props.isFinished ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.retryHandler}
                            />
                            :
                            < ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
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
        loadQuizByID: (ID) => dispatch(loadQuizByID(ID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
