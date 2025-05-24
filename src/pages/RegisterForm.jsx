import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const RegisterForm = () => {
  const { createUser, setUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Name validation with SweetAlert
    if (name.length < 5) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Name should be more than 5 characters.",
      });
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Password",
        text: "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
      });
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });

      Swal.fire({
        icon: "success",
        title: "Registered Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      navigate(location.state || "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Hobby | Sign Up</title>
      </Helmet>

      <Navbar />

      <div className="card w-full my-16 mx-auto max-w-sm shrink-0 shadow-2xl bg-gradient-to-b from-success to-[#EFEFEF]">
        <div className="card-body">
          <h1 className="text-2xl font-bold">Create your Hobby account</h1>

          <form onSubmit={handleRegister}>
            <label className="label">Full Name</label>
            <input type="text" name="name" required className="input" placeholder="Your Name" />

            <label className="label">Photo URL</label>
            <input type="url" name="photo" required className="input" placeholder="Photo URL" />

            <label className="label">Email</label>
            <input type="email" name="email" required className="input" placeholder="Email" />

            <label className="label">Password</label>
            <input type="password" name="password" required className="input" placeholder="Password" />

            <button type="submit" className="btn btn-neutral bg-primary text-white border-none mt-4">
              Register
            </button>
          </form>

          <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] mt-2">
            <svg
              aria-label="Google logo"
              width="22"
              height="22"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
              </g>
            </svg>
            Login with Google
          </button>

          <p className="mt-4">
            Already have an account?{" "}
            <Link className="text-error underline" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
