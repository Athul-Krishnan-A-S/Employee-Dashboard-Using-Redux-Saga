import { TOGGLE_IS_LOGIN,IS_TOKEN_VALID } from "./loginStateTypes";

export const toggleLoginState = () =>({
    type:TOGGLE_IS_LOGIN
});;
export const toggleTokenValid = () =>({
    type:IS_TOKEN_VALID
});;