import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQiuz/FinishedQiuz';

class Quiz extends Component {
	state = {
		results: {},	// { [id]: 'success'/'error' }
		isFinished: false,
		activeQuestion: 0,
		answerState: null,	// { [id]: 'success'/'error' }
		quiz: [
			{
				question: 'What\'s sky color?',
				rightAnswerID: 2,
				id: 1,
				answers: [
					{id: 1, text: 'Black'},
					{id: 2, text: 'Blue'},
					{id: 3, text: 'Red'},
					{id: 4, text: 'Green'}
				]
			},
			{
				question: 'What year St.Petersbug was founded?',
				rightAnswerID: 3,
				id: 2,
				answers: [
					{id: 1, text: '1700'},
					{id: 2, text: '1702'},
					{id: 3, text: '1703'},
					{id: 4, text: '1803'}
				]
			}
		]
	};

	onAnswerClickHandler = (answerID) => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0];
			if (this.state.answerState[key] === 'success') {
				return;
			}
		}

		console.log('Answer ID:', answerID);

		const question = this.state.quiz[this.state.activeQuestion];
		const results = this.state.results;

		if (question.rightAnswerID === answerID) {
			if(!results[question.id]) {
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

	retryHandler= () => {
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

					{
						this.state.isFinished ?
							<FinishedQuiz
								results={this.state.results}
								quiz={this.state.quiz}
								onRetry={this.retryHandler}
							/>
							:
							< ActiveQuiz
								answers={this.state.quiz[this.state.activeQuestion].answers}
								question={this.state.quiz[this.state.activeQuestion].question}
								onAnswerClick={this.onAnswerClickHandler}
								quizLength={this.state.quiz.length}
								answerNumber={this.state.activeQuestion + 1}
								state={this.state.answerState}
							/>
					}
				</div>
			</div>
		);
	}
}

export default Quiz;
