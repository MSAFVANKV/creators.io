import { Outlet } from "react-router-dom";
import { cn } from "./lib/utils";
// import Navbar from "./components/landings/navbar/Navbar";
import Footer from "./components/landings/footer/Footer";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./middlewares/ProtectedRoute";

function App() {
  return (
    <>
      <div
        className={cn(
          `fixed top-0 left-0 h-screen w-screen overflow-hidden`, // Ensure this div is fixed
          {
            "debug-screens": import.meta.env.MODE === "development",
          }
        )}
        style={{
          backgroundImage: `url(public/Home/homepage.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <Navbar/> */}
        <Outlet />
        <ProtectedRoute>
           <Footer />
        </ProtectedRoute>
       
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
