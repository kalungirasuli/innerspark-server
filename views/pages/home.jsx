import React from "react";

const Home = () => (
  <div className="flex min-h-screen bg-secondary-cream">
    {/* Image Section - Hidden on mobile */}
    <div className="hidden md:flex md:w-1/2">
      <div className="relative w-full bg-[url('/images/therapist.jpg')] bg-cover bg-center bg-no-repeat">
        {/* Image Overlay with Welcome Message */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-8">
          <h1 className="text-5xl font-bold mb-4">Welcome to InnerSpark</h1>
          <p className="text-xl text-center max-w-md">
            Your journey to mental wellness begins here. Connect with experienced therapists who care.
          </p>
        </div>
      </div>
    </div>

    {/* Form Section */}
    <div className="flex flex-col w-full md:w-1/2 bg-white relative">
      {/* Mobile Background - Visible only on mobile */}
      <div className="absolute inset-0 bg-primary-brown bg-opacity-50 backdrop-blur-sm md:hidden -z-10"></div>

      {/* Form Content */}
      <div className="flex-grow flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white/95 rounded-2xl p-8 shadow-xl">
          {/* Logo/Header */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary-brown">Welcome Back</h2>
            <p className="mt-2 text-secondary-brown">Please sign in to your account</p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6">
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
              <div>
                <label htmlFor="password" className="text-sm font-medium text-primary-brown">Password</label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 w-full px-4 py-3 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end">
              <a href="/reset-password" className="text-sm text-primary-brown hover:text-secondary-brown transition-colors">
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown transition-all duration-300"
            >
              Sign in
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-secondary-brown">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-primary-brown hover:text-secondary-brown transition-colors">
                Sign up now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
