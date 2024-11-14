'use client'
import React, { useState, useRef } from 'react';
import ProductList from '../../products/page';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ProductFrom from './component/ProductFrom';
import Link from 'next/link';

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
    const [error, setError] = useState(false)

    const fetcherFuncRef = useRef(() => { })

    const handleProductClick = (details) => {
        setProductDetails(details);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    async function onSubmitHandler(productDetails) {
        const formData = new FormData();
        formData.append('name', productDetails.name);
        formData.append('description', productDetails.description);
        formData.append('price', productDetails.price);
        formData.append('image', productDetails.image);
        formData.append('category', productDetails.category);
        formData.append('stock', productDetails.stock);
        formData.append('createdAt', productDetails.createdAt);

        try {
            const res = await axios.put(`/api/admin/products/${productDetails._id}`, formData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            if (res.status == 200) {
                alert('Product updated successfully');
                setShowModal(false);
            }
            fetcherFuncRef.current()
        } catch (err) {
            console.log(err)
            setError(error)
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
            fetcherFuncRef.current()
        } catch (err) {
            console.log(err)
            setError(error)
        }
    }

    if (error) return (error && <h2>This page is only available for admin account, please <Link href="/login">login</Link> with admin account to use.</h2>)
    return (
        <>
            <AddProduct onAdd={() => {
                fetcherFuncRef.current()
            }} onError={err => setError(err)} />
            <ProductList onProductClick={handleProductClick} fetcherFuncRef={fetcherFuncRef} />
            <ProductFrom
                title={"Update Product Details"}
                submitText={"Save Changes"}
                show={showModal}
                onHide={handleClose}
                onSubmit={onSubmitHandler}
                details={{ ...productDetails, image: productDetails.imageUrl }}
                ExtraButton={() => (
                    <Button variant="danger" onClick={() => {
                        onDeleteHandler()
                        fetcherFuncRef.current()
                    }}>Delete</Button>
                )} />
        </>
    );
}

function AddProduct({ onAdd = () => { }, onError = () => { } }) {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    async function onSubmitHandler(newProduct) {
        try {
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('description', newProduct.description);
            formData.append('price',  Number(newProduct.price));
            formData.append('image', newProduct.image);
            formData.append('category', newProduct.category);
            formData.append('stock', Number(newProduct.stock));
            formData.append('createdAt', newProduct.createdAt);

            const res = await axios.post('/api/admin/products', formData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            if (res.status === 201) {
                alert('Product added successfully');
                setShowModal(false);
                onAdd()
            }
        } catch (err) {
            console.log(err);
            onError(err)
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ position: 'fixed', bottom: '1rem', left: '1rem', zIndex: 10 }}>
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