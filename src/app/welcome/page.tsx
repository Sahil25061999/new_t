"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Loading() {
  const [profile, setProfile] = useState({
    username: "",
  });
  useEffect(() => {
    (async () => {
      try {
        const res:any = await axios.get("/api/users/profile");
        console.log(res)
        if (res && res?.data?.success) {
          setProfile((prev) => ({
            ...prev,
            username: res.data.data.username,
          }));
        }
      } catch (e: any) {}
    })();
  }, []);
  return (
    <div className="welcome__page h-screen w-full flex justify-center items-center">
      Welcome {profile?.username}
    </div>
  );
}
