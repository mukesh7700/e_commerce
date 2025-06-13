"use client";
import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import HomePage from '@/components/home/HomePage'
import { useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
  const { data:session,  status } = useSession();

  const isUserSignedIn = status === "authenticated";
  return (
    <div >
      <Navbar  text={isUserSignedIn ?  "Let's start":"Dashboard" }/>
      <HomePage/>
      <Footer/>
    </div>
  )
}

export default Page
