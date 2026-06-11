import { Outlet } from "@tanstack/react-router";
import Footer from "../shared/components/Footer/Footer";

const AppLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
