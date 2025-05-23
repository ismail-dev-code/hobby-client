import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { Helmet } from 'react-helmet-async';

const LoginForm = () => {
  const { signIn, signInWithGoogle, resetPassword } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(form.email, form.password);
      Swal.fire('Success', 'Logged in successfully!', 'success');
      navigate('/');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Swal.fire('Success', 'Logged in with Google!', 'success');
      navigate('/');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  const handleReset = async () => {
    if (!form.email) {
      return Swal.fire('Warning', 'Please enter your email address first.', 'warning');
    }
    try {
      await resetPassword(form.email);
      Swal.fire('Success', 'Password reset email sent!', 'success');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <Helmet>
        <title>Hobby | Login</title>
    </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right">
            <button type="button" onClick={handleReset} className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
          <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
          <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Log in with Google
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
