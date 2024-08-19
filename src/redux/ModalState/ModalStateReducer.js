import { TOGGLE_EDIT, TOGGLE_MODAL ,TOGGLE_DELETE,CONFIRM_DELETE} from "./ModalStateTypes";

const initialState = {
    isModalOpen: false,
    isEdit: false,
    isDelete:false,
    confirmDelete:false,
};

const isModalOpenReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state, 
                isModalOpen: !state.isModalOpen
            };
        case TOGGLE_EDIT:
            return {
                ...state,
                isEdit: !state.isEdit
            };
        case TOGGLE_DELETE:
            return {
                ...state,
                isDelete: !state.isDelete
            };
        case CONFIRM_DELETE:
            return {
                ...state,
                confirmDelete: !state.confirmDelete
            };
        default:
            return state;
    }
};

export default isModalOpenReducer;
