'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap';
import Loading from '../../loading';

function Blogs() {
    const [show, setShow] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [editBlog, setEditBlog] = useState(null);
    const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' });
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('/api/blogs');
            setBlogs(res.data);
        } catch (error) {
            setError(true)
        }
    };

    const handleShow = (user = null) => {
        setEditBlog(user);
        setShow(true);
    };

    const handleClose = () => {
        setEditBlog(null);
        setShow(false);
    };

    const handleSave = async () => {
        try {
            if (editBlog) {
                await axios.put(`/api/admin/blogs/${editBlog._id}`, editBlog, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
            } else {
                await axios.post('/api/admin/blogs', newBlog, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
            }
            fetchBlogs();
        } catch (error) {
            setError(error)
        }
        handleClose();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/blogs/${id}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            fetchBlogs();
        } catch (error) {
            setError(error)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editBlog) {
            setEditBlog({ ...editBlog, [name]: value });
        } else {
            setNewBlog({ ...newBlog, [name]: value });
        }
    };

    if (error) return (error && <h2>This page is only available for admin account, please <Link href="/login">login</Link> with admin account to use.</h2>)
    return (
        <>
            <div>
                <h1>Blogs</h1>
                <div className="row">
                    {blogs.map(blog => (
                        <div key={blog._id} className="col-md-4 mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{blog.title}</Card.Title>
                                    <h6 className="card-subtitle mb-2 text-muted">By {blog.author}</h6>
                                    <Card.Text>
                                        <small className="text-muted">Posted on {new Date(blog.createdAt).toLocaleDateString()}</small>
                                    </Card.Text>
                                    <Link href={`/blogs/${blog._id}`} onClick={e => e.stopPropagation()} passHref>
                                        <Button variant="primary">Read More</Button>
                                    </Link>
                                    <Button variant="secondary" className='ms-2' onClick={() => handleShow(blog)}>Edit</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    {blogs.length === 0 && <Loading />}
                </div>
            </div>

            <Button variant="primary" onClick={() => handleShow()} style={{ position: 'fixed', bottom: '1rem', left: "1rem", zIndex: 10 }}>Add</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editBlog ? 'Edit Blog' : 'Add New Blog'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='d-flex flex-column gap-2'>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={editBlog ? editBlog.title : newBlog.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="content"
                                value={editBlog ? editBlog.content : newBlog.content}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                value={editBlog ? editBlog.author : newBlog.author}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={async (e) => {
                        e.target.disabled = true
                        await handleSave()
                        e.target.disabled = false
                    }}>Save Changes</Button>
                    {editBlog && (
                        <Button variant="danger" onClick={async (e) => {
                            e.target.disabled = true
                            handleDelete(editBlog._id)
                            e.target.disabled = false
                        }}>Delete</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Blogs