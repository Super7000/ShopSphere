'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import Loading from '../loading';

function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const res = await axios.get('/api/blogs');
        setBlogs(res.data);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Blogs</h1>
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
                            </Card.Body>
                        </Card>
                    </div>
                ))}
                {blogs.length === 0 && <Loading />}
            </div>
        </div>
    )
}

export default Blogs