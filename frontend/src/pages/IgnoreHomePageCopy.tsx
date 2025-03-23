// import React from 'react'
// import Main from '../components/Structure/Main'
import { Card, Col, Container, Row, Button } from 'react-bootstrap';

import { Product } from '../types/Product';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { getError } from '../utils';
import { ApiError } from '../types/ApiError';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductCards from '../components/ProductCards';

type State ={
    products: Product[],
    loading: boolean,
    error:string
}
type Action = 
| { type: 'FETCH_REQUEST' }
| { type: 'FETCH_SUCCESS'
    payload: Product[]
    }
| { type: 'FETCH_FAIL'; payload: string }

const initialState: State = {
    products: [],
    loading: true,
    error: '',
}
const reducer = (state: State, action:Action) =>{
    switch (action.type){
        case 'FETCH_REQUEST':
            return { ...state, loading: true}
        case 'FETCH_SUCCESS':
            return { ...state, products:action.payload, loading: false}
        case 'FETCH_FAIL':
            return { ...state, loading:false, error: action.payload}
        default:
            return state
    }
}

export default function HomePage() {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        const fetchData = async () => {
            dispatch({  
                type:'FETCH_REQUEST'
            })
            try {
                const result = await axios.get('/api/products')
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: result.data
                })
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error as ApiError)
                })
                
            }
        }
        fetchData()
    }, [])
    return (
        loading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) :(
        <main>
            <title>Home Page</title>
            <meta name="keywords" content="homePage test" />

            <Container className='m-0' fluid>
                <Row>
                    {
                    products.map((prods:Product)=>
                    <Col key={prods._id} sm={6} md={4} lg={3}>
                        <ProductCards product={prods}/>
                    </Col>
                        )
                    }
                </Row>
            </Container>
        </main>
        )
    )
}
