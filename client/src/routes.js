import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Links } from "./pages/Links"
import { Auth } from "./pages/Auth"
import { Shop } from "./pages/Shop"
import { DevicePage } from "./pages/DevicePage"
import { Cart } from "./pages/Cart"
import { Register } from "./pages/Register"


export const useRoutes = isAuthenticated => {
   if (isAuthenticated) {
      return (
         <Switch>
            <Route path="/links" exact>
               <Links />
            </Route>
            <Route path="/cart" exact>
               <Cart />
            </Route>
            <Route path="/" exact>
               <Shop />
            </Route>
            <Route path="/detail/:id" exact>
               <DevicePage />
            </Route>
            <Redirect to="/"/>
         </Switch>
      )
   }


   return (
      <Switch>
         <Route path="/register" exact>
            <Register />
         </Route>
         <Route path="/login" exact>
            <Auth />
         </Route>
         <Route path="/" exact>
               <Shop />
         </Route>
         <Redirect to="/"/>
      </Switch>
   )
}