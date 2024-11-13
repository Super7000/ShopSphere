'use client'
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Loading from '../../loading';
import Link from 'next/link';

function BlogDetail() {
    const [blog, setBlog] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await axios.get(`/api/blogs/${id}`);
            setBlog(res.data);
        };
        fetchBlog();
    }, [id]);

    if (!blog) return <Loading />;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.content}</Card.Text>
                <Card.Text>
                    <small className="text-muted">By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</small>
                </Card.Text>
                <Link href={`/blogs`} passHref>
                    <Button variant="primary">Back to Blogs</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default BlogDetail;