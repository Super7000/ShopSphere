import Image from "next/image";
import styles from "./page.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import NavigationBar from "./components/NavigationBar";

export default function Home() {
    return (
        <>
            <NavigationBar />
            <Container className="mt-5">
                <Row>
                    <Col md={8} className="mx-auto text-center">
                        <h1>Welcome to our E-commerce Store</h1>
                        <p className="lead">Find the best products at the best prices!</p>
                        <Link href="/products" passHref>
                            <Button variant="primary" size="lg">Shop Now</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
