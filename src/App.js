// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from './redux/userSlice';
import './App.css'; // Import a custom stylesheet for styling

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [idCounter, setIdCounter] = useState(1);
  const [createUserData, setCreateUserData] = useState({ newUsername: '', newEmail: '' });
  const [updateData, setUpdateData] = useState({ id: null, newUsername: '', newEmail: '' });
  const [notification, setNotification] = useState(null);

  const handleCreateUser = () => {
    // Check if both username and email are provided
    if (createUserData.newUsername && createUserData.newEmail) {
      const newUser = {
        id: idCounter,
        name: createUserData.newUsername,
        email: createUserData.newEmail,
      };
      dispatch(createUser(newUser));
      setIdCounter((prevId) => prevId + 1);
      setCreateUserData({ newUsername: '', newEmail: '' });
      showNotification('New user added');
    } else {
      showNotification('Both username and email are required');
    }
  };

  const handleCreateUsernameChange = (e) => {
    setCreateUserData({ ...createUserData, newUsername: e.target.value });
  };

  const handleCreateEmailChange = (e) => {
    setCreateUserData({ ...createUserData, newEmail: e.target.value });
  };

  const handleUpdateUser = (id, username, email) => {
    setUpdateData({ id, newUsername: username, newEmail: email });
  };

  const handleUpdateUsernameChange = (e) => {
    setUpdateData({ ...updateData, newUsername: e.target.value });
  };

  const handleUpdateEmailChange = (e) => {
    setUpdateData({ ...updateData, newEmail: e.target.value });
  };

  const handleUpdateUserConfirm = () => {
    // Check if username is provided
    if (updateData.newUsername) {
      const { id, newUsername, newEmail } = updateData;
      const updatedUserData = {
        name: newUsername,
        email: newEmail,
      };
      dispatch(updateUser({ id, userData: updatedUserData }));
      setUpdateData({ id: null, newUsername: '', newEmail: '' });
      showNotification('User updated');
    } else {
      showNotification('Username is required for update');
    }
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    showNotification('User deleted');
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">Users</h1>
      <div className="create-user-container">
        <input
          type="text"
          placeholder="Username"
          value={createUserData.newUsername}
          onChange={handleCreateUsernameChange}
          required
        />
        <input
          type="text"
          placeholder="Email"
          value={createUserData.newEmail}
          onChange={handleCreateEmailChange}
          required
        />
        <button className="create-user-button" onClick={handleCreateUser}>
          Create User
        </button>
      </div>
      {notification && <div className="notification">{notification}</div>}
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {user.id === updateData.id ? (
              <>
                <input
                  type="text"
                  placeholder="New Username"
                  value={updateData.newUsername}
                  onChange={handleUpdateUsernameChange}
                  required
                />
                <input
                  type="text"
                  placeholder="New Email"
                  value={updateData.newEmail}
                  onChange={handleUpdateEmailChange}
                />
                <button className="confirm-update-button" onClick={handleUpdateUserConfirm}>
                  Confirm
                </button>
              </>
            ) : (
              <>
                <div className="user-details">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
                <div className="user-buttons">
                  <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                  <button className="update-button" onClick={() => handleUpdateUser(user.id, user.name, user.email)}>
                    Update
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
