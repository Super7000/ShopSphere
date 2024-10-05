
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList({ onProductClick = () => { }, fetcherFuncRef = useRef(() => { }) }) {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
    };
    fetcherFuncRef.current = fetchProducts;

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <Row>
            {products.map(product => (
                <Col md={4} key={product._id}>
                    <Card className="mb-4" onClick={() => onProductClick(product)}>
                        <Card.Img variant="top" src={product.imageUrl} style={{ height: '15rem', objectFit: 'cover', objectPosition: 'center' }} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>${product.price}</Card.Text>
                            <Button as={Link} to={`/product/${product._id}`} variant="primary">View Details</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default ProductList;