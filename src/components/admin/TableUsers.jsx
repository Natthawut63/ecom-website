import React, { useState, useEffect } from "react";
import {
  getListAllUsers,
  changeUserStatus,
  changeUserRole,
} from "../../api/admin";
import useEconStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEconStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("Update Status Success", { autoClose: 1000 });
      })
      .catch((err) => console.log(err));
  };
  const handleChangeUserRole = (userId, userRole) => {
    console.log(userId, userRole);
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        handleGetUsers(token);
        toast.success("Update Role Success", { autoClose: 1000 });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="bg-indigo-100">
            <th className="px-4 py-3 border border-gray-300 text-sm font-semibold text-gray-700">
              No
            </th>
            <th className="px-4 py-3 border border-gray-300 text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-4 py-3 border border-gray-300 text-sm font-semibold text-gray-700">
              Permission
            </th>
            <th className="px-4 py-3 border border-gray-300 text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-4 py-3 border border-gray-300 text-sm font-semibold text-gray-700">
              Manage
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((el, i) => (
            <tr key={i} className="border-b-2 hover:bg-gray-50">
              <td className="px-4 py-3">{i + 1}</td>
              <td className="px-4 py-3"> {el.email}</td>
              {/* <td>{el.updatedAt}</td> เพิ่ม backend*/}
              <td className="px-4 py-3">
                <select
                  onChange={(e) => handleChangeUserRole(el.id, e.target.value)}
                  value={el.role}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option className="px-4 py-3">user</option>
                  <option className="px-4 py-3">admin</option>
                </select>
              </td>
              <td>{el.enabled ? "Active" : "Inactive "}</td>
              <td>
                <button
                  className={`${
                    el.enabled
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white py-2 px-4 rounded-md transition-all duration-200`}
                  onClick={() => handleChangeUserStatus(el.id, el.enabled)}
                >
                  {el.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
