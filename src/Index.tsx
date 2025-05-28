import { Outlet } from "react-router";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toolbar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
