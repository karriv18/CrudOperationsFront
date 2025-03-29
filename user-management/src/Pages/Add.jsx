import React from 'react'
import { Button } from 'react-bootstrap'
const Add = () => {

    const userData = {
        firstName
    }
    return (
        <div className='container'>
            <div >
                <h1 className='row d-flex justify-content-center'>Add User</h1>
            </div>
            <form >
                <div className='mb-3 form-group'>
                    <label for="firstname">First Name</label>
                    <input type="text" placeholder='John' className='form-control' id='firstname' />
                </div>
                <div className='mb-3 form-group'>
                    <label for="middlename">Middle Name</label>
                    <input type="text" placeholder='' className='form-control' id='middlename' />
                </div>

                <div className='mb-3 form-group'>
                    <label for="lastname">Last Name</label>
                    <input type="text" placeholder='Smith' className='form-control' id='lastname' />
                </div>

                <div className='mb-3 form-group'>
                    <label for="birthday">Birthday</label>
                    <input type="date" className='form-control' id='birthday' />
                </div>

                <div className='mb-3 form-group'>
                    <label for="email">Email</label>
                    <input type="email" placeholder='jhon@example.com' className='form-control' id='email' />
                </div>

                <div className='mb-3 form-group'>
                    <label for="password">Password</label>
                    <input type="password" placeholder='******' className='form-control' id='password' />
                </div>

                <div className='w-full mx-auto my-10 rounded-lg shadow-md sm:w-11/12'>
                    <Button className='btn btn-success'>
                        Add User
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Add