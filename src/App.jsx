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
import LandingPage from './Pages/LandingPage';


export default function App() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' >
      <Route index element={<LandingPage />} />
      <Route path='' element={<h />} />
      <Route path='/dashboard' element={<DashLayout />} >
        <Route index element={<Dashboard />} />
        <Route path='smart-doc' element={<SmartDoc />} />
        <Route path='tasks' element={<Tasks/>} />
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

