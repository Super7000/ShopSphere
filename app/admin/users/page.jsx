'use client'
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../../loading';

function Users() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', isAdmin: false });
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setUsers(response.data);
        } catch (err) {
            setError(true)
        }
    };

    const handleShow = (user = null) => {
        setEditUser(user);
        setShow(true);
    };

    const handleClose = () => {
        setEditUser(null);
        setShow(false);
    };

    const handleSave = async () => {
        if (editUser) {
            await axios.put(`/api/admin/users/${editUser._id}`, editUser, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
        } else {
            await axios.post('/api/admin/users', newUser, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
        }
        fetchUsers();
        handleClose();
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/admin/users/${id}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        fetchUsers();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editUser) {
            setEditUser({ ...editUser, [name]: value });
        } else {
            setNewUser({ ...newUser, [name]: value });
        }
    };

    if (error) return (error && <h2>This page is only available for admin account, please <a href={window.location.origin + "/login"}>login</a> with admin account to use.</h2>)
    return (
        <>
            <h1>Users</h1>
            <Button variant="primary" onClick={() => handleShow()} style={{ position: 'fixed', bottom: '1rem', left: "1rem" }}>Add</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 && users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            <td className='d-flex gap-2'>
                                <Button variant="warning" onClick={() => handleShow(user)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && <tr><td colSpan={4}><Loading /></td></tr>}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editUser ? 'Edit User' : 'Add New User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='d-flex flex-column gap-2'>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={editUser ? editUser.username : newUser.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={editUser ? editUser.email : newUser.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {!editUser && (
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={newUser.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        )}
                        <Form.Group controlId="formIsAdmin">
                            <Form.Check
                                type="checkbox"
                                label="Admin"
                                name="isAdmin"
                                checked={editUser ? editUser.isAdmin : newUser.isAdmin}
                                onChange={(e) => handleChange({ target: { name: 'isAdmin', value: e.target.checked } })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Users;