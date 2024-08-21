import { TOGGLE_IS_LOGIN,IS_TOKEN_VALID } from "./loginStateTypes";

const initialState = {
    isLogin: true,
    isTokenValid:true,
};

const isLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_LOGIN:
            return {
                ...state, 
                isLogin: !state.isLogin
            };
        case IS_TOKEN_VALID:
            return{
                ...state,
                isTokenValid: !state.isTokenValid
            };
        default:
            return state;
    }
};

export default isLoginReducer;
