import React from 'react'
import { Button, Container, Dropdown, Navbar, SplitButton, NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

function StoreHeader(props) {
  const testData ={
  "logo": "/images/logo-softluxe.svg",
  "layout": {
    "alignment": "row",
    "sections": [
      {
        "uid": "nav_section_branding",
        "order": 0,
        "name": "Branding Section",
        "id": "branding",
        "elements": [
          {
            "uid": "nav_element_logo",
            "order": 0,
            "type": "logo",
            "name": "Soft Luxe",
            "src": "/images/softLuxeLogo.png",
            "alt": "Soft Luxe Logo",
            "href": "/"
          }
        ]
      },
      {
        "uid": "nav_section_primary",
        "order": 1,
        "name": "Primary Navigation",
        "id": "primaryNav",
        "elements": [
          {
            "uid": "nav_home",
            "order": 0,
            "type": "link",
            "name": "Home",
            "href": "/home"
          },
          {
            "uid": "nav_about",
            "order": 1,
            "type": "dropdown",
            "name": "About",
            "href": "/about",
            "children": [
              { "label": "Team", "link": "/about#team" },
              { "label": "Mission", "link": "/about/mission" }
            ]
          },
          {
            "uid": "nav_shop",
            "order": 2,
            "type": "megamenu",
            "name": "Shop",
            "href": "/shop",
            "columns": [
              {
                "title": "Men",
                "items": [
                  { "label": "Shirts", "link": "/shop/men/shirts" },
                  { "label": "Shoes", "link": "/shop/men/shoes" },
                  { "label": "Accessories", "link": "/shop/men/accessories" }
                ]
              },
              {
                "title": "Women",
                "items": [
                  { "label": "Tops", "link": "/shop/women/tops" },
                  { "label": "Dresses", "link": "/shop/women/dresses" },
                  { "label": "Accessories", "link": "/shop/women/accessories" }
                ]
              }
            ]
          },
          {
            "uid": "nav_blog",
            "order": 3,
            "type": "link",
            "name": "Blog",
            "href": "/blog"
          }
        ]
      },
      {
        "uid": "nav_section_others",
        "order": 2,
        "name": "Other Actions",
        "id": "others",
        "elements": [
          {
            "uid": "nav_cart",
            "order": 0,
            "type": "link",
            "name": "Cart 🛒",
            "href": "/cart"
          },
          {
            "uid": "nav_account",
            "order": 1,
            "type": "link",
            "name": "Account",
            "href": "/account"
          },
          {
            "uid": "nav_search",
            "order": 2,
            "type": "function",
            "name": "Search 🔍",
            "action": "/search"
          }
        ]
      }
    ]
  }
}
  return (
    <header className='site designTemplate'>
        {/* <nav className='row p-3 justify-content-between'>
            <div className="col-6">Home</div>
            <div className="col-6">Catalog</div>
        </nav> */}
        <Navbar expand="md" className={
          navigation?.layout?.alignment === "row" ?
          'navigation row justify-content-between align-items-center secondary-bkg p-3 primary-text m-0' :
          'navigation col justify-content-between align-items-center text-center secondary-bkg p-3 primary-text m-0'
        }>
          <Container className='w-100 justify-content-between' fluid >

          <Navbar.Brand href={`/Store/${props.storeId}`} className='text-capitalize'>{props.storeDetails?.storeName ? props.storeDetails.storeName : 'Store Name'}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-end w-100">
              <Nav.Link href={`/Store/${props.storeId}`}>Home</Nav.Link>
              <Nav.Link href={`/Store/${props.storeId}/about`}>About</Nav.Link>
              <Nav.Link href={`/Store/${props.storeId}/products#catalog`}>Catalog</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* <div>
          {
            testData?.layout?.sections.length > 0 ?
            testData?.layout?.sections.map((section:any, indx:number) =>
                <div key={'nav-layout-sect-'+indx} className={
                  section.id === 'others' ? 'd-flex justify-content-end' : ''
                }>
                  {
                    section.elements.map((element:any, elemIndex:number) => (
                      <NavDropdown key={'nav-layout-sect-'+indx+'-elem-'+elemIndex} title={element.name} id={`nav-dropdown-${indx}-${elemIndex}`}>
                        {
                          element.type === 'link' ?
                          <NavDropdown.Item href={element.href}>{element.name}</NavDropdown.Item>
                          :
                          element.type === 'dropdown' ?
                          element.children.map((child:any, childIndex:number) => (
                            <NavDropdown.Item key={`child-${childIndex}`} href={child.link}>{child.label}</NavDropdown.Item>
                          ))
                          :
                          null
                        }
                      </NavDropdown>
                    ))
                  }
                </div>
            ) : null
          }
        </div> */}
    </header>
  )
}

export default StoreHeader