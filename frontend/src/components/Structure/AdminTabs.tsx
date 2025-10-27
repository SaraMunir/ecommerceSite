import React, { useEffect, useState } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

/*
  AdminTabs with a fixed sliding sidebar + attached handle
  - The sidebar slides in/out from the left using CSS transform
  - The handle stays attached to the edge and remains visible when closed
  - Click the handle to toggle the menu (uses the provided props.toggleMenu)
*/

const SIDEBAR_WIDTH = 280;

function AdminTabs(
  props: {
    storeNumber: number;
    toggleMenu: () => void;
    menuOpen: boolean;
    bodyContent: boolean;
  }
) {
  const location = useLocation();
  const [baseUrl] = useState(`/Admin/Store/${props.storeNumber}/`);

  const [adminTabs] = useState(
    [
      { name: 'Dashboard', href: baseUrl, className: 'fas fa-chart-bar' },
      {
        name: 'Products',
        tabName: 'NewProducts',
        href: baseUrl + 'NewProducts',
        className: 'fas fa-shopping-cart',
        subMenu: [
          {
            name: 'Categories',
            href: `${baseUrl}NewProducts/CategoryList`,
            className: 'fas fa-shapes',
          },
          {
            name: 'Promotional',
            href: `${baseUrl}NewProducts/Promotional`,
            className: 'fas fa-percent',
          },
        ],
      },
      {
        name: 'Online Store',
        tabName: 'Site',
        href: baseUrl + 'Site',
        className: 'fas fa-window-maximize',
        subMenu: [
          { name: 'Pages', href: `${baseUrl}Site/Pages`, className: 'bi bi-file-earmark-fill' },
          { name: 'Style', href: `${baseUrl}Site/Style`, className: 'bi bi-palette-fill' },
          { name: 'Navigation', href: `${baseUrl}Site/Navigation`, className: 'bi bi-menu-button-wide-fill' },
          { name: 'Preferences', href: `${baseUrl}Site/Preferences`, className: 'bi bi-sliders' },
          { name: 'Components', href: `${baseUrl}Site/Components`, className: 'bi bi-grid-fill' },
        ],
      },
      { name: 'Media', tabName: 'Media', href: baseUrl + 'Media', className: 'far fa-images' },
      { name: 'Orders', tabName: 'Orders', href: baseUrl + 'Orders', className: 'fas fa-file-invoice-dollar' },
      { name: 'Customers', tabName: 'Customers', href: baseUrl + 'Customers', className: 'fas fa-users' },
      { name: 'Settings', tabName: 'Settings', href: baseUrl + 'Settings', className: 'fas fa-cog' },
    ]
  );

  // Derived styles for transform and handle position
  const translateX = props.menuOpen ? '0' : '-100%';
  const handleTranslate = props.menuOpen ? `translate(${SIDEBAR_WIDTH}px, -0)` : 'translate(0, -0)';

  return (
    <div className={props.bodyContent ? 'position-relative col-md-3 col-lg-2 transition col-0' : 'position-relative transition col-0'} id="adminSidebarContainer" >
      {/* Attached handle that stays visible when closed */}
      <div className='d-block bg-light'>
        <button
          type="button"
          aria-controls="admin-sidebar"
          aria-expanded={props.menuOpen}
          aria-label={props.menuOpen ? 'Hide sidebar' : 'Show sidebar'}
          onClick={props.toggleMenu}
          className="btn btn-light border position-absolute"
            style={{
            top: 0,
            left: 0,
            transform: handleTranslate,
            zIndex: 1100, // above sidebar
            borderTopLeftRadius: 0,
            transition: 'transform 250ms ease',
            borderBottomLeftRadius: 0,
            boxShadow: '0 6px 18px rgba(0,0,0,.15)'
            }}
        >
        <span style={{ fontSize: 18, lineHeight: 1 }}>
          {/* « when open, » when closed */}
          {props.menuOpen ? '\u00AB' : '\u00BB'}
        </span>
      </button>
      </div>

      {/* Sliding sidebar (fixed, full-height) */}
      <div
        id="admin-sidebar"
        className="bg-light border"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: SIDEBAR_WIDTH,
          maxWidth: '90vw',
          transform: `translateX(${translateX})`,
          transition: 'transform 250ms ease',
          zIndex: 1050,
          boxShadow: '0 10px 30px rgba(0,0,0,.15)'
        }}
      >
        <Col className='d-md-block bg-light sidebar vh-100 pe-0'>
          <ListGroup defaultActiveKey="#link1" className='nav flex-column list-group-flush bg-light'>
            {adminTabs.map((tab: any, idx: number) => (
              <div key={'tabkey-' + idx}>
                <ListGroup.Item
                  action
                  href={tab.href}
                  className={location.pathname === tab.href ? 'active' : ''}
                  key={'adminTab' + idx}
                >
                  <i className={tab.className} style={{ width: '25px' }}></i>
                  {tab.name}
                </ListGroup.Item>

                {tab.subMenu?.length > 0 && location.pathname.includes(`${tab.tabName}`) ? (
                  <nav id="navbar-example3" className="h-100 flex-column align-items-stretch border-end">
                    <nav className="ms-3 nav nav-pills flex-column">
                      {tab.subMenu.map((subMenu: any, subIdx: number) => (
                        <a
                          key={subMenu.name + subIdx}
                          href={subMenu.href}
                          className={location.pathname === subMenu.href ? 'nav-link active rounded-0' : 'nav-link rounded-0'}
                        >
                          {subMenu.className ? <i className={subMenu.className} style={{ width: '25px' }}></i> : null}
                          &nbsp;
                          {subMenu.name}
                        </a>
                      ))}
                    </nav>
                  </nav>
                ) : null}
              </div>
            ))}
          </ListGroup>
        </Col>
      </div>
    </div>
  )
}

export default AdminTabs
