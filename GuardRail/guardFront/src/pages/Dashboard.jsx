import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import './Dashboard.css'

const Dashboard = () => {
  return (
   <div className="dashboard">
    <Header/>
    <main className="dashboard-content">
        <Outlet />
    </main>
    <Footer/>
   </div>
  )
}

export default Dashboard