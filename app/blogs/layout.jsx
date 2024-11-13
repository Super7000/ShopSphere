import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { Container } from 'react-bootstrap'

function Layout({ children }) {
    return (
        <>
            <NavigationBar />
            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout