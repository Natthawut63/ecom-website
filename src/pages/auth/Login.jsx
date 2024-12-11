import React, { useState } from "react";
import { toast } from "react-toastify";
import useEconStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEconStore((state) => state.actionLogin);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Login Success", { autoClose: 1000 });
    } catch (err) {
      const errMsg = err.response?.data?.msg;
      toast.error(errMsg, { autoClose: 1000 });
      console.log(err);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/");
    }
  };

  return (
    // bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md shadow-lg bg-white p-8 rounded-xl">
        <h1 className="text-3xl font-semibold text-center my-6 text-gray-700">
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                placeholder="Email"
                onChange={handleChange}
                type="email"
                name="email"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                placeholder="Password"
                onChange={handleChange}
                type="password"
                name="password"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>

            {/* Additional Actions */}
            <div className="flex justify-end mt-4">
              {/* <a href="#" className="text-indigo-600 hover:text-indigo-700 text-sm">
                Forgot Password?
              </a> */}
              <a
                href="/register"
                className="text-indigo-600 hover:text-indigo-700 text-sm"
              >
                Create an Account
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
