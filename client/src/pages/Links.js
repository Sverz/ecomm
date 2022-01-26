import React from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css'

export const Links = () => {
   return (

      <div>
         <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
               Ecomm
            </Link>
            <div className="navbar-nav mr-auto">
               <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                     Home
                  </Link>
               </li>
               
               {/*showAdminBoard  (
                  <li className="nav-item">
                     <Link to={"/admin"} className="nav-link">
                        Admin Board
                     </Link>
                  </li>
               )*/}
            

            <div className="navbar-nav ml-auto">
            <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                     User
                  </Link>
               </li>
            </div>

            <div className="navbar-nav ml-auto">
               <li className="nav-item">
                  <a href="/login" className="nav-link" >
                     LogOut
                  </a>
               </li>
            </div>
               <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                     Login
                  </Link>
               </li>

               <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                     Sign Up
                  </Link>
               </li>

            </div>
         </nav>
      </div >
   )
};


