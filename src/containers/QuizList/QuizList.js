import React, {Component} from 'react';
import classes from './QuizList.module.scss'
import {NavLink} from 'react-router-dom';

export default class QuizList extends Component {

	renderQuizes() {
		return [1,2,3].map((quiz, index) => {
			return(
				<li key={index}>
					<NavLink
						to={'/quiz/' + quiz}
					>
						Test {quiz}
					</NavLink>
				</li>
			)
		});
	}

	componentDidMount() {
		fetch('https://react-quiz-202fc.firebaseio.com/quiz.json')
			.then(response => response.json())
			.then(json => console.log(json))
	}

	render() {
		return (
			<div className={classes.QuizList}>
				<div>
					<h1>Quiz List</h1>

					<ul>
						{this.renderQuizes()}
					</ul>
				</div>
			</div>
		)
	}
}
