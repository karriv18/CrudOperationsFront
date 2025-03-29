import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const gotoAddUser = () => {
    navigate('/User/Add');
  }
  const getAllUsers = async () => {
    const url = 'https://localhost:44365/api/v1/user-management/users';

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    const response = await axios.get(url, { headers });
    console.log(response)
    return response.data

  }
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    }
    fetchUsers();
  }, []);
  return (
    <div>
      <div className='container'>
        <div>
          <h1 className='row d-flex justify-content-center'>List of Users</h1>
        </div>
        <div className='items-center w-full px-4 py-4 mx-auto my-10 bg-white rounded-lg shadow-md sm:w-11/12'>
          <Button className='btn btn-success' onClick={gotoAddUser}>
            Add User
          </Button>
        </div>
        <table className='table table-striped'>
          <thead className='text-sm font-normal text-gray-700 text-center'>
            <tr>
              <th className='col'>First Name</th>
              <th className='col'>Middle Name</th>
              <th className='col'>Last Name</th>
              <th className='col'>Birthday</th>
              <th className='col'>Email</th>
              <th className='col'>Action</th>
            </tr>
          </thead>
          <tbody className='text-sm font-normal text-gray-700 text-center'>
            {users.map((user) => (
              <tr className='text-sm font-normal text-gray-700 align-items-center'>
                <td hidden>{user.id}</td>
                <td >{user.firstName}</td>
                <td >{user.middleName}</td>
                <td >{user.lastName}</td>
                <td >{user.middleName}</td>
                <td >{user.email}</td>
                <td className="d-flex justify-content-around align-items-center">
                  <button className='btn btn-warning'>
                    Edit
                  </button>
                  <button className='btn btn-danger'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List