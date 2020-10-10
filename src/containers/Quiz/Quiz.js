import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQiuz/FinishedQiuz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {
	state = {
		results: {},		// { [id]: 'success'/'error' }
		isFinished: false,
		activeQuestion: 0,
		answerState: null,	// { [id]: 'success'/'error' }
		quiz: [],
		loading: true
	};

	async componentDidMount() {
		try {
			const response = await axios.get(`Quizes/${this.props.match.params.id}.json`);

			const quiz = response.data;

			this.setState({
				quiz,
				loading: false
			});
		} catch (e) {
			console.log(e);
		}
	}

	onAnswerClickHandler = (answerID) => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0];
			if (this.state.answerState[key] === 'success') {
				return;
			}
		}

		const question = this.state.quiz[this.state.activeQuestion];
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

					{this.state.loading
						? <Loader/>
						: this.state.isFinished ?
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
