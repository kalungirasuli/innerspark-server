import React from "react";

const AdminTherapists = () => {
  // Mock data for demonstration
  const therapists = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Anxiety & Depression", patients: 24, status: "active", email: "sarah.j@innerspark.com" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Family Therapy", patients: 18, status: "active", email: "michael.c@innerspark.com" },
    { id: 3, name: "Dr. Emily Rodriguez", specialty: "Trauma Recovery", patients: 15, status: "pending", email: "emily.r@innerspark.com" },
    { id: 4, name: "Dr. James Wilson", specialty: "Cognitive Behavioral Therapy", patients: 22, status: "active", email: "james.w@innerspark.com" },
    { id: 5, name: "Dr. Lisa Thompson", specialty: "Child Psychology", patients: 19, status: "active", email: "lisa.t@innerspark.com" },
    { id: 6, name: "Dr. Robert Garcia", specialty: "Addiction Recovery", patients: 16, status: "inactive", email: "robert.g@innerspark.com" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-brown">Manage Therapists</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown">
          <span className="material-icons mr-2">person_add</span>
          Add New Therapist
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream flex justify-between items-center">
          <h2 className="text-lg font-medium">Therapist Directory</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search therapists..." 
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Specialty</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Patients</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-cream">
              {therapists.map((therapist) => (
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
                    <div className="text-sm text-secondary-brown">{therapist.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-brown">{therapist.patients}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${therapist.status === 'active' ? 'bg-green-100 text-green-800' : therapist.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
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

      {/* Add/Edit Therapist Form */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-lg font-medium">Add New Therapist</h2>
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
                  placeholder="Dr. Full Name"
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
                <label htmlFor="specialty" className="block text-sm font-medium text-secondary-brown mb-1">Specialty</label>
                <input 
                  type="text" 
                  id="specialty" 
                  className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                  placeholder="e.g. Anxiety & Depression"
                />
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
              <label htmlFor="bio" className="block text-sm font-medium text-secondary-brown mb-1">Professional Bio</label>
              <textarea 
                id="bio" 
                rows="4" 
                className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                placeholder="Brief professional biography"
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
                Add Therapist
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminTherapists;