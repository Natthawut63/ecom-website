import React, { useState, useEffect } from "react";
import {
  getListAllUsers,
  changeUserStatus,
  changeUserRole,
} from "../../api/admin";
import useEconStore from "../../store/ecom-store";
import { use } from "react";
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
        toast.success("Update Status Success");
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
        toast.success("Update Role Success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>Email</th>
            {/* <th>วันที่เเก้ไขล่าสุด</th> */}
            <th>สิทธิ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((el, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{el.email}</td>
              {/* <td>{el.updatedAt}</td> เพิ่มจาก backend*/}
              <td>
                <select
                  onChange={(e) => handleChangeUserRole(el.id, e.target.value)}
                  value={el.role}
                >
                  <option>user</option>
                  <option>admin</option>
                </select>
              </td>
              <td>{el.enabled ? "Active" : "Inactive "}</td>
              <td>
                <button
                  className="bg-blue-500 rounded-md p-2 hover:bg-blue-700 shadow-md"
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
