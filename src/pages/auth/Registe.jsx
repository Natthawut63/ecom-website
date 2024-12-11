import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useForm } from "react-hook-form";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email!!!" }),
    password: z.string().min(8, { message: "Password must be 8 characters!!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match!!",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, data);
      toast.success("Register Success", { autoClose: 1000 });
      reset();
      console.log(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg, { autoClose: 1000 });
      console.log(err);
    }
  };

  return (
    // bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
    <div className="min-h-screen flex items-center justify-center "> 
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl text-center my-4 font-bold text-gray-700">Create Account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <input
                {...register("email")}
                placeholder="Email Address"
                className={`border w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email && "border-red-500"}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <input
                {...register("password")}
                placeholder="Password"
                type="password"
                className={`border w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password && "border-red-500"}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              {watch().password?.length > 0 && (
                <div className="flex mt-2 space-x-1">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span key={index} className="w-1/5 px-1">
                      <div
                        className={`rounded h-2 ${
                          passwordScore <= 1
                            ? "bg-red-500"
                            : passwordScore < 2
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className={`border w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.confirmPassword && "border-red-500"}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
