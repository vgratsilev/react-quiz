import { LOAD_QUIZES_ERROR, LOAD_QUIZES_START, LOAD_QUIZES_SUCCESS } from '../actions/actionTypes';

const initialState = {
    quizes: [],
    loading: false,
    error: null
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
        default:
            return state;
    }
};
