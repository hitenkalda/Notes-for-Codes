import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import ViewPaste  from './components/ViewPaste'
import './App.css'
import Paste from './components/Paste'

const router = createBrowserRouter(
/* This code block is defining the routes for your application using the `react-router-dom` library in
a JavaScript React application. Each route is an object with a `path` property and an `element`
property. */
  [
    {
    path: '/',
    element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path: '/pastes',
      element:
        <div>
          <Navbar />
          {/* <Home /> */}
          <Paste />
        </div>
      },
      {
        path: '/pastes/:id',
        element:
          <div>
            <Navbar />
            <ViewPaste />
          </div>
        },
  ]
);

function App() {

  return (
    <>
      <div className='wd-full'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
