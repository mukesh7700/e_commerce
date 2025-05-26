"use client";

import { Button, toast } from "@jamsr-ui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type ManualUser = {
  username: string;
  email: string;
  image?: string;
  _id: string;
  createdAt: string;
};

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [manualUser, setManualUser] = useState<ManualUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If not using NextAuth session, try manual auth
    if (!session) {
      const fetchManualUser = async () => {
        try {
          const res = await fetch("/api/user", {
            method: "GET",
            credentials: "include",
          });
          const data = await res.json();
          if (res.ok) {
            setManualUser(data.user);
          } else {
            setManualUser(null);
          }
        } catch (err) {
          console.error("Manual user fetch failed:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchManualUser();
    } else {
      setLoading(false);
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      if (session) {
        await signOut({ callbackUrl: "/login" });
      } else {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        toast.success("Logged out");
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  const user = session?.user || manualUser;

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You are not logged in.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Welcome, {user.username  || "User"}
      </h1>
      <p>{user.email}</p>
     {user.image && (
      <Image
        src={user.image}
        alt="profile"
        height={200}
        width={200}
      />
    )}
      <Button variant="outlined" color="danger" size="lg" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
