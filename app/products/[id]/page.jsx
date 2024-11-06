'use client'
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const navigate = useRouter();

    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`/api/products/${id}`);
            setProduct(res.data);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    async function addToCart() {
        try {
            const res = await axios.post(`/api/cart`, {
                productId: product._id,
                quantity: 1,
            }, {
                headers: { 'x-auth-token': localStorage.getItem('token') },
            });
            if (res.status == 200) alert('Added to cart');
            else navigate.push('/login')
        } catch (error) {
            alert("Please login to add to cart");
            navigate.push('/login');
        }
    }

    return (
        <Card>
            <Card.Img variant="top" src={product.imageUrl} style={{ height: '20rem', objectFit: 'cover', objectPosition: 'center' }} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
            </Card.Body>
        </Card>
    );
}

export default ProductDetail;