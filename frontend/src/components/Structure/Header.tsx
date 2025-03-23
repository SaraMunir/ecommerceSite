// import React from 'react'
import { Button, Dropdown, Navbar, SplitButton } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Category } from '../../types/Category';
import { useGetCategoriesQuery, useGetSubCategoriesQuery } from '../../hooks/categoryHooks';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { ApiError } from '../../types/ApiError';
import { getError } from '../../utils';
import DropDownSubNavs from './DropDownSubNavs';
function Header() {
    const { data: categories, isLoading, error} = useGetCategoriesQuery()

    return isLoading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{ getError( error as ApiError ) }</MessageBox>
    ) :
    (
        <header className='p-0 m-0'>
            <Navbar expand="md" className="" variant='dark' bg="dark">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/About">About</Nav.Link>
                            {/* /Category/:categoryName/:id */}
                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                {
                                    categories!.map((cat:Category)=>
                                        <NavDropdown.Item href={"/Category/"+ cat.name +"/"+cat._id} className={cat.subCategories.length>0?'d-flex justify-content-between align-items-center position-relative hover-box':'d-flex justify-content-between align-items-center' } key={cat._id}>
                                            {cat.dispName}
                                            {
                                                cat.subCategories.length>0 ?
                                                <div className='position-relative hover-toggle'>
                                                    <Button variant="link" className=''> <i className="fas fa-chevron-right"></i></Button>
                                                        {/* <Dropdown.Menu className='position-absolute top-0 end-0'>
                                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        </Dropdown.Menu> */}
                                                        <DropDownSubNavs  category={cat}/>
                                                </div>
                                                : <></>
                                            }
                                        </NavDropdown.Item>
                                    )
                                }
                                {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={"/Category"}>All</NavDropdown.Item>
                                {[ 'end'].map(
                                    (direction) => (
                                    <NavDropdown
                                        key={direction}
                                        id={`dropdown-button-drop-${direction}`}
                                        drop={direction}
                                        variant='light'
                                        title={`test ${direction}`}
                                        style={{color:"black"}}
                                        >
                                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                    </NavDropdown>
                                    ),
                                )}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header