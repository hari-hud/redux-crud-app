// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from './redux/userSlice';

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateUser = () => {
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      // Add other properties as needed
    };
    dispatch(createUser(newUser));
  };

  const handleUpdateUser = (id) => {
    const updatedUserData = {
      name: 'Updated User',
      email: 'updateduser@example.com',
      // Add other properties as needed
    };
    dispatch(updateUser({ id, userData: updatedUserData }));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleCreateUser}>Create User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleUpdateUser(user.id)}>Update</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
