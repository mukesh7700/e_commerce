"use client";
import { HandbarIcon } from "@/assets/svg";
import {
  Avatar,
  Header,
  IconButton,
  Menu,
  MenuItem,
  toast,
} from "@jamsr-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DrawerUsage } from "./Drawer";
import { useState } from "react";

interface HeaderUsageProps {
  username: string;
  email: string;
  avatar?: string;
}


export const HeaderUsage = ({ username, email, avatar }: HeaderUsageProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);

  const { data: session } = useSession();
  const router = useRouter();

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

  return (
    <>
      <Header className="flex justify-between px-6  bg-transparent mb-4">
        <IconButton
          label="open menu"
          variant="text"
          className="lg:hidden rounded-full p-2 ui-hover:bg-gray-200 hover:scale-110 "
           onClick={openMenu}
        >
          <HandbarIcon className="w-8 h-8" />
        </IconButton>
        <div className="ms-auto">
          <Menu
            classNames={{
              content: "border-1 border-neutral-200 shadow-none",
              popover: "max-w-[200px] shadow-none ",
              menuItem:
                "text-md  hover:bg-gray-100 hover:text-neutral-900 rounded-lg p-2",
            }}
            radius="xl"
            showArrow
            trigger={
              <IconButton
                label="menu"
                variant="text"
                className="  rounded-full ui-hover:bg-gray-200 hover:scale-110 "
              >
                <Avatar
                  alt={username}
                  width={150}
                  height={150}
                  src={avatar ?? ""}
                />
              </IconButton>
            }
          >
            <div className="px-2 py-4 border-b border-dashed border-neutral-300">
              <p className="text-md font-semibold tracking-tight capitalize">
                {username}
              </p>
              <p className="truncate text-md text-neutral-500">
                {email}
              </p>
            </div>
            <div className="py-2 border-b border-dashed border-neutral-300">
              <MenuItem onClick={()=> {router.push("/")}}>Home</MenuItem>
              <MenuItem onClick={()=> {router.push("/profile")}}>Profile</MenuItem>
            </div>
            <div className="py-2">
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </div>
          </Menu>
        </div>
      </Header>
      <DrawerUsage isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>

  );
};
