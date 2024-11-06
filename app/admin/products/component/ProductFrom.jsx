'use client'
import React, { useState, useMemo } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

function ProductFrom({ title = "Model", submitText = "Submit", show = false, onHide = () => { }, onSubmit = () => { }, details, ExtraButton }) {
    const [productDetails, setProductDetails] = useState(details || {
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: '',
        stock: '',
        createdAt: ''
    });

    useMemo(() => {
        if (details)
            setProductDetails(details)
    }, [details]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton className='px-4'>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='px-4'>
                <Form className='d-flex flex-column' onSubmit={() => {
                    e.preventDefault()
                    onSubmit(productDetails)
                }}>
                    {productDetails._id && <span>ID: {productDetails._id}</span>}
                    <Form.Group controlId="formProductName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={productDetails.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={productDetails.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={productDetails.price}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductImageUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="imageUrl"
                            value={productDetails.imageUrl}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={productDetails.category}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductStock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="stock"
                            value={productDetails.stock}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='px-4'>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onSubmit(productDetails)}>
                    {submitText}
                </Button>
                {ExtraButton && <ExtraButton />}
            </Modal.Footer>
        </Modal>
    )
}

export default ProductFrom