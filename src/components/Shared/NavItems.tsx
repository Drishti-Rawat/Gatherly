'use client'
import Link from "next/link";
import React, { useState } from "react";
import { headerlinks } from "@/constants";


const NavItems = () => {
    
    const [Active,setIsActive]= useState("Home")

    const handleSetActive = (tab:any) => {
        setIsActive(tab);
      };
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
        {
            headerlinks.map((link)=>(
                
                <li className={`relative text-[14px] ${Active === link.title ? "text-[#C70039] font-bold" : "font-medium "}`} key={link.title}>
                <Link href={`${link.route}`} onClick={() => setIsActive(link.title)}>{link.title}</Link>
                {
                    Active === link.title && (
                        <span className=" md:block hidden absolute -bottom-5 left-0 right-0 py-[1.2px] bg-[#FF5733] transition-all duration-300"></span>
                    )
                }
              </li>
            ))
        }

    </ul>
  );
};

export default NavItems;
