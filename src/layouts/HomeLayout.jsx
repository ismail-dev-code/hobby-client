
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Header from "../pages/Header";


const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Header></Header>
      <Outlet></Outlet>
      
    </>
  );
};

export default HomeLayout;
