import React from "react";

const TherapistGroups = () => {
  // Mock data for demonstration
  const groups = [
    { id: 1, name: "Anxiety Support", members: 12, messages: 156, lastActive: "Today" },
    { id: 2, name: "Depression Management", members: 8, messages: 89, lastActive: "Yesterday" },
    { id: 3, name: "Grief & Loss", members: 6, messages: 45, lastActive: "3 days ago" },
    { id: 4, name: "Trauma Recovery", members: 10, messages: 120, lastActive: "Today" },
    { id: 5, name: "Stress Management", members: 15, messages: 200, lastActive: "Yesterday" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-brown">Group Chats</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown">
          <span className="material-icons mr-2">add</span>
          Create New Group
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-lg font-medium">Your Groups</h2>
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
                      <span className="material-icons text-sm">chat</span>
                    </button>
                    <button className="text-primary-brown hover:text-secondary-brown mr-3">
                      <span className="material-icons text-sm">people</span>
                    </button>
                    <button className="text-primary-brown hover:text-secondary-brown">
                      <span className="material-icons text-sm">settings</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Group Chat Interface Placeholder */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream flex justify-between items-center">
          <h2 className="text-lg font-medium">Anxiety Support</h2>
          <div className="flex items-center">
            <span className="text-sm mr-2">12 members</span>
            <button className="text-primary-cream hover:text-white">
              <span className="material-icons">more_vert</span>
            </button>
          </div>
        </div>
        <div className="h-96 p-4 overflow-y-auto bg-secondary-cream">
          <div className="space-y-4">
            {/* Sample messages */}
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary-brown text-primary-cream flex items-center justify-center mr-2">
                <span className="material-icons text-xs">person</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow max-w-xs">
                <p className="text-sm text-primary-brown">Hello everyone, how are you doing today?</p>
                <p className="text-xs text-secondary-brown mt-1">John D. - 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="bg-primary-brown rounded-lg p-3 shadow max-w-xs">
                <p className="text-sm text-primary-cream">I'm doing well, thanks for asking! How about you?</p>
                <p className="text-xs text-primary-cream/80 mt-1">You - 10:32 AM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary-brown text-primary-cream flex items-center justify-center mr-2">
                <span className="material-icons text-xs">person</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow max-w-xs">
                <p className="text-sm text-primary-brown">I've been struggling with anxiety lately, especially at work.</p>
                <p className="text-xs text-secondary-brown mt-1">Sarah J. - 10:35 AM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-secondary-cream">
          <form className="flex items-center">
            <button type="button" className="p-2 rounded-full text-secondary-brown hover:text-primary-brown focus:outline-none">
              <span className="material-icons">attach_file</span>
            </button>
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 border-0 focus:ring-0 focus:outline-none px-4 py-2"
            />
            <button type="submit" className="p-2 rounded-full text-primary-brown hover:text-secondary-brown focus:outline-none">
              <span className="material-icons">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TherapistGroups;