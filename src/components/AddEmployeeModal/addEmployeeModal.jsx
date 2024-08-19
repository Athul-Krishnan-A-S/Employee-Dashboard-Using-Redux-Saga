import './addEmployeeModal.css';
import { useDispatch, useSelector } from "react-redux";
import {
    setFirstName,
    setLastName,
    setEmail,
    setDesignation,
    setDob,
    setDoj,
    setExperience,
    setPhone,
    setFirstNameError,
    setLastNameError,
    setEmailError,
    setDesignationError,
    setDobError,
    setDojError,
    setExperienceError,
    setPhoneError,
    submitForm,
    updateEmployee
} from '../../redux/RegisterData/registerDataAction';
import { toggleEdit, toggleModalState } from '../../redux/ModalState/ModalStateAction'
import { format } from 'date-fns';
import Button from "../Button/Button";
import { useEffect } from 'react';

export const AddEmployeeModal = ({ onClose }) => {

    const isEdit = useSelector((state) => state.isModalOpen.isEdit);
    const { isModalOpen } = useSelector((state) => state.isModalOpen);
    const employeeData = useSelector(state => state.employeeDetails);
    const searchId = localStorage.getItem('searchId');


    const dispatch = useDispatch();
    const {
        firstName,
        lastName,
        email,
        designation,
        dob,
        doj,
        experience,
        phone,
        FIRST_NAME_ERROR,
        LAST_NAME_ERROR,
        EMAIL_ERROR,
        DESIGNATION_ERROR,
        DOB_ERROR,
        DOJ_ERROR,
        EXPERIENCE_ERROR,
        PHONE_ERROR
    } = useSelector((state) => state.registerData);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        const actionMap = {
            firstName: setFirstName,
            lastName: setLastName,
            email: setEmail,
            designation: setDesignation,
            dob: setDob,
            doj: setDoj,
            experience: setExperience,
            phone: setPhone
        };
        const action = actionMap[id];
        if (action) dispatch(action(value));
    };

    const validateForm = () => {
        let hasError = false;

        if (!firstName.trim() || /\./.test(firstName)) {
            dispatch(setFirstNameError(true));
            hasError = true;
        } else {
            dispatch(setFirstNameError(false));
        }
        if (!lastName.trim() || /\./.test(lastName)) {
            dispatch(setLastNameError(true));
            hasError = true;
        } else {
            dispatch(setLastNameError(false));
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            dispatch(setEmailError(true));
            hasError = true;
        } else {
            dispatch(setEmailError(false));
        }
        if (!designation) {
            dispatch(setDesignationError(true));
            hasError = true;
        } else {
            dispatch(setDesignationError(false));
        }
        if (!dob || isNaN(new Date(dob).getTime())) {
            dispatch(setDobError(true));
            hasError = true;
        } else {
            dispatch(setDobError(false));
        }
        if (!doj || isNaN(new Date(doj).getTime())) {
            dispatch(setDojError(true));
            hasError = true;
        } else {
            dispatch(setDojError(false));
        }
        if (isNaN(experience) || experience < 0) {
            dispatch(setExperienceError(true));
            hasError = true;
        } else {
            dispatch(setExperienceError(false));
        }
        const phonePattern = /^[0-9]+$/;
        if (!phonePattern.test(phone)) {
            dispatch(setPhoneError(true));
            hasError = true;
        } else {
            dispatch(setPhoneError(false));
        }

        return !hasError;
    };

    const handleSubmitForm = () => {
        if (validateForm()) {
            const formData = {
                fname: firstName,
                lname: lastName,
                email,
                designation,
                dob,
                doj,
                experience,
                phoneNumber: phone
            };
            if (!isEdit) {
                dispatch(submitForm(formData));
            } else {
                const employeeId = localStorage.getItem('searchId')
                Object.assign(formData, { employeeId: employeeId })
                dispatch(updateEmployee(formData));
            }
        }
    };

    const formatDateToDDMMYYYY = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd');
    };

    useEffect(() => {
        if (isEdit) {
            const employee = employeeData.find(emp => emp.employeeId === searchId);
            if (employee) {
                dispatch(setFirstName(employee.fname));
                dispatch(setLastName(employee.lname));
                dispatch(setEmail(employee.email));
                dispatch(setDesignation(employee.designation));
                dispatch(setDob(formatDateToDDMMYYYY(employee.dob)));
                dispatch(setDoj(formatDateToDDMMYYYY(employee.doj)));
                dispatch(setExperience(employee.experience));
                dispatch(setPhone(employee.phoneNumber));
            }
        } else {
            dispatch(setFirstName(''));
            dispatch(setLastName(''));
            dispatch(setEmail(''));
            dispatch(setDesignation(''));
            dispatch(setDob(formatDateToDDMMYYYY('')));
            dispatch(setDoj(formatDateToDDMMYYYY('')));
            dispatch(setExperience(''));
            dispatch(setPhone(''));
        }
    }, [isEdit, isModalOpen])

    const handleModalClose = () => {
        if (isModalOpen) {
            dispatch(toggleModalState());
        }
        if (isEdit) {
            dispatch(toggleEdit());
        }
    }

    return (
        <div className="employee-modal-container">
            <div className="employee-modal">
                <div className='modal-close-button' ><p onClick={() => handleModalClose()}>X</p></div>
                <div className='employee-modal-form'>
                    <form className="register-form">
                        <div className="register-form-col-1">
                            <div>
                                <label htmlFor='firstName'>First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={handleInputChange}
                                />
                                {FIRST_NAME_ERROR && <p className="error-msg">Please Enter First Name</p>}
                            </div>
                            <div>
                                <label htmlFor='email'>Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={handleInputChange}
                                />
                                {EMAIL_ERROR && <p className="error-msg">Please Enter Email</p>}
                            </div>
                            <div>
                                <label htmlFor='designation'>Designation</label>
                                <select
                                    id="designation"
                                    value={designation}
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
                                    value={lastName}
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
                                        value={dob}
                                        onChange={handleInputChange}
                                    />
                                    {DOB_ERROR && <p className="error-msg">Please Enter DOB</p>}
                                </div>
                                <div>
                                    <label htmlFor='doj'>Date of Join</label>
                                    <input
                                        id="doj"
                                        type="date"
                                        value={doj}
                                        onChange={handleInputChange}
                                    />
                                    {DOJ_ERROR && <p className="error-msg">Please Enter Join Date</p>}
                                </div>
                            </div>
                            <div className="experience-container">
                                <div>
                                    <label htmlFor='experience'>Experience (in yrs)</label>
                                    <input
                                        id="experience"
                                        type="number"
                                        placeholder="0"
                                        value={experience}
                                        onChange={handleInputChange}
                                    />
                                    {EXPERIENCE_ERROR && <p className="error-msg">Please Enter Experience in Years</p>}
                                </div>
                                <div>
                                    <label htmlFor='phone'>Phone</label>
                                    <input
                                        id="phone"
                                        type="number"
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={handleInputChange}
                                    />
                                    {PHONE_ERROR && <p className="error-msg">Please Enter Phone Number</p>}
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="register-form-btn-container">
                        <Button value={!isEdit ? "Register" : 'Update'} className="register-btn" onClick={handleSubmitForm} />
                        <Button value="Cancel" className="cancel-btn" onClick={() => dispatch(toggleModalState)} />
                    </div>
                </div>
            </div>
        </div>
    );
};
