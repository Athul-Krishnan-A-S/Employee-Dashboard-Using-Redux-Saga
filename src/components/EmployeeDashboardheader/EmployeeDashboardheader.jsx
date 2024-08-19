import './employeeDashboardheader.css';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalState } from '../../redux/ModalState/ModalStateAction'
import { useNavigate } from 'react-router-dom';

function EmployeeDashboardHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    return (
        <div className="employee-dashboard-header">
            <p>Employee Dashboard</p>
            <div className="buttons-container">
                <Button value='Add Employee' className='addEmployee-btn' onClick={() => dispatch(toggleModalState())} />
                <Button value='Logout' className='addEmployee-btn' onClick={() => userLogout()} />
            </div>
        </div>
    );
}
export default EmployeeDashboardHeader;