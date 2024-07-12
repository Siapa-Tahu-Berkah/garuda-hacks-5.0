"use client";
import { signInWithGoogle } from "@/lib/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GoogleButton from "react-google-button";

export const Login = () => {
  const router = useRouter();
  useEffect(() => {
    const role = Cookies.get("role");
    console.log("role", role);
  }, []);

  const login = async() => {
    const res = await signInWithGoogle();

    if (res) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <GoogleButton onClick={login}></GoogleButton>
    </div>
  );
};

export default Login;
