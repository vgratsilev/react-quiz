import axios from 'axios/axios-quiz';
import {
    LOAD_QUIZ_SUCCESS,
    LOAD_QUIZES_ERROR,
    LOAD_QUIZES_START,
    LOAD_QUIZES_SUCCESS,
    QUIZ_FINISH,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE
} from './actionTypes';

export function loadQuizesStart() {
    return {
        type: LOAD_QUIZES_START
    };
}

export function loadQuizesSuccess(quizes) {
    return {
        type: LOAD_QUIZES_SUCCESS,
        quizes
    };
}

export function loadQuizesError(error) {
    return {
        type: LOAD_QUIZES_ERROR,
        error
    };
}

export function loadQuizSuccess(quiz) {
    return {
        type: LOAD_QUIZ_SUCCESS,
        quiz
    };
}

export function loadQuizByID(quizID) {
    return async (dispatch) => {
        dispatch(loadQuizesStart());
        try {
            const response = await axios.get(`Quizes/${quizID}.json`);
            const quiz = response.data;
            dispatch(loadQuizSuccess(quiz));
        } catch (error) {
            dispatch(loadQuizesError(error));
        }
    };
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    };
}

export function quizFinish() {
    return {
        type: QUIZ_FINISH
    };
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    };
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
}

export function quizRetry() {
    return {
        type: QUIZ_RETRY
    };
}

export function quizAnswerClick(answerID) {
    return (dispatch, getState) => {
        const state = getState().quiz;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }

        const question = state.quiz[state.activeQuestion];
        const { results } = state;

        if (question.rightAnswerID === answerID) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(quizSetState({ [answerID]: 'success' }, results));

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(quizFinish());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({ [answerID]: 'error' }, results));
        }
    };
}

export function loadQuizes() {
    return async (dispatch) => {
        dispatch(loadQuizesStart());
        try {
            const response = await axios.get('Quizes.json');
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                });
            });
            dispatch(loadQuizesSuccess(quizes));
        } catch (error) {
            dispatch(loadQuizesError(error));
        }
    };
}
