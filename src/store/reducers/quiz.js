import {
    LOAD_QUIZ_SUCCESS,
    LOAD_QUIZES_ERROR,
    LOAD_QUIZES_START,
    LOAD_QUIZES_SUCCESS,
    QUIZ_FINISH,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE
} from 'store/actions/actionTypes';

const initialState = {
    quizes: [],
    loading: false,
    error: null,

    results: {}, // { [id]: 'success'/'error' }
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success'/'error' }
    quiz: []
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_QUIZES_START:
            return {
                ...state,
                loading: true
            };
        case LOAD_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.quizes
            };
        case LOAD_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case LOAD_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            };
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            };
        case QUIZ_FINISH:
            return {
                ...state,
                isFinished: true
            };
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.number,
                answerState: null
            };
        case QUIZ_RETRY:
            return {
                ...state,
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            };
        default:
            return state;
    }
}
