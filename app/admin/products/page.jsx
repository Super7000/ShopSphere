'use client'
import React, { useState, useRef } from 'react';
import ProductList from '../../products/page';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ProductFrom from './component/ProductFrom';

function Products() {
    const [showModal, setShowModal] = useState(false);
    const [productDetails, setProductDetails] = useState({
        _id: '',
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: '',
        stock: '',
        createdAt: ''
    });

    const fetcherFuncRef = useRef(() => { })

    const handleProductClick = (details) => {
        setProductDetails(details);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    async function onSubmitHandler(productDetails) {
        try {
            const res = await axios.put(`/api/admin/products/${productDetails._id}`, productDetails, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            if (res.status == 200) {
                alert('Product updated successfully');
                setShowModal(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function onDeleteHandler() {
        try {
            const res = await axios.delete(`/api/admin/products/${productDetails._id}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            if (res.status == 200) {
                alert('Product deleted successfully');
                setShowModal(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <AddProduct onAdd={() => {
                fetcherFuncRef.current()
            }} />
            <ProductList onProductClick={handleProductClick} fetcherFuncRef={fetcherFuncRef} />
            <ProductFrom
                title={"Update Product Details"}
                submitText={"Save Changes"}
                show={showModal}
                onHide={handleClose}
                onSubmit={onSubmitHandler}
                details={productDetails}
                ExtraButton={() => (
                    <Button variant="danger" onClick={() => {
                        onDeleteHandler()
                        fetcherFuncRef.current()
                    }}>Delete</Button>
                )} />
        </>
    );
}

function AddProduct({ onAdd = () => { } }) {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    async function onSubmitHandler(newProduct) {
        try {
            newProduct.price = Number(newProduct.price);
            newProduct.stock = Number(newProduct.stock);
            const res = await axios.post('/api/admin/products', newProduct, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            if (res.status === 201) {
                alert('Product added successfully');
                setShowModal(false);
                onAdd()
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ position: 'fixed', bottom: '1rem', left: '1rem' }}>
                Add
            </Button>
            <ProductFrom
                title={"Add New Product"}
                submitText={"Add Product"}
                show={showModal}
                onHide={handleClose}
                onSubmit={onSubmitHandler}
            />
        </>
    );
}

export default Products;