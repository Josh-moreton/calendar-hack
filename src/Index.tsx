import { Outlet } from "react-router";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toolbar />
      <main className="flex-1 py-6 px-3 sm:px-6 md:px-8 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
