import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.service";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const login = async (data) => {
    setErr("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin);
        navigate("/");
      }
    } catch (error) {
      setErr(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account ? &nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Signup
          </Link>
        </p>
        {err && (
          <p className="mt-8 text-center text-base text-red-500">{err}</p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email"),{require:true,validate:{
                matchPattern:(value)=> /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid address"
              }}}
            />
            <Input label ="password" type="password" placeholder="Enter your password"
            {...register("password",{require:true,minLength:6})}
            />   

         <Button
            type="submit"
            className="w-full">
            Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
