"use client";

import { NavLinks } from "@/constants/index.";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Transition from './transition';

const Navigation = () => {

    const [isRouting, setisRouting] = useState(false);
    const path = usePathname();
    const [prevPath, setPrevPath] = useState("/");

    useEffect(() => {
        if (prevPath !== path) {
            setisRouting(true);
        }
    }, [path, prevPath]);

    useEffect(() => {
        if (isRouting) {
            setPrevPath(path);
            const timeout = setTimeout(() => {
                setisRouting(false);
            }, 1200);

            return () => clearTimeout(timeout);
        }
    });
    
    return (
        <div 
        style={{ left:"15%"}} 
         className="absolute z-[50] -bottom-20 w-[50%] md:w-[20%]
         max-h-[150px] rounded-full flex justify-between items-center 
         border bg-black border-white px-4 py-6"
        >
            {isRouting && <Transition />}

            {NavLinks.map((nav) => (
                <a key={nav.name} href={nav.link} className="mb-16 pl-4 min-w-[20%]">
                    <nav.icon 
                    className={`w-[24px] h-[24px] ${
                        path === nav.name ? "text-purple-800" : "text-white"
                    }`}
                     />
                </a>
            ))}
        </div>
    );
};

export default Navigation;
