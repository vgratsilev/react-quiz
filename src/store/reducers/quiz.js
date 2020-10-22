import { LOAD_QUIZ_SUCCESS, LOAD_QUIZES_ERROR, LOAD_QUIZES_START, LOAD_QUIZES_SUCCESS } from '../actions/actionTypes';

const initialState = {
    quizes: [],
    loading: false,
    error: null,

    results: {},		// { [id]: 'success'/'error' }
    isFinished: false,
    activeQuestion: 0,
    answerState: null,	// { [id]: 'success'/'error' }
    quiz: null
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_QUIZES_START:
            return {
                ...state,
                loading: true
            }
        case LOAD_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.quizes
            }
        case LOAD_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case LOAD_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            }
        default:
            return state;
    }
};
