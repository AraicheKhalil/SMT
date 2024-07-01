import {  Combine, FileBarChart2, LayoutDashboardIcon, ListTodo, MessagesSquare, NotebookTabs, PieChart, Power, Settings } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import SideBarContext from '@/hooks/context/SideBarContext';
import {  NavLink, useLocation } from 'react-router-dom';



export default function Sidebar() {

  const {pathname} = useLocation()

  useEffect(() => {

    function SidebarToggle() {
      if (window.innerWidth <= "1000") {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }

    window.addEventListener('resize', SidebarToggle);

    SidebarToggle();

    // return () => {
    //   window.removeEventListener('resize', SidebarToggle);
    // };
  }, []);


  const Menus = [
    { route : "", title: "Overview", src: <LayoutDashboardIcon /> },
    // { route : "custom-view", title: "Custom View", src: <PieChart /> },
    { route : "smart-doc", title: "Smart Doc ", src:  <FileBarChart2  /> ,gap: true},
    { route : "tasks", title: "Tasks ", src: <Combine />  },
    { route : "chat-doc", title: "Chat Doc", src:  <MessagesSquare /> },
    { route : "settings", title: "Settings", src:  <Settings  />, gap : true },
    { route : "sign-out", title: "Sign Out ", src:  <Power />,  },
    ];

    const { open, setOpen } = useContext(SideBarContext);

  return (
    // <div className="sidebar w-[250px] bg-gray-950 border-r ${open ? "w-[250px]" : "w-[80px]"}">
      <div className={`sidebar flex max-w-[250px] max-sm:hidden `}>
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-gray-950 h-screen p-5 pt-8 relative duration-300`}
        >
          <img
            src="/Logo.png"
            className={`hidden lg:block absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
      border-2 rounded-full ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src="/Logo.png"
              className={`w-10 h-10 cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Smart Doc
            </h1>
          </div>
          <ul className="pt-6 ">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${pathname === `/dashboard/${Menu.route}` && "bg-gray-900 font-medium"} `}
              >
                <NavLink to={`${Menu.route}`} className='flex items-center gap-x-4 w-full'>
                  <div>{Menu.src}</div>
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}