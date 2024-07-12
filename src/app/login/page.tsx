"use client";
import { signInWithGoogle } from "@/lib/auth";
import GoogleButton from "react-google-button";

export const Login = () => {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <GoogleButton onClick={signInWithGoogle}></GoogleButton>
    </div>
  );
};

export default Login;
