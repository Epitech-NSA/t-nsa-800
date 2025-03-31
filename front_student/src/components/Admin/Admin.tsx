// src/components/Admin/Admin.tsx
import { Fragment } from "react";
import Notifications from "../../common/components/Notification";
import LeftMenu from "../LeftMenu/LeftMenu";
import TopMenu from "../TopMenu/TopMenu";
import { Outlet } from "react-router-dom";
import React from "react";

const Admin: React.FC = () => {
  return (
    <Fragment>
      <Notifications />
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
