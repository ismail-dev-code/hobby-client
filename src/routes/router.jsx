import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Header from "../pages/Header";
import AllHobby from "../pages/AllHobby";
import CreateHobby from "../pages/CreateHobby";
import MyHobby from "../pages/MyHobby";
import LoginForm from "../pages/LogInForm";
import RegisterForm from "../pages/RegisterForm";
import CurrencyConverter from "../pages/CurrencyConverter";
import PrivateRoute from "../provider/PrivateRoute";
import ChatMe from "../pages/utilities/ChatMe";
import Edit from "../pages/Edit";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, Component: Home },
      { path: "/header", element: <Header /> },
    ],
  },
  { path: "/all-hobby", element: <AllHobby /> },
  {
    path: "/create-hobby",
    element: (
      <PrivateRoute>
        <CreateHobby />{" "}
      </PrivateRoute>
    ),
  },
  {
    path: "/my-hobby",
    element: (
      <PrivateRoute>
        <MyHobby />
      </PrivateRoute>
    ),
  },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegisterForm /> },
  { path: "/chat-me", element: <ChatMe /> },
  { path: "/update-group/:id", element: <Edit /> },

  {
    path: "/currency-converter",
    element: <CurrencyConverter />,
  },
]);
