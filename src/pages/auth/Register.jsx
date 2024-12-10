import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { use } from "react";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordScore, setPasswordScore] = useState(0);
  const validatePassword = (value) => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score;
    // if (passwordScore < 1) {
    //   toast.warning("Password is weak");
    //   return;
    // }
    try {
      const res = await axios.post("https://ecom-server-chi.vercel.app/api/register", data);
      console.log(res.data);
      toast.success("Register Success");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      // ? ถ้าไม่มีข้อมูล จะเปลี่ยนเป็น undefined
      toast.error(errMsg);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-full shadow-md bg-white p-8 max-w-md  ">
        <h1 className="text-2xl font-bold text-center my-4">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 
          focus:border-transparent
          ${errors.email && "border-red-500 "}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm px-3">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("password")}
                placeholder="Password"
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 
          focus:border-transparent
          ${errors.password && "border-red-500 "}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              {watch().password?.length > 0 && (
                <div className="flex mt-2">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span className="w-1/5 px-1" key={index}>
                      <div
                        className={`rounded h-2 ${
                          passwordScore <= 1
                            ? "bg-red-500"
                            : passwordScore <= 2
                            ? "bg-yellow-400"
                            : "bg-green-400"
                        }`}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <input
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 
          focus:border-transparent
          ${errors.confirmPassword && "border-red-500 "}`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button className="bg-blue-500 rounded-md w-full text-white font-bold py-2 shadow hover:bg-blue-300">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
