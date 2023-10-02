"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
export default function LoginPage() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", userDetails);
      if (res.data.success) {
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className=" flex h-screen overflow-hidden">
      <div className=" flex-1">
        <img
          className=" w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1692606866812-843adbc73e18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
          alt=""
        />
      </div>
      <div className=" w-1/3 p-7  bg-zinc-950">
        <div>
          <Image
            src="/logo.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={30}
            height={30}
            priority
          />
        </div>
        <div className=" h-full flex flex-col justify-center items-center">
          <div className=" h-full flex flex-col justify-center items-center">
            <div className=" mt-6">
              <label className="block text-sm text-neutral-200" htmlFor="email">
                Email
              </label>
              <input
                onChange={(e) =>
                  setUserDetails((prev) => ({ ...prev, email: e.target.value }))
                }
                className=" bg-transparent border-b-2 border-b-neutral-500 outline-none"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className=" mt-6">
              <label
                className="block text-sm text-neutral-200"
                htmlFor="password"
              >
                password
              </label>
              <input
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className=" bg-transparent border-b-2 border-b-neutral-500 outline-none"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                className="h-10 bg-white text-sm text-neutral-900 outline-none mt-8 px-6 py-2 rounded-3xl"
              >
                {loading ? <LoadingButton /> : "Login"}
              </button>
            </div>
          </div>
          <div className=" p-4">
            <p className="text-xs text-neutral-400">
              Already have an account?{" "}
              <Link className="text-neutral-200" href={"/signup"}>
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
