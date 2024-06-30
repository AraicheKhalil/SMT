

import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './sidebar'
import Header from './header'
import { useContext, useEffect } from 'react';
import SideBarContext from '@/hooks/context/SideBarContext';



function DashLayout() {
  const location = useLocation();
  const { open, setOpen } = useContext(SideBarContext);

  const noSidebarRoutes = ['/dashboard/smart-doc'];
  const shouldRenderSidebar = !noSidebarRoutes.includes(location.pathname);

  console.log(location.pathname)

  if (!shouldRenderSidebar) {
    setOpen(false)
  }else{
    setOpen(prevValue => !prevValue)
  }



  return (
    <main className="page-wrapper font-Poppins ">
      {/* left of page */}
      <div className=''>
       {<Sidebar />} 
      </div>
      {/* right side/content of the page */}
      <div className={`content-wrapper transition  ${open ? "ml-[250px]" : "ml-[80px]"} max-sm:ml-0`}>
        {!shouldRenderSidebar && <Header />  }
        <Outlet />
      </div>
    </main>
  )
}

export default DashLayout
