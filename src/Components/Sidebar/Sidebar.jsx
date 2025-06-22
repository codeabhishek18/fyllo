import React from "react"
import "./Sidebar.css"
import { Link } from "react-router-dom"
import {
  TrendingUp,
  Inventory2
} from "@mui/icons-material"
import { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom"


function Sidebar() 
{
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className={`sidebarListItem ${location.pathname === "/" ? "active" : ""}`}>
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Analytics
              </li>
            </Link>
            <Link to="/product" className={`sidebarListItem ${location.pathname === "/product" ? "active" : ""}`}>
              <li className="sidebarListItem">
                <Inventory2 className="sidebarIcon" />
                Products
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
