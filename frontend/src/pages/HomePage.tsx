// import React from 'react'
// import Main from '../components/Structure/Main'
import {  Col, Container, Row, } from 'react-bootstrap';
import { Product } from '../types/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductCards from '../components/ProductCards';
import { useGetProductsQuery } from '../hooks/productHooks';
import { ApiError } from '../types/ApiError';
import { getError } from '../utils';

export default function HomePage() {
    const { data: products, isLoading, error} = useGetProductsQuery()

    return isLoading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{ getError( error as ApiError ) }</MessageBox>
        ) :(
        <main>
            <title>Home Page</title>
            <meta name="keywords" content="homePage test" />

            <Container className='m-0' fluid>
                <Row>
                    {
                    products!.map((prods:Product)=>
                    <Col key={prods._id} sm={6} md={4} lg={3}>
                        <ProductCards product={prods}/>
                    </Col>
                        )
                    }
                </Row>
            </Container>
        </main>
        )
}
