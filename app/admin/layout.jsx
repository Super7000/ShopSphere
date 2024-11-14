'use client'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import AdminNavigationBar from './components/NavBar'
import Link from 'next/link';

function Layout({ children }) {
    const [onError, setOnError] = useState(null);

    return (
        <>
            <AdminNavigationBar onError={setOnError} />
            <Container>
                {!onError && children}
                {onError && <h2>This page is only available for admin account, please <Link href="/login">login</Link> with admin account to use.</h2>}
            </Container>
        </>
    )
}

export default Layout