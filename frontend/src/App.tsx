// import { useState } from 'react'

import { Outlet } from 'react-router-dom';
import './App.scss';
// import Button from 'react-bootstrap/Button';

// import { sampleProducts } from './data'
import Header from './components/Structure/Header';
import Main from './components/Structure/Main';

function App() {
  return (
    <div className='container-fluid p-0 h-100 mt-0'>
      
      <Header />
      <Outlet />
    </div>
  )
}

export default App
