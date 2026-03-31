import React, { useState, useEffect } from "react";
import {
  getListAllUsers,
  changeUserStatus,
  changeUserRole,
} from "../api/admin";
import useEconStore from "../../../app/store/ecom-store";
import { toast } from "react-toastify";
import { User, MoreVertical } from "lucide-react";

const TableUsers = () => {
  const token = useEconStore((state) => state.token);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = async (token) => {
    setLoading(true);
    try {
      const res = await getListAllUsers(token);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        handleGetUsers(token);
        toast.success("Status updated", { autoClose: 1000 });
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        handleGetUsers(token);
        toast.success("Role updated", { autoClose: 1000 });
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-white rounded-xl border border-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <p className="text-gray-500 mt-1">Manage user accounts and permissions</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.email}</p>
                        <p className="text-xs text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      onChange={(e) => handleChangeUserRole(user.id, e.target.value)}
                      value={user.role}
                      className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user.enabled
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.enabled ? "bg-emerald-500" : "bg-gray-400"
                          }`}
                      ></span>
                      {user.enabled ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleChangeUserStatus(user.id, user.enabled)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${user.enabled
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        }`}
                    >
                      {user.enabled ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableUsers;
