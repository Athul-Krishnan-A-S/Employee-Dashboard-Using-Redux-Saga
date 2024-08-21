import './addEmployeeModal.css';
import { useDispatch, useSelector } from "react-redux";
import {
    submitForm,
    updateEmployee,
    searchEmployee,
    setFirstNameError,
    setLastNameError,
    setEmailError,
    setDobError,
    setDesignationError,
    setDobNotValid,
    setDojError,
    setDojNotValid,
    setExperienceError,
    setPhoneError,
} from '../../redux/RegisterData/registerDataAction';
import { toggleEdit, toggleModalState } from '../../redux/ModalState/ModalStateAction';
import { format } from 'date-fns';
import Button from "../Button/Button";
import { useEffect, useState } from 'react';
import { validateForm } from '../../utils/formValidation';

export const AddEmployeeModal = ({ onClose }) => {
    const isEdit = useSelector((state) => state.isModalOpen.isEdit);
    const isModalOpen = useSelector((state) => state.isModalOpen.isModalOpen);
    const { id } = useSelector((state) => state.isModalOpen)
    const searchId = id;
    const { searchedData } = useSelector((state) => state.registerData);
    const { EMAIL_EXISTS, EMPLOYEE_NOT_FOUND } = useSelector((state) => state.errorReducer);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        dob: '',
        doj: '',
        experience: '',
        phone: ''
    });

    const dispatch = useDispatch();
    const {
        FIRST_NAME_ERROR,
        LAST_NAME_ERROR,
        EMAIL_ERROR,
        DESIGNATION_ERROR,
        DOB_ERROR,
        DOJ_ERROR,
        EXPERIENCE_ERROR,
        PHONE_ERROR,
        DOB_NOT_VALID,
        DOJ_NOT_VALID,
    } = useSelector((state) => state.registerData);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };


    const handleSubmitForm = () => {
        const isFormValid = validateForm(formData, dispatch)
        if (isFormValid) {
            const data = {
                fname: formData.firstName,
                lname: formData.lastName,
                email: formData.email,
                designation: formData.designation,
                dob: formData.dob,
                doj: formData.doj,
                experience: formData.experience,
                phoneNumber: formData.phone
            };
            if (!isEdit) {
                dispatch(submitForm(data));
            } else {
                dispatch(updateEmployee({ ...data, employeeId: searchId }));
            }
        }
    };

    const formatDateToDDMMYYYY = (dateString) => {
        if (!dateString) return '';
        return format(new Date(dateString), 'yyyy-MM-dd');
    };

    useEffect(() => {
        if (isEdit) {
            dispatch(searchEmployee(searchId));
        }
    }, [isEdit, searchId, dispatch]);

    useEffect(() => {
        if (isEdit && searchedData?.data?.employee) {
            const employee = searchedData.data.employee;
            setFormData({
                firstName: employee.fname,
                lastName: employee.lname,
                email: employee.email,
                designation: employee.designation,
                dob: formatDateToDDMMYYYY(employee.dob),
                doj: formatDateToDDMMYYYY(employee.doj),
                experience: employee.experience,
                phone: employee.phoneNumber
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                designation: '',
                dob: '',
                doj: '',
                experience: '',
                phone: ''
            });
        }
    }, [isEdit, searchedData]);

    const handleModalClose = () => {
        if (isModalOpen) {
            dispatch(toggleModalState());
            setErrorsFalse();
        }
        if (isEdit) {
            dispatch(toggleEdit());
            setErrorsFalse();
        }
        if (onClose) {
            onClose();
            setErrorsFalse();
        }
    };

    const setErrorsFalse = () => {
        dispatch(setFirstNameError(false));
        dispatch(setLastNameError(false));
        dispatch(setEmailError(false))
        dispatch(setDesignationError(false));
        dispatch(setDobError(false));
        dispatch(setDobNotValid(false));
        dispatch(setDojError(false));
        dispatch(setDojNotValid(false));
        dispatch(setExperienceError(false));
        dispatch(setPhoneError(false));
    }

    return (
        <div className="employee-modal-container">
            <div className="employee-modal">
                <div className='modal-close-button'>
                    <p onClick={handleModalClose}>x</p>
                </div>
                <div className='employee-modal-form'>
                    {EMPLOYEE_NOT_FOUND && <p className="error-msg">Employee Not Found</p>}
                    {EMAIL_EXISTS && <p className="error-msg">Email Already Exists</p>}
                    <form className="register-form">
                        <div className="register-form-col-1">
                            <div>
                                <label htmlFor='firstName'>First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                {FIRST_NAME_ERROR && <p className="error-msg">Please Enter First Name</p>}
                            </div>
                            <div>
                                <label htmlFor='email'>Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    placeholder="Email"
                                    onChange={handleInputChange}
                                />
                                {EMAIL_ERROR && <p className="error-msg">Please Enter Email</p>}
                            </div>
                            <div>
                                <label htmlFor='designation'>Designation</label>
                                <select
                                    id="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Select Designation</option>
                                    <option value="JUNIOR SOFTWARE DEVELOPER">JUNIOR SOFTWARE DEVELOPER</option>
                                    <option value="SENIOR SOFTWARE DEVELOPER">SENIOR SOFTWARE DEVELOPER</option>
                                    <option value="DEVOPS">DEVOPS</option>
                                    <option value="QA">QA</option>
                                    <option value="UI/UX">UI/UX</option>
                                    <option value="PROJECT MANAGER">PROJECT MANAGER</option>
                                </select>
                                {DESIGNATION_ERROR && <p className="error-msg">Please Enter Designation</p>}
                            </div>
                        </div>
                        <div className="register-form-col-2">
                            <div>
                                <label htmlFor='lastName'>Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                                {LAST_NAME_ERROR && <p className="error-msg">Please Enter Last Name</p>}
                            </div>
                            <div className="date-container">
                                <div>
                                    <label htmlFor='dob'>Date of Birth</label>
                                    <input
                                        id="dob"
                                        type="date"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                    />
                                    {DOB_ERROR && <p className="error-msg">Please Enter DOB</p>}
                                    {DOB_NOT_VALID && <p className="error-msg">Must be 18 or older</p>}
                                </div>
                                <div>
                                    <label htmlFor='doj'>Date of Join</label>
                                    <input
                                        id="doj"
                                        type="date"
                                        value={formData.doj}
                                        onChange={handleInputChange}
                                    />
                                    {DOJ_ERROR && <p className="error-msg">Please Enter Join Date</p>}
                                    {DOJ_NOT_VALID && <p className="error-msg">Invalid Date</p>}
                                </div>
                            </div>
                            <div className="experience-container">
                                <div>
                                    <label htmlFor='experience'>Experience (in yrs)</label>
                                    <input
                                        id="experience"
                                        type="number"
                                        placeholder="0"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                    />
                                    {EXPERIENCE_ERROR && <p className="error-msg">Please Enter Experience</p>}
                                </div>
                                <div>
                                    <label htmlFor='phone'>Phone</label>
                                    <input
                                        id="phone"
                                        type="number"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                    {PHONE_ERROR && <p className="error-msg">Please Enter Phone Number</p>}
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="register-form-btn-container">
                        <Button value={!isEdit ? "Register" : 'Update'} className="register-btn" onClick={handleSubmitForm} />
                        <Button value="Cancel" className="cancel-btn" onClick={handleModalClose} />
                    </div>
                </div>
            </div>
        </div>
    );
};
