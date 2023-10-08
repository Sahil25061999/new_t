"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.css";
export const Welcome = () => {
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
      className={`${styles.welcome__page} pointer-events-none h-screen w-full flex justify-center items-center absolute top-0 left-0 z-50 `}
    >
      Welcome<span className=" ml-2 text-rose-600">{profile?.username}</span>
    </div>
  );
};
