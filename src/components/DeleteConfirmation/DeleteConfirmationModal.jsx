import { useEffect } from 'react';
import { deleteEmployee } from '../../redux/EmployeeDetails/EmployeeDetailsActions';
import { setId, toggleDelete } from '../../redux/ModalState/ModalStateAction';
import Button from '../Button/Button';
import './deleteConfirmationModal.css';
import { useDispatch, useSelector } from 'react-redux';


function DeleteConfirmationModal() {
    const { id } = useSelector((state) => state.isModalOpen);
    useEffect(()=>{
        console.log(id)
    },[id])
    const dispatch = useDispatch();
    const handleCancelDelete = () => {
        dispatch(setId(''))
        dispatch(toggleDelete())
    }
    const handleConfirmDelete = () => {
        dispatch(toggleDelete())
        const employeeId = id;
        dispatch(deleteEmployee(employeeId))
        dispatch(setId(''));
    }
    return (
        <div className="delete-confirmation-container">
            <div className="delete-confirmation-modal">
                <div className="delete-confirmation-heading">
                    <p>Confirm Deletion</p>
                </div>
                <div className="delete-confirmation-message">
                    <p>Are you sure you want to delete employee </p>
                </div>
                <div className="delete-confirmation-buttons">
                    <Button value="Confirm" className='searchBtn' onClick={() => handleConfirmDelete()} />
                    <Button value="Cancel" className='searchBtn' onClick={() => handleCancelDelete()} />
                </div>
            </div>
        </div>
    );
}
export default DeleteConfirmationModal;