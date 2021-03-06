import React from 'react';
import classes from './ActiveQuiz.module.scss';
import AnswersList from '../AnswersList/AnswersList';

const ActiveQuiz = (props) => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
			<span>
				<strong>1.</strong>&nbsp;
                {props.question}
			</span>

            <small>{props.answerNumber} from {props.quizLength}</small>
        </p>

        <AnswersList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
)

export default ActiveQuiz;
