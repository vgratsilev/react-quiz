import React, {Component} from 'react';
import classes from './QuizList.module.scss'
import {NavLink} from 'react-router-dom';

export default class QuizList extends Component {

	state = {
		quizes: []
	}

	renderQuizes() {
		return this.state.quizes.map((quiz) => {
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

	async componentDidMount() {
		try {
			const response = await fetch('https://react-quiz-202fc.firebaseio.com/Quizes.json');
			if (response.ok) {
				const json = await response.json();

				const quizes = [];
				Object.keys(json).forEach((key, index) => {
					quizes.push({
						id: key,
						name: `Test №${index+1}`
					});
				});
				this.setState({quizes});
			} else {
				console.log(`Error ${response.status}`);
			}

		} catch (e) {
			console.log(e);
		}
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
