import React from "react";

const AdminDashboard = () => {
  // Mock data for demonstration
  const recentTherapists = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Anxiety & Depression", patients: 24, status: "active" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Family Therapy", patients: 18, status: "active" },
    { id: 3, name: "Dr. Emily Rodriguez", specialty: "Trauma Recovery", patients: 15, status: "pending" },
  ];

  const recentGroups = [
    { id: 1, name: "Anxiety Support", members: 12, messages: 156, lastActive: "Today" },
    { id: 2, name: "Depression Management", members: 8, messages: 89, lastActive: "Yesterday" },
    { id: 3, name: "Grief & Loss", members: 6, messages: 45, lastActive: "3 days ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-cream text-primary-brown">
              <span className="material-icons">people</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-secondary-brown">Therapists</h3>
              <p className="text-2xl font-bold text-primary-brown">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-cream text-primary-brown">
              <span className="material-icons">person</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-secondary-brown">Users</h3>
              <p className="text-2xl font-bold text-primary-brown">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-cream text-primary-brown">
              <span className="material-icons">forum</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-secondary-brown">Groups</h3>
              <p className="text-2xl font-bold text-primary-brown">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-cream text-primary-brown">
              <span className="material-icons">event</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-secondary-brown">Appointments</h3>
              <p className="text-2xl font-bold text-primary-brown">42</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Therapists */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream flex justify-between items-center">
          <h2 className="text-lg font-medium">Recent Therapists</h2>
          <a href="/dashboard/therapists" className="text-primary-cream hover:text-white flex items-center">
            <span>View All</span>
            <span className="material-icons ml-1 text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-cream">
            <thead className="bg-primary-cream">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Specialty</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Patients</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-cream">
              {recentTherapists.map((therapist) => (
                <tr key={therapist.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-cream text-primary-brown flex items-center justify-center">
                        <span className="material-icons text-sm">person</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-primary-brown">{therapist.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-brown">{therapist.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-brown">{therapist.patients}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${therapist.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {therapist.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-brown hover:text-secondary-brown mr-3">
                      <span className="material-icons text-sm">edit</span>
                    </button>
                    <button className="text-primary-brown hover:text-secondary-brown mr-3">
                      <span className="material-icons text-sm">video_call</span>
                    </button>
                    <button className="text-primary-brown hover:text-secondary-brown">
                      <span className="material-icons text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Groups */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream flex justify-between items-center">
          <h2 className="text-lg font-medium">Recent Groups</h2>
          <a href="/dashboard/manage-groups" className="text-primary-cream hover:text-white flex items-center">
            <span>View All</span>
            <span className="material-icons ml-1 text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-cream">
            <thead className="bg-primary-cream">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Group Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Members</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Messages</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Last Active</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-cream">
              {recentGroups.map((group) => (
                <tr key={group.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-cream text-primary-brown flex items-center justify-center">
                        <span className="material-icons text-sm">groups</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-primary-brown">{group.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-brown">{group.members}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-brown">{group.messages}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-brown">{group.lastActive}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-brown hover:text-secondary-brown mr-3">
                      <span className="material-icons text-sm">visibility</span>
                    </button>
                    <button className="text-primary-brown hover:text-secondary-brown mr-3">
                      <span className="material-icons text-sm">edit</span>
                    </button>
                    <button className="text-primary-brown hover:text-secondary-brown">
                      <span className="material-icons text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-medium text-primary-brown mb-4">Create New</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between px-4 py-2 bg-primary-cream text-primary-brown rounded-lg hover:bg-secondary-cream transition-colors">
              <span className="flex items-center">
                <span className="material-icons mr-2">person_add</span>
                Add Therapist
              </span>
              <span className="material-icons">arrow_forward</span>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-2 bg-primary-cream text-primary-brown rounded-lg hover:bg-secondary-cream transition-colors">
              <span className="flex items-center">
                <span className="material-icons mr-2">group_add</span>
                Create Group
              </span>
              <span className="material-icons">arrow_forward</span>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-2 bg-primary-cream text-primary-brown rounded-lg hover:bg-secondary-cream transition-colors">
              <span className="flex items-center">
                <span className="material-icons mr-2">event_available</span>
                Schedule Meeting
              </span>
              <span className="material-icons">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 col-span-2">
          <h3 className="text-lg font-medium text-primary-brown mb-4">Generate Meeting Link</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="therapist" className="block text-sm font-medium text-secondary-brown mb-1">Select Therapist</label>
              <select id="therapist" className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white">
                <option>Dr. Sarah Johnson</option>
                <option>Dr. Michael Chen</option>
                <option>Dr. Emily Rodriguez</option>
              </select>
            </div>
            <div>
              <label htmlFor="patient" className="block text-sm font-medium text-secondary-brown mb-1">Select Patient</label>
              <select id="patient" className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white">
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Michael Johnson</option>
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-secondary-brown mb-1">Date & Time</label>
              <input type="datetime-local" id="date" className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white" />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-secondary-brown mb-1">Duration</label>
              <select id="duration" className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white">
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
                <option>90 minutes</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown transition-all duration-300">
              Generate Google Meet Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;