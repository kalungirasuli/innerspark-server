import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboardlayout";
import TherapistDashboard from "./therapist/dashboard";
import TherapistAppointments from "./therapist/appointments";
import TherapistGroups from "./therapist/groups";
import TherapistMessages from "./therapist/messages";
import TherapistSupport from "./therapist/support";
import AdminDashboard from "./admin/dashboard";
import AdminTherapists from "./admin/therapists";
import AdminUsers from "./admin/users";
import AdminGroups from "./admin/groups";
import AdminAppointments from "./admin/appointments";
import AdminMessages from "./admin/messages";
import AdminSupport from "./admin/support";

const Dashboard = ({ userRole = "therapist" }) => {
  // In a real app, you would determine the user role from authentication
  // For demo purposes, we'll use a prop or default to therapist
  
  return (
    <DashboardLayout userRole={userRole}>
      <Routes>
        {/* Therapist Routes */}
        {userRole === "therapist" && (
          <>
            <Route path="/" element={<TherapistDashboard />} />
            <Route path="/appointments" element={<TherapistAppointments />} />
            <Route path="/groups" element={<TherapistGroups />} />
            <Route path="/messages" element={<TherapistMessages />} />
            <Route path="/support" element={<TherapistSupport />} />
          </>
        )}
        
        {/* Admin Routes */}
        {userRole === "admin" && (
          <>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/therapists" element={<AdminTherapists />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/manage-groups" element={<AdminGroups />} />
            <Route path="/appointments" element={<AdminAppointments />} />
            <Route path="/messages" element={<AdminMessages />} />
            <Route path="/support" element={<AdminSupport />} />
          </>
        )}
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;