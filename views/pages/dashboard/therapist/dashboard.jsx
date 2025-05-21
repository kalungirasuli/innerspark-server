import React from "react";

const TherapistDashboard = () => {
  // Mock data for demonstration
  const upcomingAppointments = [
    { id: 1, patientName: "John Doe", date: "2023-06-15", time: "10:00 AM", status: "confirmed", meetLink: "https://meet.google.com/abc-defg-hij" },
    { id: 2, patientName: "Jane Smith", date: "2023-06-16", time: "2:30 PM", status: "pending", meetLink: "" },
    { id: 3, patientName: "Michael Johnson", date: "2023-06-17", time: "11:15 AM", status: "confirmed", meetLink: "https://meet.google.com/klm-nopq-rst" },
  ];

  const recentMessages = [
    { id: 1, from: "Support Team", message: "Your new group has been created", time: "10:30 AM", unread: true },
    { id: 2, from: "Anxiety Support Group", message: "New message from patient", time: "Yesterday", unread: false },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-cream text-primary-brown">
              <span className="material-icons">event</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-secondary-brown">Today's Appointments</h3>
              <p className="text-2xl font-bold text-primary-brown">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-cream text-primary-brown">
              <span className="material-icons">groups</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-secondary-brown">Active Groups</h3>
              <p className="text-2xl font-bold text-primary-brown">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-cream text-primary-brown">
              <span className="material-icons">person</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-secondary-brown">Total Patients</h3>
              <p className="text-2xl font-bold text-primary-brown">42</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream flex justify-between items-center">
          <h2 className="text-lg font-medium">Upcoming Appointments</h2>
          <a href="/dashboard/appointments" className="text-primary-cream hover:text-white flex items-center">
            <span>View All</span>
            <span className="material-icons ml-1 text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="divide-y divide-secondary-cream">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-primary-brown">{appointment.patientName}</h3>
                  <div className="flex items-center mt-1">
                    <span className="material-icons text-secondary-brown text-sm mr-1">calendar_today</span>
                    <span className="text-sm text-secondary-brown">{appointment.date}</span>
                    <span className="mx-2 text-secondary-brown">•</span>
                    <span className="material-icons text-secondary-brown text-sm mr-1">schedule</span>
                    <span className="text-sm text-secondary-brown">{appointment.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {appointment.status === "confirmed" ? (
                    <a 
                      href={appointment.meetLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
                    >
                      <span className="material-icons mr-1 text-sm">video_call</span>
                      Join
                    </a>
                  ) : (
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:border-secondary-brown focus:shadow-outline-brown active:bg-secondary-brown transition ease-in-out duration-150">
                        <span className="material-icons mr-1 text-sm">check</span>
                        Approve
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-primary-brown bg-primary-cream hover:bg-secondary-cream focus:outline-none focus:border-secondary-cream focus:shadow-outline-cream active:bg-secondary-cream transition ease-in-out duration-150">
                        <span className="material-icons mr-1 text-sm">close</span>
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream flex justify-between items-center">
          <h2 className="text-lg font-medium">Recent Messages</h2>
          <a href="/dashboard/messages" className="text-primary-cream hover:text-white flex items-center">
            <span>View All</span>
            <span className="material-icons ml-1 text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="divide-y divide-secondary-cream">
          {recentMessages.map((message) => (
            <div key={message.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-cream text-primary-brown flex items-center justify-center">
                  <span className="material-icons text-sm">{message.from.includes("Group") ? "groups" : "support_agent"}</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-primary-brown flex items-center">
                    {message.from}
                    {message.unread && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-brown text-primary-cream">
                        New
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-secondary-brown">{message.message}</p>
                </div>
              </div>
              <span className="text-xs text-secondary-brown">{message.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;