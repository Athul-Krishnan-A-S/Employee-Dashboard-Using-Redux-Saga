import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import Button from '../Button/Button';
import './employeeTable.css';
import { fetchemployeeData, deleteEmployee } from '../../redux/EmployeeDetails/EmployeeDetailsActions';
import { toggleDelete, toggleEdit, toggleModalState } from '../../redux/ModalState/ModalStateAction';

class EmployeesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            employeeData: this.props.employeeDataFromState,
            filteredEmployee: props.filteredEmployee
        };
    }

    async componentDidMount() {
        try {
            await this.props.fetchemployeeData();
        } catch (err) {
            this.setState({ error: 'Failed to fetch employee data.' });
        } finally {
            this.setState({ loading: false });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filteredEmployee !== this.props.filteredEmployee || prevProps.employeeDataFromState !== this.props.employeeDataFromState) {
            if (this.props.filteredEmployee) {
                this.setState({ employeeData: this.props.filteredEmployee });
            } else {
                this.setState({ employeeData: this.props.employeeDataFromState });
            }
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yyyy');
    }

    handleDeleteEmployee = (id) => {
        this.props.toggleDelete();
        localStorage.setItem('deleteId', id)
    }

    handleToggleEdit = (id) => {
        this.props.toggleEdit();
        localStorage.setItem('searchId', id);
    }

    render() {
        const { loading, error, employeeData } = this.state;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        return (
            <div className='employee-table-container'>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Date of Join</th>
                            <th>Experience</th>
                            <th>Email Address</th>
                            <th>Date of Birth</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.length > 0 ? (
                            employeeData.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.fname}</td>
                                    <td>{employee.designation}</td>
                                    <td>{this.formatDate(employee.doj)}</td>
                                    <td>{employee.experience}</td>
                                    <td>{employee.email}</td>
                                    <td>{this.formatDate(employee.dob)}</td>
                                    <td>{employee.phoneNumber}</td>
                                    <td>
                                        <div className='action-btn-container'>
                                            <Button value='Edit' className='actionBtn' onClick={() => this.handleToggleEdit(employee.employeeId)} />
                                            <Button value='Delete' className='actionBtn' onClick={() => this.handleDeleteEmployee(employee.employeeId)} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No employee data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isModalOpen: state.isModalOpen,
    employeeDataFromState: state.employeeDetails,
    isDelete: state.isDelete,
});

const mapDispatchToProps = {
    fetchemployeeData,
    deleteEmployee,
    toggleEdit,
    toggleModalState,
    toggleDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesTable);
