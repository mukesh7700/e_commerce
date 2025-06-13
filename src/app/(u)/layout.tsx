"use client";
import { useEffect, useState } from "react";
import { HeaderUsage } from "@/components/Header";
import SidebarUsage from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { LinearProgress } from "@jamsr-ui/react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When entire page (including images, fonts, etc.) is loaded
    const handleLoad = () => {
      setLoading(false);
    };

    // If already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const username =
    session?.user?.username || session?.user?.name || user?.username || "User";
  const email = session?.user?.email || user?.email || "No email";
  const avatar = session?.user?.image || user?.image || "/default-avatar.png";
  return (
    <section
      className="flex
"
    >
      <div className="w-fit hidden lg:inline-flex">
        <SidebarUsage email={email} username={username} avatar={avatar} />
      </div>

      <div className="w-full h-screen bg-gray-100">
        <div>
          <HeaderUsage email={email} username={username} avatar={avatar} />
        </div>

        <div className="container   max-w-[1280px]  mx-auto px-4 py-8">
          {!loading ? children : <LinearProgress color="success" size="md" />}
        </div>
      </div>
    </section>
  );
}
