import React, { useState } from "react";
import { toast } from "react-toastify";
import useEconStore from "../../../app/store/ecom-store";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShoppingBag } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEconStore((state) => state.actionLogin);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Login Success", { autoClose: 1000 });
    } catch (err) {
      const errMsg = err.response?.data?.msg;
      toast.error(errMsg || "Login failed", { autoClose: 1000 });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await actionLogin({ email, password });
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Login Success", { autoClose: 1000 });
    } catch (err) {
      toast.error("Please try again", { autoClose: 1000 });
      console.log(err);
    } finally {
      setIsLoading(false);
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
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">Store</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back
          </h1>
          <p className="text-primary-100 text-lg max-w-md">
            Sign in to your account to continue shopping and track your orders.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Store</span>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Sign In
            </h2>
            <p className="text-gray-500 mb-6">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => demoLogin("user@demo.com", "12345678")}
                disabled={isLoading}
                className="py-2.5 px-4 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
              >
                Demo User
              </button>
              <button
                onClick={() => demoLogin("admin@demo.com", "12345678")}
                disabled={isLoading}
                className="py-2.5 px-4 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
              >
                Demo Admin
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center mt-6 text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
