import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "components/common/Navbar";

const MainLayout = () => {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <ToastContainer className="md:mt-12" hideProgressBar />
    </div>
  );
};

export default MainLayout;
