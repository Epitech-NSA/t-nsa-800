import React, { useState, Dispatch, JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { IStateType } from "../../store/models/root.interface";
import { useSession } from "../../contexts/SessionContext";

function TopMenuAccount(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const email: string = useSelector((state: IStateType) => state.account.email);
  const [isShow, setShow] = useState(false);
  const session = useSession();

  return (
    <li className="nav-item dropdown no-arrow">
      <a
        className="nav-link dropdown-toggle"
        onClick={() => {
          setShow(!isShow);
        }}
        href="# "
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="mr-2 d-none d-lg-inline small cadet">{email}</span>
        <img
          className="img-profile rounded-circle"
          alt=""
          src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
        />
      </a>

      <div
        className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
          isShow ? "show" : ""
        }`}
        aria-labelledby="userDropdown"
      >
        <a
          className="dropdown-item"
          onClick={() => {
            dispatch(logout());
            session.removeSession();
          }}
          href="# "
          data-toggle="modal"
          data-target="#logoutModal"
        >
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  );
}

export default TopMenuAccount;
