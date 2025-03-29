import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Edit = () => {
    const { id } = useParams();

    const [Id, setId] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDay, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    const goToList = () => {
        navigate('/');
    }
    useEffect(() => {
        const fetchUser = async () => { 
            const userData = await getUser(id);
            setId(id)
            setFirstName(userData.firstName)
            setMiddleName(userData.middleName)
            setLastName(userData.lastName)
            setEmail(userData.email)
            setBirthday(userData.birthDay)
            setPassword(userData.password)
        }
        fetchUser();
    }, [id])



    const getUser = async (id) => {
        const url = `https://localhost:44365/api/v1/user-management/users/get-user/${id}`;

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        }

        const response = await axios.get(url, { headers });

        return response.data
    }

    const editUser = async (Id, data) => {
        console.log(data)
        const url = `https://localhost:44365/api/v1/user-management/users/user-update-form/?id=${Id}`;

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        }

        const response = await axios.post(url, data, { headers });
        console.log(response)

    }
    const validateForm = () => {
        let errors = {};
        if (!firstName.trim()) errors.firstName = "First Name is required";
        if (!lastName.trim()) errors.lastName = "Last Name is required";
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email format";
        }
        if (!birthDay.trim()) errors.birthDay = "Birthday is required";
        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return; 
        }

        const data = {
            firstName,
            middleName,
            lastName,
            email,
            birthDay,
            password,
        };

        await editUser(Id, data);

        goToList();
    };

    return (
        <div className='container'>
            <div>
                <h1 className='row d-flex justify-content-center'>Add User</h1>
            </div>
            <div className='mb-3'>
                <Button variant='outline-primary' onClick={goToList}>
                    Go Back
                </Button>
            </div>
            <form className='form-control' onSubmit={handleSubmit}>
                <div className='mb-3 form-group'>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" className='form-control' id='firstname'
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                </div>

                <div className='mb-3 form-group'>
                    <label htmlFor="middlename">Middle Name</label>
                    <input type="text" className='form-control' id='middlename'
                        value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                </div>

                <div className='mb-3 form-group'>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className='form-control' id='lastname'
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                </div>

                <div className='mb-3 form-group'>
                    <label htmlFor="birthday">Birthday</label>
                    <input type="date" className='form-control' id='birthday'
                        value={birthDay} onChange={(e) => setBirthday(e.target.value)} />
                    {errors.birthDay && <small className="text-danger">{errors.birthDay}</small>}
                </div>

                <div className='mb-3 form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' id='email'
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className='mb-3 form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' id='password'
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className='w-full mx-auto my-10 rounded-lg shadow-md sm:w-11/12'>
                    <Button className='btn btn-success' type="submit">
                        Edit User
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
