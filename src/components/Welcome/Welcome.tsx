"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
export default function Welcome() {
  const [profile, setProfile] = useState({
    username: "",
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const res: any = await axios.get("/api/users/profile");
        console.log(res);
        if (res && res?.data?.success) {
          setProfile((prev) => ({
            ...prev,
            username: res.data.data.username,
          }));
          setDataLoaded(() => true);
        }
      } catch (e: any) {}
    })();
  }, []);
  return (
    <div
      className={`${
        dataLoaded ? "welcome__page" : ""
      } h-screen w-full flex justify-center items-center absolute top-0 left-0 z-50`}
    >
      {"Welcome "+profile?.username}
    </div>
  );
}
