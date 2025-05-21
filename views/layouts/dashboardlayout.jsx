import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardLayout = ({ children, userRole }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Common navigation items for both roles
  const commonNavItems = [
    { name: "Dashboard", path: "/dashboard", icon: "home" },
    { name: "Appointments", path: "/dashboard/appointments", icon: "calendar" },
    { name: "Messages", path: "/dashboard/messages", icon: "chat" },
    { name: "Support", path: "/dashboard/support", icon: "help" },
  ];

  // Role-specific navigation items
  const therapistNavItems = [
    { name: "Group Chats", path: "/dashboard/groups", icon: "groups" },
  ];

  const adminNavItems = [
    { name: "Therapists", path: "/dashboard/therapists", icon: "people" },
    { name: "Users", path: "/dashboard/users", icon: "person" },
    { name: "Groups", path: "/dashboard/manage-groups", icon: "forum" },
  ];

  // Determine which nav items to show based on user role
  const navItems = [
    ...commonNavItems,
    ...(userRole === "admin" ? adminNavItems : []),
    ...(userRole === "therapist" ? therapistNavItems : []),
  ];

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>InnerSpark Dashboard</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="/output.css" rel="stylesheet"/>
      </head>
      <body className="antialiased font-cascadia bg-secondary-cream">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64 bg-white shadow-lg">
              {/* Logo */}
              <div className="flex items-center justify-center h-16 px-4 bg-primary-brown">
                <h1 className="text-xl font-bold text-primary-cream">InnerSpark</h1>
              </div>
              {/* Navigation */}
              <div className="flex flex-col flex-grow px-4 py-4">
                <div className="flex flex-col flex-grow">
                  <nav className="flex-1 space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(item.path) ? 'bg-primary-cream text-primary-brown' : 'text-secondary-brown hover:bg-secondary-cream hover:text-primary-brown'}`}
                      >
                        <span className="material-icons mr-3 text-lg">{item.icon}</span>
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="pt-4 border-t border-secondary-cream">
                  <Link
                    to="/"
                    className="flex items-center px-4 py-3 text-sm font-medium text-secondary-brown rounded-lg hover:bg-secondary-cream hover:text-primary-brown transition-colors"
                  >
                    <span className="material-icons mr-3 text-lg">logout</span>
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile header & sidebar */}
          <div className="md:hidden fixed inset-0 flex z-40 lg:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Close sidebar</span>
                  <span className="material-icons text-white">close</span>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <h1 className="text-xl font-bold text-primary-brown">InnerSpark</h1>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(item.path) ? 'bg-primary-cream text-primary-brown' : 'text-secondary-brown hover:bg-secondary-cream hover:text-primary-brown'}`}
                    >
                      <span className="material-icons mr-3 text-lg">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-secondary-cream p-4">
                <Link to="/" className="flex items-center">
                  <div>
                    <span className="material-icons mr-3 text-lg text-secondary-brown">logout</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-secondary-brown">Sign Out</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0 w-14"></div>
          </div>

          {/* Main content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Top header */}
            <header className="bg-white shadow-sm">
              <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <button type="button" className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-secondary-brown hover:text-primary-brown focus:outline-none">
                  <span className="sr-only">Open sidebar</span>
                  <span className="material-icons">menu</span>
                </button>
                <div className="flex-1 flex justify-between">
                  <div className="flex-1 flex">
                    <h1 className="text-2xl font-bold text-primary-brown">
                      {userRole === "admin" ? "Admin Dashboard" : "Therapist Dashboard"}
                    </h1>
                  </div>
                  <div className="ml-4 flex items-center md:ml-6">
                    <button className="p-1 rounded-full text-secondary-brown hover:text-primary-brown focus:outline-none">
                      <span className="sr-only">View notifications</span>
                      <span className="material-icons">notifications</span>
                    </button>
                    <div className="ml-3 relative">
                      <div className="flex items-center">
                        <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none">
                          <span className="sr-only">Open user menu</span>
                          <div className="h-8 w-8 rounded-full bg-primary-brown text-primary-cream flex items-center justify-center">
                            <span className="material-icons text-sm">person</span>
                          </div>
                        </button>
                        <span className="ml-2 text-sm font-medium text-secondary-brown">
                          {userRole === "admin" ? "Admin User" : "Dr. Therapist"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main content area */}
            <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;