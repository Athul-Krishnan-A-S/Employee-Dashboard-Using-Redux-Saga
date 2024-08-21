import { TOGGLE_EDIT, TOGGLE_MODAL,TOGGLE_DELETE,CONFIRM_DELETE, SET_ID } from "./ModalStateTypes";

export const toggleModalState = () =>({
    type:TOGGLE_MODAL
});
export const toggleEdit = () =>({
    type:TOGGLE_EDIT
});
export const toggleDelete = () =>({
    type:TOGGLE_DELETE
});
export const confirmDelete = () =>({
    type:CONFIRM_DELETE
});
export const setId = (id) =>({
    type:SET_ID,
    payload:id
});