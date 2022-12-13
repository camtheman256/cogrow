/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";
import { InfoCircleFilled, PushpinFilled, ReadFilled } from "@ant-design/icons";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/cogrow-logo.png";

function SidenavItem({ color, label, icon, active, link, key, onClick }) {
  return  <Menu.Item key={key}>
          <NavLink to={link} onClick={onClick}>
            <span
              className="icon"
              style={{
                background: active ? color : "",
              }}
            >
              {icon}
            </span>
            <span className="label">{label}</span>
          </NavLink>
        </Menu.Item>
}

function Sidenav({ color, toggleDrawer }) {
  const { pathname } = useLocation();

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const routes = [{
    label: 'Projects',
    link: '/projects',
    icon: dashboard
  },{
    label: 'About',
    link: '/about',
    icon: <InfoCircleFilled />
  }, {
    label: 'Learn',
    link: '/learn',
    icon: <ReadFilled />
  }, {
    label: 'Map',
    link: '/map',
    icon: <PushpinFilled />
  }]


  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>CoGrow</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {routes.map((r, i) => <SidenavItem key={i} color={color} active={pathname === r.link} {...r} onClick={toggleDrawer} />)}
      </Menu>
    </>
  );
}

export default Sidenav;
