import axios from '../../axios/axios-quiz';
import {
    LOAD_QUIZ_SUCCESS,
    LOAD_QUIZES_ERROR,
    LOAD_QUIZES_START,
    LOAD_QUIZES_SUCCESS
} from './actionTypes';

export function loadQuizes() {
    return async dispatch => {
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
    }
}

export function loadQuizesStart() {
    return {
        type: LOAD_QUIZES_START
    }
}

export function loadQuizesSuccess(quizes) {
    return {
        type: LOAD_QUIZES_SUCCESS,
        quizes
    }
}

export function loadQuizesError(error) {
    return {
        type: LOAD_QUIZES_ERROR,
        error
    }
}

export function loadQuizByID(quizID) {
    return async dispatch => {
        dispatch(loadQuizesStart());
        try {
            const response = await axios.get(`Quizes/${quizID}.json`);
            const quiz = response.data;
            dispatch(loadQuizSuccess(quiz));
        } catch (error) {
            dispatch(loadQuizesError(error));
        }
    }
}

export function loadQuizSuccess(quiz) {
    return {
        type: LOAD_QUIZ_SUCCESS,
        quiz
    }
}
