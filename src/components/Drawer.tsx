"use client";

import {
  Drawer,
  
} from "@jamsr-ui/react";
import SidebarUsage from "./Sidebar";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";

interface DrawerProps {
  isOpen: boolean;
  
  setIsOpen: (open: boolean) => void;
}

export const DrawerUsage:React.FC<DrawerProps> = ({ isOpen,  setIsOpen }) => {
  const { data: session } = useSession();
  const {user} = useAuth();
    
    
    const username = session?.user?.username||session?.user?.name || user?.username || "User";
    const email = session?.user?.email || user?.email || "No email";
    const avatar = session?.user?.image || user?.image || "/default-avatar.png";
  return (
    <div>
      
      <Drawer anchor="left" className="w-fit" isOpen={isOpen} onOpenChange={setIsOpen} closeButton={null}>
        <SidebarUsage email={email} username={username} avatar={avatar} />
      </Drawer>
    </div>
  );
};
