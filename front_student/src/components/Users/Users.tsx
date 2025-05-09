import React, { Fragment, Dispatch, useEffect, JSX } from "react";
import TopCard from "../../common/components/TopCard";
import { IUser } from "../../store/models/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import {
  addAdmin,
  getUsers,
  removeAdmin,
} from "../../store/actions/users.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Users: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users: IUser[] = useSelector((state: IStateType) => state.users.users);
  const admins: IUser[] = useSelector(
    (state: IStateType) => state.users.admins
  );

  function setUserAdmin(user: IUser): void {
    dispatch(addAdmin(user));
  }

  function setUserNotAdmin(admin: IUser): void {
    dispatch(removeAdmin(admin));
  }

  const userElements: JSX.Element[] = users.map((user) => {
    return (
      <tr className={`table-row`} key={`user_${user.id}`}>
        <th scope="row">{user.id}</th>
        <td>{user.username}</td>
        <td>{user.role}</td>
        <td>{dayjs(user.updatedAt).fromNow()}</td>{" "}
        <td>{dayjs(user.createdAt).fromNow()}</td>{" "}
        <td>
          <button
            className="btn btn-success"
            onClick={() => setUserAdmin(user)}
          >
            Set admin
          </button>{" "}
        </td>
      </tr>
    );
  });

  const adminElements: JSX.Element[] = admins.map((admin) => {
    return (
      <tr className={`table-row`} key={`user_${admin.id}`}>
        <th scope="row">{admin.id}</th>
        <td>{admin.username}</td>
        <td>{admin.role}</td>
        <td>{dayjs(admin.updatedAt).fromNow()}</td>{" "}
        <td>{dayjs(admin.createdAt).fromNow()}</td>{" "}
        <td>
          <button
            className="btn btn-danger"
            onClick={() => setUserNotAdmin(admin)}
          >
            Revert admin
          </button>{" "}
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Users</h1>
      <p className="mb-4">Users here</p>

      <div className="row">
        <TopCard
          title="ADMINS"
          text={admins.length.toString()}
          icon="user-tie"
          class="primary"
        />
        <TopCard
          title="USER"
          text={users.length.toString()}
          icon="user"
          class="danger"
        />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Admin List</h6>
              <div className="header-buttons"></div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Username</th>
                      <th scope="col">Role</th>
                      <th scope="col">Update at</th>
                      <th scope="col">Created at</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>{adminElements}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">User List</h6>
              <div className="header-buttons"></div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Username</th>
                      <th scope="col">Role</th>
                      <th scope="col">Update at</th>
                      <th scope="col">Created at</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>{userElements}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
