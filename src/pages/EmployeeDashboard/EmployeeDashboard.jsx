import Button from '../../components/Button/Button';
import EmployeeDashboardHeader from '../../components/EmployeeDashboardheader/EmployeeDashboardheader';
import EmployeesTable from '../../components/EmployeesTable/EmployeesTable';
import './employeeDashboard.css';
import { useEffect, useState } from 'react';
import { AddEmployeeModal } from '../../components/AddEmployeeModal/addEmployeeModal';
import { useDispatch, useSelector } from 'react-redux';
import DeleteConfirmationModal from '../../components/DeleteConfirmation/DeleteConfirmationModal';
import { setId } from '../../redux/ModalState/ModalStateAction';

function EmployeeDashboard() {
    const { isModalOpen } = useSelector((state) => state.isModalOpen);
    const { isTokenValid } = useSelector((state) => state.isLogin);
    const isEdit = useSelector((state) => state.isModalOpen.isEdit);
    const isDelete = useSelector((state) => state.isModalOpen.isDelete)
    const [isToken, setIsToken] = useState(true);
    const { id } = useSelector((state) => state.isModalOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isTokenValid) {
            setIsToken(false);
        } else {
            setIsToken(true);
        }
    }, [isTokenValid])

    useEffect(() => {
        if (!isModalOpen) {
            dispatch(setId(''));
        }
    }, [isModalOpen])



    const [searchFor, setSearchFor] = useState('');
    const [filteredEmployee, setFilteredEmployee] = useState();

    const handleSearchBox = (event) => {
        setSearchFor(event.target.value);
        searchEmployee(searchFor)
    }
    const employeeData = useSelector(state => state.employeeDetails);
    const searchEmployee = (searchFor) => {
        const filteredEmployees = employeeData.filter(employee =>
            employee.fname.includes(searchFor) ||
            employee.email.includes(searchFor) ||
            employee.designation.includes(searchFor)
        );
        setFilteredEmployee(filteredEmployees);
        return filteredEmployees;
    };

    return (
        <div className="employee-dashboard-container">
            {(isModalOpen || isEdit) && <AddEmployeeModal />}
            {(isDelete && <DeleteConfirmationModal />)}
            {(!isToken && <p>Token Expired</p>)}
            {isToken && <EmployeeDashboardHeader />}
            <div className='welcome-container'>
                <p>Welcome to Employee Dashboard</p>
            </div>
            <div className='search-container'>
                <input className='search-field' type='text' placeholder='Search for employee name,email or designation' onChange={handleSearchBox}></input>
                <Button value='Search' className='searchBtn' onClick={handleSearchBox} />
            </div>
            <EmployeesTable filteredEmployee={filteredEmployee} />
        </div>
    );
}
export default EmployeeDashboard;