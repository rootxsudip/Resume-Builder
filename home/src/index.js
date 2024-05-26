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
import store from './ReduxManager/Store'
import { Provider } from 'react-redux'
import Missing from './Routes/Missing';
import DetailsFillingPage from './Components/resume/DetailsFillComponents/DetailsFillingPage';
import MyResume from './Components/resume/ResumeDisplay/MyResume';
import Resumes from './Routes/Resumes';
import { ResumeProvider } from './context/ResumeContext';
import { ProfileProvider } from './context/ProfileContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/js/dist/modal";
import SharedResume from './Components/resume/ResumeDisplay/SharedResume';
import MyAccount from './Components/MyAccount';
import Pricing from './Components/Pricing';
import ResetPassword from './Components/ResetPassword';
import ForgotPassword from './Components/ForgotPassword';
// import AdminLayout from './Routes/AdminLayout';
const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path='/' element={<App/>}>
    <Route path='/'>

      {/* Public routes */}
      <Route path='/' element={<App/>} >
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/templates' element={<Templates />} />
      <Route path='/resumes' element={<Resumes />} />
      <Route path="/detailsfillingpage/*" element ={<DetailsFillingPage />}/>
      <Route path="/myresume" element={<MyResume/>}/>
      <Route path="/shared/resume/:resumeId" element={<SharedResume/>}/>
      <Route path="/account" element={<MyAccount/>}/>
      <Route path="/pricing" element={<Pricing/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Route>

      <Route path='/unauthorized' element={<Unauthorized/>}/>
      <Route path='/logout' element={<Logout/>}/>
      {/* <Route path='/register' element={<Regiser/>}/>  */}

      {/* Protected routes */}
      <Route path='/admin' element={<RequireAuth allowedRoles={['ROLE_ADMIN']}/>}>
      <Route element={<Layout/>}>
      <Route path='' element={<Admin/>}/>
      <Route path='templates' element={<ManageTemplate/>}/>
      <Route path='users' element={<Users/>}/>
      </Route>
      {/* <Route element={<AdminLayout/>}/> */}
      </Route>
      <Route element={<RequireAuth allowedRoles={['ROLE_USER','ROLE_ADMIN']}/>}>
      {/* <Route path='/dashboard' element={<Dashboard/>}> */}
        
      {/* </Route> */}
      </Route>

      {/* Missing */}
      <Route path='*' element={<Missing />}/>
      
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <ProfileProvider>
  <SubscriptionProvider>
  <Provider store={store}>
  <ResumeProvider>
  {/* <React.StrictMode> */}
  <RouterProvider router={router}/>
  {/* </React.StrictMode> */}
  </ResumeProvider>
  </Provider>
  </SubscriptionProvider>
  </ProfileProvider>
  </AuthProvider>
);


