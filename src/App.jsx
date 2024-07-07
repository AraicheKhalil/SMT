import './App.css'

import React, { useEffect, useState } from 'react'
import { Route , RouterProvider , createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import SideBarContext from '@/hooks/context/SideBarContext';
import DashLayout from './components/DashLayout';
import Dashboard from './Pages/Dashboard';
import Tasks from './Pages/Tasks';
import ChatDocs from './Pages/ChatDocs';
import SmartDoc from './Pages/SmartDoc';
import Settings from './Pages/Settings';
import CustomView from './Pages/CustomView';
import AOS from "aos";
import "aos/dist/aos.css";
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Tools from './Pages/Tools';
import ToolsTypes from './Pages/ToolsType';


export default function App() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' >
      <Route index element={<LandingPage />} />
      <Route path='auth/login' element={<Login />} />
      <Route path='auth/signup' element={<Signup />} />
      
      <Route path='dashboard' element={<DashLayout />} >
        <Route index element={<Dashboard />} />
        <Route path='smart-doc' element={<SmartDoc />} />
        <Route path='tasks' element={<Tasks/>} />
        <Route path='tools' element={<Tools/>} />
        <Route path='tools/:type'>
          <Route index element={<ToolsTypes />} />
        </Route>
        <Route path='chat-doc' element={<ChatDocs/>} />
        <Route path='settings' element={<Settings/>} />
        <Route path='custom-view' element={<CustomView/>} />
      </Route>
    </Route>
  ))
  return (
    <SideBarContext.Provider value={{ open, setOpen }}>
      <div className='font-Poppins' >
        <RouterProvider router={router} />
      </div>
     </SideBarContext.Provider> 
  )
}

