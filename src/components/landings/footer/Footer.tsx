
import { Icon } from '@iconify/react';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { makeToast } from "@/lib/toasters";
import { useAuth } from "@/context/AuthContext";

type Props = {};

export default function Footer({}: Props) {
  const { setIsAuthenticated } = useAuth();

  const handleLogout = async ()=>{
    try {
    const response =  await axios.post(`/user/logout`,{withCredentials:true});
    if(response.status === 200){
      <Navigate to={`/login`}/>
      setIsAuthenticated(false);
      makeToast(response.data.msg)
    }
      
    } catch (error) {
      console.error(error);
      
    }
  }

  const menuBars = [
    {
      id: 1,
      name: "Logout",
      link: "",
      icon: (
        <Icon
          icon={`ri:logout-circle-r-line`}
          className="hover:animate-bounce text-white w-6 h-6"
          onClick={handleLogout}
        />
      ),
    },
    {
      id: 2,
      name: "About",
      link: "/about",
      icon: (
        <Icon
          icon={`devicon:windows11`}
          className="hover:animate-bounce text-gray-700 w-7 h-7"
        />
      ),
    },
    {
      id: 3,
      name: "Contact",
      link: "/contact",
      icon: (
        <Icon
        icon={`arcticons:downloads`}
        className="hover:animate-bounce text-white w-6 h-6"
      />
      ),
    },
  ];

  return (
    <div className="w-full fixed right-0 bottom-0 left-0 py-2 flex items-center justify-center gap-3">
      {/* Background blur div */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md blur-sm pointer-events-none"></div>
      
      {/* Icons div */}
      <div className="relative z-50 flex items-center justify-center gap-5">
        {menuBars.map((item, index) => (
          <div key={index} className="cursor-pointer">
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
