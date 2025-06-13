"use client";
import { HeroIcon, WaveIcon } from "@/assets/svg";
import { Button } from "@jamsr-ui/react";
import Image from "next/image";
import { StepCard } from "../StepCard";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Sign Up",
    icon: "images/home/SignUp.png",
    rowStart: "md:row-start-3", // bottom
    from: { x: -100, opacity: 0 },
  },
  {
    title: "Bring People",
    icon: "/images/home/BringPeople.png",
    rowStart: "md:row-start-2", // center
    from: { y: 100, opacity: 0 },
  },
  {
    title: "Get Paid",
    icon: "/images/home/GetPaid.png",
    rowStart: "md:row-start-1", // top
    from: { x: 100, opacity: 0 },
  },
];

const HomePage = () => {
  const heroLeftRef = useRef(null);
  const heroRightRef = useRef(null);
  const mission1LeftRef = useRef(null);
  const mission2RightRef = useRef(null);

  const heroLeftInView = useInView(heroLeftRef, { amount: 0.3 });
  const heroRightInView = useInView(heroRightRef, { amount: 0.3 });
  const mission1LeftInView = useInView(mission1LeftRef, { amount: 0.3 });
  const mission2RightInView = useInView(mission2RightRef, { amount: 0.3 });

  return (
    <div className="">
      <section className="bg-gray-100">
        <div className="container mx-auto  max-w-7xl pt-14 p-6 grid md:grid-cols-2 gap-2">
          <motion.div
            ref={heroLeftRef}
            initial={{ x: -100, opacity: 0 }}
            animate={heroLeftInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex justify-center items-center"
          >
            <div className="p-4">
              <h1 className="capitalize text-[50px] md:text-7xl font-bold leading-16 md:leading-20">
                Helping{" "}
                <span className="text-green-500 underline decoration-6  underline-offset-4">
                  billions
                </span>{" "}
                to grow better
              </h1>
              <p className="text-lg text-neutral-500  mt-4">
                Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum
                laoreet sapien, quis venenatis ante odio sit amet eros.
              </p>
              <Button
                className="mt-10 text-md font-semibold shadow shadow-green-500/50 text-white"
                color="success"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
          <motion.div
            ref={heroRightRef}
            initial={{ x: 100, opacity: 0 }}
            animate={heroRightInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <HeroIcon />
          </motion.div>
        </div>
        <div>
          <WaveIcon className="fill-white" />
        </div>
      </section>
      <section>
        <motion.div
          ref={mission1LeftRef}
          initial={{ x: -100, opacity: 0 }}
          animate={mission1LeftInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="container mx-auto  max-w-7xl p-6 grid md:grid-cols-2 gap-2"
        >
          <div className="p-6">
            <h2 className="text-4xl text-green-500 underline underline-offset-4 decoration-4 font-bold">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-500  mt-4">
              As a creative and dedicated group of individuals, we offering
              Softwares and digital marketing solutions to our clients and we
              are trying to help your audiences to grow their business. In 2020
              we set out to make our top selling item and our website born.
              Since then we are trying to innovate new items that can help our
              clients to grow their business. we believe in quality, we
              don&apos;t even charge more. we don&apos;t have any hidden charges
              policies and we are happy with our wonderful customers. We believe
              that our system and solutions will make your life easier, save you
              time and money, and make you happy.
            </p>
          </div>
          <div className="flex justify-center items-center p-10">
            <Image
              height={400}
              width={400}
              src="/images/home/our-mission.webp"
              alt="mission"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </section>
      <section>
        <motion.div
          ref={mission2RightRef}
          initial={{ x: 100, opacity: 0 }}
          animate={mission2RightInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="container mx-auto  max-w-7xl p-6 grid md:grid-cols-2 gap-2"
        >
          <div className="flex justify-center items-center p-10">
            <Image
              height={400}
              width={400}
              src="/images/home/our-mission.webp"
              alt="mission"
              className="w-full h-auto"
            />
          </div>

          <div className="p-6 order-first md:order-none">
            <h2 className="text-4xl  text-green-500 underline underline-offset-4 decoration-4 font-bold">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-500  mt-4">
              As a creative and dedicated group of individuals, we offering
              Softwares and digital marketing solutions to our clients and we
              are trying to help your audiences to grow their business. In 2020
              we set out to make our top selling item and our website born.
              Since then we are trying to innovate new items that can help our
              clients to grow their business. we believe in quality, we
              don&apos;t even charge more. we don&apos;t have any hidden charges
              policies and we are happy with our wonderful customers. We believe
              that our system and solutions will make your life easier, save you
              time and money, and make you happy.
            </p>
          </div>
        </motion.div>
      </section>
      <section>
        <div className="container mx-auto  max-w-7xl p-6 mb-12">
          <h2 className=" text-5xl md:text-6xl text-center font-bold text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-flow-col md:grid-rows-6 gap-10 px-10">
            {steps.map((step) => (
              <StepCard
                key={step.title}
                icon={step.icon}
                title={step.title}
                rowStart={step.rowStart}
                from={step.from}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
