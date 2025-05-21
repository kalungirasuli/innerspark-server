import React from "react";

const AdminGroups = () => {
  // Mock data for demonstration
  const groups = [
    { id: 1, name: "Anxiety Support", members: 12, messages: 156, lastActive: "Today", therapist: "Dr. Sarah Johnson" },
    { id: 2, name: "Depression Management", members: 8, messages: 89, lastActive: "Yesterday", therapist: "Dr. Michael Chen" },
    { id: 3, name: "Grief & Loss", members: 6, messages: 45, lastActive: "3 days ago", therapist: "Dr. Emily Rodriguez" },
    { id: 4, name: "Trauma Recovery", members: 10, messages: 120, lastActive: "Today", therapist: "Dr. James Wilson" },
    { id: 5, name: "Stress Management", members: 15, messages: 200, lastActive: "Yesterday", therapist: "Dr. Lisa Thompson" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-brown">Manage Groups</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown">
          <span className="material-icons mr-2">group_add</span>
          Create New Group
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream flex justify-between items-center">
          <h2 className="text-lg font-medium">All Groups</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search groups..." 
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Group Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Therapist</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Members</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Messages</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Last Active</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-cream">
              {groups.map((group) => (
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
                    <div className="text-sm text-secondary-brown">{group.therapist}</div>
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

      {/* Create/Edit Group Form */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-lg font-medium">Create New Group</h2>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="groupName" className="block text-sm font-medium text-secondary-brown mb-1">Group Name</label>
                <input 
                  type="text" 
                  id="groupName" 
                  className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                  placeholder="e.g. Anxiety Support"
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
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-secondary-brown mb-1">Group Description</label>
              <textarea 
                id="description" 
                rows="4" 
                className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                placeholder="Describe the purpose and goals of this group"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-brown mb-1">Add Members</label>
              <div className="border border-secondary-brown/30 rounded-lg p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-primary-cream px-3 py-1 rounded-full text-xs text-primary-brown flex items-center">
                    John Doe
                    <button className="ml-1 text-primary-brown focus:outline-none">
                      <span className="material-icons text-xs">close</span>
                    </button>
                  </div>
                  <div className="bg-primary-cream px-3 py-1 rounded-full text-xs text-primary-brown flex items-center">
                    Jane Smith
                    <button className="ml-1 text-primary-brown focus:outline-none">
                      <span className="material-icons text-xs">close</span>
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search patients to add..." 
                    className="w-full pl-10 pr-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-secondary-brown text-sm">search</span>
                  </div>
                </div>
              </div>
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
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Group Chat Moderation Interface */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream flex justify-between items-center">
          <h2 className="text-lg font-medium">Group Chat Moderation</h2>
          <div className="flex items-center">
            <span className="text-sm mr-2">Anxiety Support Group</span>
          </div>
        </div>
        <div className="h-96 p-4 overflow-y-auto bg-secondary-cream">
          <div className="space-y-4">
            {/* Sample messages with moderation options */}
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary-brown text-primary-cream flex items-center justify-center mr-2">
                <span className="material-icons text-xs">person</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow max-w-xs relative group">
                <p className="text-sm text-primary-brown">Hello everyone, how are you doing today?</p>
                <p className="text-xs text-secondary-brown mt-1">John D. - 10:30 AM</p>
                <div className="absolute top-2 right-2 hidden group-hover:block">
                  <button className="text-secondary-brown hover:text-primary-brown">
                    <span className="material-icons text-xs">delete</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary-brown text-primary-cream flex items-center justify-center mr-2">
                <span className="material-icons text-xs">person</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow max-w-xs relative group">
                <p className="text-sm text-primary-brown">I've been struggling with anxiety lately, especially at work.</p>
                <p className="text-xs text-secondary-brown mt-1">Sarah J. - 10:35 AM</p>
                <div className="absolute top-2 right-2 hidden group-hover:block">
                  <button className="text-secondary-brown hover:text-primary-brown">
                    <span className="material-icons text-xs">delete</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary-brown text-primary-cream flex items-center justify-center mr-2">
                <span className="material-icons text-xs">person</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow max-w-xs relative group">
                <p className="text-sm text-primary-brown">I understand how you feel. Have you tried the breathing techniques we discussed last week?</p>
                <p className="text-xs text-secondary-brown mt-1">Dr. Sarah Johnson - 10:40 AM</p>
                <div className="absolute top-2 right-2 hidden group-hover:block">
                  <button className="text-secondary-brown hover:text-primary-brown">
                    <span className="material-icons text-xs">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-secondary-cream">
          <div className="flex justify-between items-center">
            <button className="py-2 px-4 border border-secondary-brown rounded-lg text-secondary-brown bg-white hover:bg-secondary-cream focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-brown transition-all duration-300">
              <span className="material-icons mr-1 text-sm">delete_sweep</span>
              Delete Selected
            </button>
            <button className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown transition-all duration-300">
              <span className="material-icons mr-1 text-sm">send</span>
              Send Message as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGroups;