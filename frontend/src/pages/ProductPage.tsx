import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductDetailsByIdQuery } from '../hooks/productHooks'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Col, Row } from 'react-bootstrap'

export default function ProductPage() {
  const params = useParams()
  const { id } = params
  const { data: product, isLoading, error }=useGetProductDetailsByIdQuery(id!)

  return (
    isLoading ? (
      <LoadingBox /> )
      : 
      error ? (
        <MessageBox variant='danger'> Product Not Found</MessageBox>
      ) 
      :
      (
        <section>
          {
            product ? 
            <Row>
              <Col md={6}>
                <img src={product.image} alt=""  className='w-100'/>
              </Col>
              <Col md={6}>
                <title>{product!.name}</title>
                <h1>{product!.name}</h1>
                <div>
                </div>
              </Col>
            </Row>
            :
            <></>
          }
        </section>
      )
    )
  
}
