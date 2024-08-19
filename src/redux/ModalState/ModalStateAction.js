import { TOGGLE_EDIT, TOGGLE_MODAL,TOGGLE_DELETE,CONFIRM_DELETE } from "./ModalStateTypes";

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