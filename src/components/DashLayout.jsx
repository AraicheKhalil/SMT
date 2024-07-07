

import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './sidebar'
import Header from './header'
import { useContext, useEffect, useState } from 'react';
import SideBarContext from '@/hooks/context/SideBarContext';



function DashLayout() {
  const location = useLocation();
  const { open, setOpen } = useContext(SideBarContext);

  let noHeaderInSmartDoc = ['/dashboard/smart-doc'];
  let noHeaderInchat = ['/dashboard/chat-doc'];
  let shouldRenderHeader = !noHeaderInSmartDoc.includes(location.pathname) && !noHeaderInchat.includes(location.pathname);

  // const [open , setOpen] = useState(true)



  return (
    <main className="page-wrapper font-Poppins ">
      {/* left of page */}
      <div className=''>
       {<Sidebar />} 
      </div>
      {/* right side/content of the page */}
      <div className={`content-wrapper transition  ${open ? "ml-[250px]" : "ml-[80px]"} max-sm:ml-0`}>
        {shouldRenderHeader && <Header />  }
        <Outlet />
      </div>
    </main>
  )
}

export default DashLayout
