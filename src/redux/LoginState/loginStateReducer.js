import { TOGGLE_IS_LOGIN } from "./loginStateTypes";

const initialState = {
    isLogin: true
};

const isLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_LOGIN:
            return {
                ...state, 
                isLogin: !state.isLogin
            };
        default:
            return state;
    }
};

export default isLoginReducer;
