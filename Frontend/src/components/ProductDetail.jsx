import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(res.data);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    async function addToCart() {
        try {
            const res = await axios.post(`http://localhost:5000/api/cart`, {
                productId: product._id,
                quantity: 1,
            }, {
                headers: { 'x-auth-token': localStorage.getItem('token') },
            });
            if (res.status == 200) alert('Added to cart');
            else navigate('/login')
        } catch (error) {
            alert("Please login to add to cart");
            navigate('/login');
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