"use client";
import { AddPeopleIcon, PurchaseIcon, ShareIcon } from "@/assets/svg";
import { Button, Divider, toast } from "@jamsr-ui/react";
import Image from "next/image";
import React from "react";
import { useState } from "react";

const icons = [
  {
    icons: <ShareIcon className ="w-10 h-10 "/>,
    tittle: "Send Invitation 🤟🏻",
    subtittle: "Send your referral link to your friend",
  },
  {
    icons: <AddPeopleIcon className ="w-10 h-10 "/>,
    tittle: "Registration 👩🏻‍💻",
    subtittle: "Let them register to our services",
  },
  {
    icons: <PurchaseIcon className ="w-10 h-10 "/>,
    tittle: "Purchase Package 🎉",
    subtittle: "You will get referral income",
  },
];

const RefferalLink = () => {
  const [isLeftCopied, setIsLeftCopied] = useState(false);
  const [isRightCopied, setIsRightCopied] = useState(false);
  const LefthandleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(LeftreferralLink);
      setIsLeftCopied(true);
      toast.success("Referral Link copied to clipboard", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error copying text:", error);
      setIsLeftCopied(false);
    }

    setTimeout(() => {
      setIsLeftCopied(false);
    }, 2000);
  };

  const RighthandleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(RightreferralLink);
      setIsRightCopied(true);
      toast.success("Referral Link copied to clipboard", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error copying text:", error);
      setIsRightCopied(false);
    }

    setTimeout(() => {
      setIsRightCopied(false);
    }, 2000);
  };

  const LeftreferralLink = `http://localhost:5173/registration?referral_id=1006090&
  placement=left`;
  const RightreferralLink = `http://localhost:5173/registration?referral_id=1006090&
  placement=Right`;
  return (
    <div className="">
      <p className=" font-bold text-3xl tracking-tight mb-5">
        Referral Link
      </p>
      <ol className="list-disc pl-5 text-lg text-neutral-500 ">
       <li>Referral Link</li> 
      </ol>
      <div className="bg-white rounded-3xl   p-3 md:p-8 mt-25 relative overflow-y-visible  ">
        <Image
          width={130}
          height={130}
          src="/images/home/referral.png"
          className="absolute -top-19 left-14"
          alt="referral-image"
        />

        <div className="text-center px-10 mt-26  ">
          <p className="font-semibold tracking-tight text-2xl mb-3">
            Invite friends and earn
          </p>
          <p className=" tracking-tight text-lg text-neutral-500 mb-6">
            Invite your friend to Jamsrmlm, if they sign up, you and your friend
            will get 30 days free trial
          </p>
        </div>
        <div className=" grid md:grid-cols-3 gap-2">
          {icons.map((item, index) => (
            <div key={index}>
              <div className="p-2 items-center text-center">
                <div className=" inline-block rounded-full bg-green-100 p-8 text-green-500 mb-3 text-center  ">
                  {item.icons}
                </div>
                <p className="font-semibold tracking-tight text-lg mb-3">
                  {item.tittle}
                </p>
                <p className=" tracking-wide  text-neutral-500 mb-6">
                  {item.subtittle}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Divider className="my-8 " />
        <p className="font-bold text-xl tracking-tight mb-3">
          Share the referral link
        </p>
        <p className=" tracking-tight text-lg text-neutral-500 mb-2 ">Left Side Referral Link</p>

        <div className="flex  gap-2 ">
          
          <p className="bg-gray-500 px-4 py-2 w-full rounded-lg font-bold text-white whitespace-nowrap  overflow-auto">
            {LeftreferralLink}
          </p>
          
          <Button color="success"
          disableRipple
            className="  px-4 py-2  rounded-lg font-bold text-white  "
            onClick={LefthandleCopyText}
          >
            {" "}
            {isLeftCopied ? "Copied" : "Copy"}
          </Button>
        </div>
        <p className=" tracking-tight text-lg text-neutral-500 my-2">Right Side Referral Link</p>
        <div className="flex  gap-2 ">
          
          <p className="bg-gray-500 px-4 py-2 w-full rounded-lg font-bold text-white whitespace-nowrap  overflow-auto">
            {RightreferralLink}
          </p>
          <Button color="success"
          disableRipple
            className="  px-4 py-2  rounded-lg font-bold text-white  "
            onClick={RighthandleCopyText}
          >
            {" "}
            {isRightCopied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default RefferalLink;
