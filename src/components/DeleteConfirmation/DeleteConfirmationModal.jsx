import { deleteEmployee } from '../../redux/EmployeeDetails/EmployeeDetailsActions';
import { toggleDelete } from '../../redux/ModalState/ModalStateAction';
import Button from '../Button/Button';
import './deleteConfirmationModal.css';
import { useDispatch } from 'react-redux';

function DeleteConfirmationModal() {
    const dispatch = useDispatch();
    const handleCancelDelete = () => {
        localStorage.removeItem('deleteId')
        dispatch(toggleDelete())
    }
    const handleConfirmDelete = () => {
        dispatch(toggleDelete())
        const employeeId = localStorage.getItem('deleteId')
        dispatch(deleteEmployee(employeeId))
        localStorage.removeItem('deleteId')
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