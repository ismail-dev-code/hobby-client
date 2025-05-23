import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Header from "../pages/Header";
import AllHobby from "../pages/AllHobby";
import CreateHobby from "../pages/CreateHobby";
import MyHobby from "../pages/MyHobby";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, Component: Home },
      { path: "/header", element: <Header /> },
      { path: "/all-hobby", element: <AllHobby /> },
      { path: "/create-hobby", element: <CreateHobby /> },
      { path: "/my-hobby", element: <MyHobby /> },
    ],
  },
]);
