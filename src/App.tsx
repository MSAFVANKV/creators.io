import { Outlet } from "react-router-dom"
import { cn } from "./lib/utils"
import Navbar from "./components/landings/navbar/Navbar"
import Footer from "./components/landings/footer/Footer"


function App() {

  return (
    <>
    <div className={cn(``, {
              "debug-screens": import.meta.env.MODE === "development",
            })}>
      <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
    </>
  )
}

export default App
