import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button/Button';
import classes from './FinishedQiuz.module.scss';

const FinishedQuiz = ({ results, quiz, onRetry }) => {
    const successCount = Object.keys(results).reduce((total, key) => {
        if (results[key] === 'success') {
            // eslint-disable-next-line no-param-reassign
            total++;
        }
        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {quiz.map((quizItem, index) => {
                    const cls = ['fa', results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check', classes[results[quizItem.id]]];

                    return (
                        <li key={quizItem.id}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    );
                })}
            </ul>

            <p>
                Right {successCount} from {quiz.length}
            </p>

            <div>
                <Button onClick={onRetry} type={'primary'}>
                    Repeat
                </Button>
                <Link to={'/'}>
                    <Button type={'success'}>Go to questions list</Button>
                </Link>
            </div>
        </div>
    );
};

FinishedQuiz.propTypes = {
    quiz: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            question: PropTypes.string,
            rightAnswerID: PropTypes.number,
            answers: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    text: PropTypes.string
                })
            )
        })
    ),
    results: PropTypes.shape({
        id: PropTypes.string
    }),
    onRetry: PropTypes.func
};

FinishedQuiz.defaultProps = {
    quiz: null,
    results: null,
    onRetry: null
};

export default FinishedQuiz;
