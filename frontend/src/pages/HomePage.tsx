import {  Col, Container, Row, } from 'react-bootstrap';
import { Product } from '../types/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductCards from '../components/ProductCards';
import { useGetProductsQuery } from '../hooks/productHooks';
import { ApiError } from '../types/ApiError';
import { getError } from '../utils';
import Hero from '../components/Structure/Hero';

export default function HomePage() {
    const { data: products, isLoading, error} = useGetProductsQuery()
    return isLoading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{ getError( error as ApiError ) }</MessageBox>
        ) :(
        <main className='h-100 vh-50'>
            <title>Home Page</title>
            <meta name="keywords" content="homePage test" />
            <Hero/>
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
