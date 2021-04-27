import React from 'react';
import PropTypes from 'prop-types';
import classes from './AnswersList.module.scss';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = ({ answers, onAnswerClick, state }) => (
    <ul className={classes.AnswersList}>
        {answers.map((answer) => {
            return <AnswerItem key={answer.id} answer={answer} onAnswerClick={onAnswerClick} state={state ? state[answer.id] : null} />;
        })}
    </ul>
);

AnswersList.propTypes = {
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

AnswersList.defaultProps = {
    onAnswerClick: null,
    answers: [],
    state: null
};

export default AnswersList;
