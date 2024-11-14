'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from '../loading';

function Dashboard() {
    const [mostSoldProducts, setMostSoldProducts] = useState(null);
    const [topUsers, setTopUsers] = useState(null);
    const [topProductsByPrice, setTopProductsByPrice] = useState(null);
    const [leastProductsByPrice, setLeastProductsByPrice] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mostSoldProductsRes = await axios.get('/api/admin/analysis/most-sold-products', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setMostSoldProducts(mostSoldProductsRes.data);

                const topUsersRes = await axios.get('/api/admin/analysis/top-users', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setTopUsers(topUsersRes.data);

                const topProductsByPriceRes = await axios.get('/api/admin/analysis/top-products-by-price', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setTopProductsByPrice(topProductsByPriceRes.data);

                const leastProductsByPriceRes = await axios.get('/api/admin/analysis/least-products-by-price', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setLeastProductsByPrice(leastProductsByPriceRes.data);
                setError(false)
            } catch (err) {
                console.log('Error fetching data', err);
                setError(true)
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {error && <h2>This page is only available for admin account, please <Link href={"/login"}>login</Link> with admin account to use.</h2>}
            {!error &&
                <>
                    <h1>Dashboard</h1>

                    {mostSoldProducts ? <section>
                        <h2>Most Sold Products</h2>
                        <ul>
                            {mostSoldProducts.map(product => (
                                <li key={product._id}>{product.product.name} - {product.totalSold} sold</li>
                            ))}
                            {mostSoldProducts.length === 0 && <li>No products found</li>}
                        </ul>
                    </section> : <Loading />}

                    {topUsers ? <section>
                        <h2>Top Users</h2>
                        <ul>
                            {topUsers.map(user => (
                                <li key={user._id}>{user.user.email} - {user.total} orders</li>
                            ))}
                            {topUsers.length === 0 && <li>No users found</li>}
                        </ul>
                    </section> : <Loading />}

                    {topProductsByPrice ? <section>
                        <h2>Top Products by Price</h2>
                        <ul>
                            {topProductsByPrice.map(product => (
                                <li key={product._id}>{product.name} - ${product.price}</li>
                            ))}
                        </ul>
                    </section> : <Loading />}

                    {leastProductsByPrice ? <section>
                        <h2>Least Products by Price</h2>
                        <ul>
                            {leastProductsByPrice.map(product => (
                                <li key={product._id}>{product.name} - ${product.price}</li>
                            ))}
                        </ul>
                    </section> : <Loading />}
                </>}
        </div>
    );
}

export default Dashboard;