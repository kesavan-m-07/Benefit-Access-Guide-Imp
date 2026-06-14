import { Outlet } from "@tanstack/react-router";
import Footer from "@shared/components/Footer/Footer";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen">
      <div className="relative bg-hero-banner bg-no-repeat min-h-screen">
        <div className="bg-hero-gradient pb-12 z-10 relative min-h-screen flex flex-col justify-between">
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
