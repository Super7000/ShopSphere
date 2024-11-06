import React from 'react'
import { Container } from 'react-bootstrap'
import AdminNavigationBar from './components/NavBar'

function Layout({ children }) {
    return (
        <>
            <AdminNavigationBar />
            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout