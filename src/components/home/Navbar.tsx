"use client";
import { Button, Header } from "@jamsr-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SidebarUsageProps {
  text: string;
  
}
const Navbar = ({text}:SidebarUsageProps) => {
  const router = useRouter();
 const handleNavigation = () => {
    router.push('/dashboard') // Change to your desired path
  }

  return (
    <>
    
      <Header className="flex justify-between px-6 bg-gray-100">
        <div className="container mx-auto  max-w-7xl h-[100px] flex items-center justify-between">

          <Link href="/">
        <Image
          width={100}
          height={40}
          src="/images/home/Logo.png"
          className=" h-10 w-auto "
          
          alt="logo"
        />
        </Link>
        <Button color="warning" size="lg" className="font-bold text-md tracking-wide" onClick={handleNavigation}>{text}</Button>
        </div>
      </Header> 
      
    </>
  )
}

export default Navbar
