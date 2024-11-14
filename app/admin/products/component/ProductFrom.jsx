'use client'
import React, { useState, useMemo } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Loading from '../../../loading';

function ProductFrom({ title = "Model", submitText = "Submit", show = false, onHide = () => { }, onSubmit = async () => { }, details, ExtraButton }) {
    const [productDetails, setProductDetails] = useState(details || {
        name: '',
        description: '',
        price: '',
        image: null,
        category: '',
        stock: '',
        createdAt: ''
    });
    const [submitComplete, setSubmitComplete] = useState(true)

    useMemo(() => {
        if (details)
            setProductDetails(details)
    }, [details]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'image') {
            setProductDetails(prevDetails => ({
                ...prevDetails,
                image: e.target.files[0]
            }));
            return;
        }
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
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            className={typeof productDetails.image != 'string' ? 'd-block' : 'd-none'}
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleChange}
                        />
                        <br />
                        <Form.Label className='w-100'>
                            <img src={typeof productDetails.image != 'string' && productDetails.image != null ? URL.createObjectURL(productDetails.image) : productDetails.image} className='w-100 rounded' alt={productDetails.name} />
                        </Form.Label>
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
                <Button variant="primary" onClick={async (e) => {
                    e.target.disabled = true
                    setSubmitComplete(false)
                    await onSubmit(productDetails)
                    e.target.disabled = false
                    setSubmitComplete(true)
                }}>
                    {submitComplete ? submitText : <Loading size={15} borderWidth={2} color='white' />}
                </Button>
                {ExtraButton && <ExtraButton />}
            </Modal.Footer>
        </Modal>
    )
}

export default ProductFrom