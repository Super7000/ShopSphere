// src/App.jsx (or App.js)
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import AdminNavigationBar from './components/admin/NavBar';
import Dashboard from './components/admin/Dashboard';
import Carts from './components/admin/Carts';
import Users from './components/admin/Users';
import Products from './components/admin/Products';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/admin/products" element={<Products />} />
                    <Route path="/admin/carts" element={<Carts />} />
                    <Route path="/admin/users" element={<Users />} />
                </Route>
            </Routes>
        </Router>
    );
}

function PublicLayout() {
    return (
        <>
            <NavigationBar />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}

function AdminLayout() {
    return (
        <>
            <AdminNavigationBar />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}

export default App;