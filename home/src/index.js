import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from "./Routes/Home";
import Templates from "./Routes/Templates";
import About from "./Routes/AboutUs";
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './Components/requireAuth';
import Dashboard from './pages/User/Dashboard';
import Unauthorized from './Components/Unauthorized';
import Logout from './Components/Logout';
import {Admin,ManageTemplate,Users} from "./pages/Admin/index"
import Layout from './pages/Admin/components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path='/' element={<App/>}>
    <Route path='/'>

      {/* Public routes */}
      <Route path='/' element={<App/>} >
      <Route path='/' element={<Home />} />
      <Route path='/templates' element={<Templates />} />
      <Route path='/about' element={<About />} />
      </Route>
      <Route path='/unauthorized' element={<Unauthorized/>}/>
      <Route path='/logout' element={<Logout/>}/>
      {/* <Route path='/register' element={<Regiser/>}/> */} 

      {/* Protected routes */}
      <Route path='/admin' element={<RequireAuth allowedRoles={['ROLE_ADMIN']}/>}>
      <Route element={<Layout/>}>
      <Route path='' element={<Admin/>}/>
      <Route path='templates' element={<ManageTemplate/>}/>
      <Route path='users' element={<Users/>}/>
      </Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={['ROLE_USER','ROLE_ADMIN']}/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>

      {/* Missing */}
      {/* <Route path='*' element={<Missing />}/> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>
  </AuthProvider>
);


