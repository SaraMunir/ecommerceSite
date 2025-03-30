// import React from 'react'

import { Carousel } from "react-bootstrap"

function Hero() {
  return (
    <div className='cover-container d-flex w-100 h-100  mx-auto flex-column vh-75'>
        <Carousel className="h-100">
            <Carousel.Item className="h-100">
                <img src="../../../public/images/home&Lifestyle.jpg" className="d-block w-100 vh-75 object-fit-cover" alt="Place holder"/>
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="../../../public/images/beauty.jpg" className="d-block w-100 vh-75 object-fit-cover" alt="Place holder"/>
                <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp" className="d-block w-100 vh-75  object-fit-cover" alt="Place holder"/>
                <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
  )
}

export default Hero