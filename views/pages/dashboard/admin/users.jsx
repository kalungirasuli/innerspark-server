import React from "react";

const AdminUsers = () => {
  // Mock data for demonstration
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", therapist: "Dr. Sarah Johnson", status: "active", lastActive: "Today" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", therapist: "Dr. Michael Chen", status: "active", lastActive: "Yesterday" },
    { id: 3, name: "Michael Johnson", email: "michael.j@example.com", therapist: "Dr. Emily Rodriguez", status: "inactive", lastActive: "1 week ago" },
    { id: 4, name: "Emily Wilson", email: "emily.w@example.com", therapist: "Dr. Sarah Johnson", status: "active", lastActive: "Today" },
    { id: 5, name: "Robert Brown", email: "robert.b@example.com", therapist: "Dr. James Wilson", status: "active", lastActive: "3 days ago" },
    { id: 6, name: "Lisa Martinez", email: "lisa.m@example.com", therapist: "Dr. Lisa Thompson", status: "pending", lastActive: "Never" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-brown">Manage Users</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown">
          <span className="material-icons mr-2">person_add</span>
          Add New User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream flex justify-between items-center">
          <h2 className="text-lg font-medium">User Directory</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-10 pr-4 py-1 border border-primary-cream rounded-lg focus:ring-2 focus:ring-primary-cream focus:border-transparent bg-primary-brown/80 text-primary-cream placeholder-primary-cream/70"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-primary-cream/70 text-sm">search</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-cream">
            <thead className="bg-primary-cream">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Assigned Therapist</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Last Active</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-cream">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-cream text-primary-brown flex items-center justify-center">
                        <span className="material-icons text-sm">person</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-primary-brown">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-brown">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-brown">{user.therapist}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-brown">{user.lastActive}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-brown hover:text-secondary-brown mr-3">
                      <span className="material-icons text-sm">edit</span>
                    </button>
                    <button className="text-primary-brown hover:text-secondary-brown mr-3">
                      <span className="material-icons text-sm">message</span>
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

      {/* Add/Edit User Form */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-lg font-medium">Add New User</h2>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-brown mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-brown mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="therapist" className="block text-sm font-medium text-secondary-brown mb-1">Assign Therapist</label>
                <select 
                  id="therapist" 
                  className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                >
                  <option>Dr. Sarah Johnson</option>
                  <option>Dr. Michael Chen</option>
                  <option>Dr. Emily Rodriguez</option>
                  <option>Dr. James Wilson</option>
                  <option>Dr. Lisa Thompson</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-secondary-brown mb-1">Status</label>
                <select 
                  id="status" 
                  className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-brown mb-1">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary-brown mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-secondary-brown mb-1">Additional Notes</label>
              <textarea 
                id="notes" 
                rows="4" 
                className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                placeholder="Any additional information about this user"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                className="py-2 px-4 border border-secondary-brown rounded-lg text-secondary-brown bg-white hover:bg-secondary-cream focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-brown transition-all duration-300"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown transition-all duration-300"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* User Activity Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-lg font-medium">User Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-secondary-cream">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-cream text-primary-brown flex items-center justify-center">
                  <span className="material-icons text-sm">person</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-primary-brown">John Doe</p>
                  <p className="text-xs text-secondary-brown">Joined therapy session with Dr. Sarah Johnson</p>
                </div>
              </div>
              <span className="text-xs text-secondary-brown">Today, 10:30 AM</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-secondary-cream">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-cream text-primary-brown flex items-center justify-center">
                  <span className="material-icons text-sm">person</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-primary-brown">Jane Smith</p>
                  <p className="text-xs text-secondary-brown">Posted message in Anxiety Support Group</p>
                </div>
              </div>
              <span className="text-xs text-secondary-brown">Yesterday, 3:45 PM</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-secondary-cream">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-cream text-primary-brown flex items-center justify-center">
                  <span className="material-icons text-sm">person</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-primary-brown">Emily Wilson</p>
                  <p className="text-xs text-secondary-brown">Scheduled new appointment with Dr. Sarah Johnson</p>
                </div>
              </div>
              <span className="text-xs text-secondary-brown">Today, 9:15 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-cream text-primary-brown flex items-center justify-center">
                  <span className="material-icons text-sm">person</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-primary-brown">Robert Brown</p>
                  <p className="text-xs text-secondary-brown">Completed assessment questionnaire</p>
                </div>
              </div>
              <span className="text-xs text-secondary-brown">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;