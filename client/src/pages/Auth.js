import React, { useContext, useEffect, useState } from "react";
import "../App.css"
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from '../context/AuthContext'


export const Auth = () => {
   const auth = useContext(AuthContext)
   const message = useMessage()
   const { loading, request, error, clearError } = useHttp()
   const [form, setForm] = useState({
      email: '', username: '', password: ''
   })

   useEffect(() => {
      message(error)
      clearError()
   }, [error, message, clearError])


   const changeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value })
   }

   const loginHandler = async () => {
      try {
         const data = await request('/api/auth/login', 'POST', { ...form })
         auth.login(data.token, data.userId)
      } catch (e) { }
   }
   return (
      <div>
         <div className="col-md-12">
            <div className="card card-container">
               <img
                  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  alt="profile-img"
                  className="profile-img-card"
               />
               <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                     type="text"
                     className="form-control"
                     name="username"
                     onChange={changeHandler}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     className="form-control"
                     name="password"
                     onChange={changeHandler}
                  />
               </div>

               <div className="form-group">
                  <button
                     className="btn btn-primary btn-block"
                     onClick={loginHandler}
                     disabled={loading}
                  >
                     <span>Login</span>
                  </button>
               </div>
            </div>
         </div>
      </div>

   );
}
