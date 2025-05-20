import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

const RequestReset = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-brown">Reset Password</h2>
        <p className="mt-2 text-secondary-brown">Enter your email to receive a reset link</p>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        navigate('/reset-password/verify');
      }}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-primary-brown">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-3 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown transition-all duration-300"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

const VerifyCode = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-brown">Enter Code</h2>
        <p className="mt-2 text-secondary-brown">We've sent a code to your email</p>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        navigate('/reset-password/new');
      }}>
        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="text-sm font-medium text-primary-brown">Verification Code</label>
            <input
              type="text"
              id="code"
              className="mt-1 w-full px-4 py-3 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
              placeholder="Enter 6-digit code"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown transition-all duration-300"
        >
          Verify Code
        </button>
      </form>
    </div>
  );
};

const NewPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-brown">New Password</h2>
        <p className="mt-2 text-secondary-brown">Enter your new password</p>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        navigate('/');
      }}>
        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-primary-brown">New Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-3 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-primary-brown">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 w-full px-4 py-3 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown transition-all duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

const ForgotPassword = () => (
  <div className="min-h-screen bg-secondary-cream flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
      <Routes>
        <Route path="/" element={<RequestReset />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/new" element={<NewPassword />} />
      </Routes>
    </div>
  </div>
);

export default ForgotPassword;
