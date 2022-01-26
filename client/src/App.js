import React from 'react';
import { useRoutes } from './routes';
import { Links } from "./pages/Links"

function App() {
   const routes = useRoutes(false)
   return (
      <div className='container'>
         <Links />
         {routes}
      </div>
   )
}
export default App;