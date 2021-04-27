import React from 'react';
import PropTypes from 'prop-types';
import classes from './AnswerItem.module.scss';

const AnswerItem = ({ state, onAnswerClick, answer }) => {
    const cls = [classes.AnswerItem];

    if (state) {
        cls.push(classes[state]);
    }

    return (
        <li className={cls.join(' ')}>
            <div tabIndex={answer.id} role={'button'} onClick={() => onAnswerClick(answer.id)} onKeyDown={() => onAnswerClick(answer.id)}>
                {answer.text}
            </div>
        </li>
    );
};

AnswerItem.propTypes = {
    state: PropTypes.shape({
        id: PropTypes.string
    }),
    onAnswerClick: PropTypes.func,
    answer: PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string
    })
};

AnswerItem.defaultProps = {
    state: null,
    onAnswerClick: null,
    answer: null
};

export default AnswerItem;
