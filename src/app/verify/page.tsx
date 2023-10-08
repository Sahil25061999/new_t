"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function VerifyPage() {
  const [emailVerified, setEmailVerifed] = useState(false);
  const verifyEmail = async (token: string) => {
    let parseToken = token.split("=")[1];
    try {
      const res = await axios.post("/api/users/verify", {
        token: parseToken,
        emailType: "VERIFY",
      });
      if (res && res?.data?.success) {
        setEmailVerifed(true);
      }
    } catch (e) {}
  };
  useEffect(() => {
    const token = window.location.search;
    if (token.length > 0) {
      verifyEmail(token);
    }
  }, []);
  return (
    <main className="h-screen flex justify-center items-center">
      <p>{emailVerified ? "Email verified" : "processing..."}</p>
    </main>
  );
}
