// import React from 'react'
import { sampleProducts } from '../../data'


import { Card, Col, Container, Row, Button } from 'react-bootstrap';
// import { Product } from '../../types/Product';

function Main() {
    return (
    <main>
        <Container className='m-0' fluid>
            <Row>
                {
                sampleProducts.map(prods=>
                <Col key={prods._id} sm={6} md={4} lg={3}>
                <Card className='mt-2'>
                    <Card.Img variant="top" src={prods.image} alt={prods.name} className='h-' style={{objectFit:'contain', height:'18rem'}}/>
                    <Card.Body>
                    <Card.Title>{prods.name}</Card.Title>
                    <Card.Text>{prods.description}
                    </Card.Text>
                    <Button variant="primary">Buy Now</Button>
                    </Card.Body>
                </Card>
                </Col>
                    )
                }
            </Row>
        </Container>
        
    </main>
    )
}

export default Main