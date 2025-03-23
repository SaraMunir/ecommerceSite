import React from 'react'
import { Product } from '../types/Product'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

function ProductCards({product}:{product: Product}) {
  return (
    <Link to={'Product/'+product._id}>
        <Card className='mt-2'>
            <Card.Img variant="top" src={product.image} alt={product.name} className='h-' style={{objectFit:'contain', height:'18rem'}}/>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}
                </Card.Text>
                <Button variant="primary">Buy Now</Button>
            </Card.Body>
        </Card>
    </Link>
  )
}

export default ProductCards