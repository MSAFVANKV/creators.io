import { LayoutGrid } from "lucide-react";
import React from "react";
import { Icon } from '@iconify/react';
type Props = {};

export default function Footer({}: Props) {
  const menuBars = [
    {
      id: 1,
      name: "Home",
      link: "/home",
      icon: (
        <Icon
        icon={`majesticons:logout`}
         className="hover:animate-bounce text-blue-700 w-9 h-9"
      />
      ),
    },
    {
      id: 2,
      name: "About",
      link: "/about",
    icon: <Icon icon={`devicon:windows11`} className="icon-[devicon--windows11] hover:animate-bounce text-blue-700 w-9 h-9"/> 
    },
    {
      id: 3,
      name: "Contact",
      link: "/contact",
      icon: (
        <LayoutGrid className="hover:animate-bounce text-blue-700 w-9 h-9" />
      ),
    },
  ];
  return (
    <div className="w-full fixed right-0 bottom-0 left-0 h-10  flex items-center justify-center gap-3">
      {menuBars.map((item, index) => (
        <div key={index} className="cursor-pointer">
          {item.icon}
        </div>
      ))}
    </div>
  );
}
