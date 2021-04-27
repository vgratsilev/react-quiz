import React from 'react';
import PropTypes from 'prop-types';
import AnswersList from 'components/AnswersList/AnswersList';
import classes from './ActiveQuiz.module.scss';

const ActiveQuiz = ({ question, answerNumber, quizLength, answers, onAnswerClick, state }) => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>1.</strong>&nbsp;
                {question}
            </span>

            <small>
                {answerNumber} from {quizLength}
            </small>
        </p>

        <AnswersList answers={answers} onAnswerClick={onAnswerClick} state={state} />
    </div>
);

ActiveQuiz.propTypes = {
    question: PropTypes.string,
    answerNumber: PropTypes.number,
    quizLength: PropTypes.number,
    onAnswerClick: PropTypes.func,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            text: PropTypes.string
        })
    ),
    state: PropTypes.shape({
        id: PropTypes.string
    })
};

ActiveQuiz.defaultProps = {
    question: '',
    answerNumber: null,
    quizLength: null,
    onAnswerClick: null,
    answers: [],
    state: null
};

export default ActiveQuiz;
