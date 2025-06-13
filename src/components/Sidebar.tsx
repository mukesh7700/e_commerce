"use client";

import {
  AddMemberIcon,
  AnalyticsIcon,
  CartIcon,
  DashBordIcon,
  MyReferralsIcon,
  NetworkIcon,
  OfferIcon,
  OrderIcon,
  PairIncomeIcon,
  PlanIcon,
  ProductsIcon,
  ProfileIcon,
  ReferralLinkIcon,
  SupportIcon,
  TotalTeamIcon,
  TransactionIcon,
  WithdrawMethodsIcon,
} from "@/assets/svg";
import {
  Avatar,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuItemButton,
} from "@jamsr-ui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
 
interface SidebarUsageProps {
  username: string;
  email: string;
  avatar?: string;
}


const data = [
  {
    title: "general",
    items: [
      { title: "Dashboard", icon: <DashBordIcon className="h-6 w-6"/>, url: "/dashboard" },
      { title: "Pair Income", icon: <PairIncomeIcon className="h-6 w-6"/>, url: "/pair-income" },
      { title: "Offer", icon: <OfferIcon className="h-6 w-6" />, url: "/offers" },
      { title: "Plan", icon: <PlanIcon className="h-6 w-6" />, url: "/plan" },
      { title: "Products", icon: <ProductsIcon className="h-6 w-6" />, url: "/products" },
      { title: "Cart", icon: <CartIcon className="h-6 w-6"/>, url: "/cart" },
      { title: "Orders", icon: <OrderIcon className="h-6 w-6"/>, url: "/orders" },
      { title: "Network", icon: <NetworkIcon className="h-6 w-6"/> },
      {
        title: "My Referrals",
        icon: <MyReferralsIcon className="h-6 w-6" />,
        url: "/my-referrals",
      },
      { title: "Total Team", icon: <TotalTeamIcon className="h-6 w-6" />, url: "/total-team" },
      { title: "Analytics", icon: <AnalyticsIcon className="h-6 w-6" />, url: "/analytics" },
      { title: "Transaction", icon: <TransactionIcon className="h-6 w-6" />, url: "/transaction" },
      {
        title: "Withdraw Methods",
        icon: <WithdrawMethodsIcon className="h-6 w-6"/>,
        url: "/withdraw",
      },
      { title: "Profile", icon: <ProfileIcon className="h-6 w-6"/>, url: "/profile" },
      { title: "Add_member", icon: <AddMemberIcon className="h-6 w-6" />, url: "/registration" },
      {
        title: "Referral Link",
        icon: <ReferralLinkIcon className="h-6 w-6" />,
        url: "/referral-link",
      },
      { title: "Support", icon: <SupportIcon className="h-6 w-6"/>, url: "/support" },
    ],
  },
];



export const SidebarUsage = ({username, email, avatar }:SidebarUsageProps) => {
 
  const router = useRouter();
  const pathname = usePathname();
   
  const isActive = (url:any) => {
    return pathname === url;
  };


  
   
  return (
    <Sidebar className="w-[300px] border-e-1 border-dashed  border-gray-300 ">
      <SidebarContent className="p-4">
        {/* Logo */}
        <div className="">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <Image height={50} width={200} src="/images/home/Logo.png" alt="logo" className="w-auto h-12  " />
          </div>
        </div>

        {/* User Box */}
        <div>
          <div className="bg-gray-100 rounded-xl p-5 flex items-center gap-4 ">
             <Avatar
                  alt={username}
                  width={150}
                  height={150}
                  src={avatar ?? ""}
                />
            <div >
              <p className=" text-md capitalize">{username}</p>
              <p className="max-w-[150px] truncate text-md text-gray-500">{email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        {data.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="uppercase text-md font-semibold">{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuItemButton  onClick={() => item.url && router.push(item.url)} className= {`text-md text-neutral-500 py-3 mb-1 ${isActive(item.url) ? "bg-green-50 text-green-500 font-semibold" : ""}`}>
                    <span className="mr-4">{item.icon}</span>
                    {item.title}
                  </SidebarMenuItemButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}

        {/* Version Footer */}
        <div className="mt-auto text-lg text-center text-orange-500 ">
          Jamsrmlm  <span className="text-gray-600  uppercase">v<sup >5</sup></span>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
export default SidebarUsage;
