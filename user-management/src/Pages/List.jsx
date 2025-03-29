import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('firstName'); // Default filter by First Name
  const navigate = useNavigate();

  const gotoAddUser = () => {
    navigate('/User/Add');
  };

  const gotoEditUser = (id) => {
    navigate(`/User/Edit/${id}`);
  };

  const deleteUser = async (id) => {
    const url = `https://localhost:44365/api/v1/user-management/users/delete-user/${id}`;
    await axios.post(url); // Headers are not needed for DELETE
    fetchUsers(); // Refresh list after deletion
  };

  const getAllUsers = async () => {
    const url = 'https://localhost:44365/api/v1/user-management/users';
    const response = await axios.get(url);
    return response.data;
  };

  const fetchUsers = async () => {
    const usersData = await getAllUsers();
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on selected column (First Name, Last Name, or Email)
  const filteredUsers = users.filter((user) => {
    const value = user[filterBy]?.toLowerCase() || ''; // Ensure it doesn't break if the value is missing
    return value.includes(searchQuery.toLowerCase());
  });

  return (
    <div className='container'>
      <div>
        <h1 className='row d-flex justify-content-center'>List of Users</h1>
      </div>

      <div className='d-flex justify-content-between mb-3'>
        <Button className='btn btn-success' onClick={gotoAddUser}>
          Add User
        </Button>

        <div className='d-flex gap-2'>
          <Form.Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
          </Form.Select>

          <Form.Control
            type='text'
            placeholder={`Search by ${filterBy.replace(/([A-Z])/g, ' $1')}`} // Format label (e.g., firstName -> First Name)
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
          {filteredUsers.map((user) => (
            <tr key={user.id} className='align-items-center'>
              <td>{user.firstName}</td>
              <td>{user.middleName}</td>
              <td>{user.lastName}</td>
              <td>{user.birthDay}</td>
              <td>{user.email}</td>
              <td className="d-flex justify-content-around align-items-center">
                <Button className='btn btn-warning' onClick={() => gotoEditUser(user.id)}>
                  Edit
                </Button>
                <Button className='btn btn-danger' onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
