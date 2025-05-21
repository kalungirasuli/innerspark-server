import React, { useState } from "react";

const TherapistAppointments = () => {
  // Tabs for different appointment views
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Mock data for demonstration
  const upcomingAppointments = [
    { id: 1, patientName: "John Doe", date: "2023-06-15", time: "10:00 AM", status: "confirmed", meetLink: "https://meet.google.com/abc-defg-hij" },
    { id: 2, patientName: "Jane Smith", date: "2023-06-16", time: "2:30 PM", status: "pending", meetLink: "" },
    { id: 3, patientName: "Michael Johnson", date: "2023-06-17", time: "11:15 AM", status: "confirmed", meetLink: "https://meet.google.com/klm-nopq-rst" },
    { id: 4, patientName: "Emily Wilson", date: "2023-06-18", time: "3:45 PM", status: "pending", meetLink: "" },
    { id: 5, patientName: "Robert Brown", date: "2023-06-19", time: "9:30 AM", status: "confirmed", meetLink: "https://meet.google.com/uvw-xyz-123" },
  ];
  
  const pastAppointments = [
    { id: 101, patientName: "Sarah Johnson", date: "2023-06-01", time: "11:00 AM", status: "completed", notes: "Follow-up in 2 weeks" },
    { id: 102, patientName: "David Lee", date: "2023-06-03", time: "1:15 PM", status: "completed", notes: "Discussed anxiety management techniques" },
    { id: 103, patientName: "Jennifer Garcia", date: "2023-06-05", time: "10:30 AM", status: "missed", notes: "Patient did not attend" },
    { id: 104, patientName: "Thomas Wilson", date: "2023-06-08", time: "4:00 PM", status: "completed", notes: "Progress with depression treatment" },
    { id: 105, patientName: "Lisa Martinez", date: "2023-06-10", time: "2:45 PM", status: "completed", notes: "Reviewed medication effectiveness" },
  ];

  // Function to handle appointment approval
  const handleApprove = (appointmentId) => {
    // In a real app, this would make an API call to update the appointment status
    console.log(`Approved appointment ${appointmentId}`);
    // Then update the local state or refetch data
  };

  // Function to handle appointment decline
  const handleDecline = (appointmentId) => {
    // In a real app, this would make an API call to update the appointment status
    console.log(`Declined appointment ${appointmentId}`);
    // Then update the local state or refetch data
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-xl font-medium">Manage Appointments</h2>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-secondary-cream">
          <nav className="-mb-px flex px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "upcoming" ? 'border-primary-brown text-primary-brown' : 'border-transparent text-secondary-brown hover:text-primary-brown hover:border-secondary-brown'}`}
            >
              Upcoming Appointments
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`ml-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "past" ? 'border-primary-brown text-primary-brown' : 'border-transparent text-secondary-brown hover:text-primary-brown hover:border-secondary-brown'}`}
            >
              Past Appointments
            </button>
          </nav>
        </div>
        
        {/* Appointment List */}
        <div className="overflow-x-auto">
          {activeTab === "upcoming" ? (
            <table className="min-w-full divide-y divide-secondary-cream">
              <thead className="bg-primary-cream">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Patient</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Date & Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-cream">
                {upcomingAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-cream text-primary-brown flex items-center justify-center">
                          <span className="material-icons text-sm">person</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-primary-brown">{appointment.patientName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary-brown">{appointment.date}</div>
                      <div className="text-sm text-secondary-brown">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                          <button 
                            onClick={() => handleApprove(appointment.id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:border-secondary-brown focus:shadow-outline-brown active:bg-secondary-brown transition ease-in-out duration-150"
                          >
                            <span className="material-icons mr-1 text-sm">check</span>
                            Approve
                          </button>
                          <button 
                            onClick={() => handleDecline(appointment.id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-primary-brown bg-primary-cream hover:bg-secondary-cream focus:outline-none focus:border-secondary-cream focus:shadow-outline-cream active:bg-secondary-cream transition ease-in-out duration-150"
                          >
                            <span className="material-icons mr-1 text-sm">close</span>
                            Decline
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-secondary-cream">
              <thead className="bg-primary-cream">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Patient</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Date & Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-cream">
                {pastAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-cream text-primary-brown flex items-center justify-center">
                          <span className="material-icons text-sm">person</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-primary-brown">{appointment.patientName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary-brown">{appointment.date}</div>
                      <div className="text-sm text-secondary-brown">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">
                      {appointment.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapistAppointments;