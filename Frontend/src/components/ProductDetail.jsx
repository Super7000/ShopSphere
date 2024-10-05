import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(res.data);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    async function addToCart() {
        const res = await axios.post(`http://localhost:5000/api/cart`, {
            productId: product._id,
            quantity: 1,
        }, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        console.log(res.data);
        alert('Added to cart');
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