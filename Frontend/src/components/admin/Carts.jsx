import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function Carts() {
    const [carts, setCarts] = useState([]);
    const [show, setShow] = useState(false);
    const [editCart, setEditCart] = useState(null);
    const [newCart, setNewCart] = useState({ user: { _id: '' }, products: [{ product: '', quantity: 1 }] });
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchCarts();
    }, []);

    const fetchCarts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cart/all', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCarts(response.data);
        } catch (error) {
            setError(true)
        }
    };

    const handleShow = (cart = null) => {
        setEditCart(cart);
        setShow(true);
    };

    const handleClose = () => {
        setEditCart(null);
        setShow(false);
    };

    const handleSave = async () => {
        if (editCart) {
            await axios.put(`http://localhost:5000/api/cart/${editCart._id}`, editCart, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
        } else {
            await axios.post('http://localhost:5000/api/cart', newCart, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
        }
        fetchCarts();
        handleClose();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/cart/${id}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        fetchCarts();
    };

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (editCart) {
            if (index !== null) {
                const updatedProducts = [...editCart.products];
                updatedProducts[index][name] = value;
                setEditCart({ ...editCart, products: updatedProducts });
            } else {
                setEditCart({ ...editCart, user: { ...editCart.user, [name]: value } });
            }
        } else {
            if (index !== null) {
                const updatedProducts = [...newCart.products];
                updatedProducts[index][name] = value;
                setNewCart({ ...newCart, products: updatedProducts });
            } else {
                setNewCart({ ...newCart, user: { ...newCart.user, [name]: value } });
            }
        }
    };
    if (error) return (error && <h2>This page is only available for admin account, please <a href={window.location.origin + "/login"}>login</a> with admin account to use.</h2>)
    return (
        <>
            <h1>Carts</h1>
            <Button variant="primary" onClick={() => handleShow()} style={{ position: 'fixed', bottom: '1rem', left: "1rem" }}>Add</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Products</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map(cart => (
                        <tr key={cart._id}>
                            <td>{cart.user._id}</td>
                            <td>
                                {cart.products.map((product, index) => (
                                    <div key={index}>
                                        Product: {product.product}, Quantity: {product.quantity}
                                    </div>
                                ))}
                            </td>
                            <td className='d-flex gap-2'>
                                <Button variant="warning" onClick={() => handleShow(cart)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(cart._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editCart ? 'Edit Cart' : 'Add New Cart'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='d-flex flex-column gap-2'>
                        <Form.Group controlId="formUser">
                            <Form.Label>User</Form.Label>
                            <Form.Control
                                type="text"
                                name="_id"
                                value={editCart ? editCart.user._id : newCart.user._id}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {(editCart ? editCart.products : newCart.products).map((product, index) => (
                            <div key={index}>
                                <Form.Group controlId={`formProduct${index}`}>
                                    <Form.Label>Product</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="product"
                                        value={product.product}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </Form.Group>
                                <Form.Group controlId={`formQuantity${index}`}>
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </Form.Group>
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Carts;