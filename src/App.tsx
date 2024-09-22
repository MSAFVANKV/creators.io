import { Outlet } from "react-router-dom"
import { cn } from "./lib/utils"
import Navbar from "./components/landings/navbar/Navbar"
import Footer from "./components/landings/footer/Footer"


function App() {

  return (
    <>
    <div className={cn(`h-screen w-screen overflow-hidden`, {
              "debug-screens": import.meta.env.MODE === "development",
            })}
            style={{
              backgroundImage:`url(public/Home/homepage.jpg)`,
              backgroundPosition:"center",
              backgroundSize:"cover",
              backgroundRepeat:"no-repeat"
            }}
            >
      {/* <Navbar/> */}
        <Outlet/>
        <Footer/>
    </div>
    </>
  )
}

export default App
