import React from "react";

const TherapistSupport = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-brown">Support</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-lg font-medium">Contact Support Team</h2>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary-brown mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-secondary-brown mb-1">Category</label>
              <select 
                id="category" 
                className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
              >
                <option>Technical Issue</option>
                <option>Billing Question</option>
                <option>Patient Concern</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary-brown mb-1">Message</label>
              <textarea 
                id="message" 
                rows="6" 
                className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                placeholder="Describe your issue or question"
              ></textarea>
            </div>
            <div>
              <label htmlFor="attachment" className="block text-sm font-medium text-secondary-brown mb-1">Attachment (optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-secondary-brown/30 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <span className="material-icons text-secondary-brown mx-auto h-12 w-12">cloud_upload</span>
                  <div className="flex text-sm text-secondary-brown">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary-brown hover:text-secondary-brown">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-secondary-brown">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-lg font-medium">Support Tickets</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-cream">
            <thead className="bg-primary-cream">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Ticket ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Subject</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-cream">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">#12345</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-brown">Video call connection issues</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">Technical Issue</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">June 10, 2023</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">#12344</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-brown">Billing question about monthly subscription</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">Billing Question</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Resolved</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">June 5, 2023</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">#12343</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-brown">Request for additional group features</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">Feature Request</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Under Review</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">May 28, 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-lg font-medium">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-secondary-cream">
          <div className="p-6">
            <h3 className="text-lg font-medium text-primary-brown">How do I generate a meeting link for a patient?</h3>
            <p className="mt-2 text-sm text-secondary-brown">Meeting links are automatically generated when you approve an appointment request. You can also manually generate a link by going to the Appointments page and clicking on "Generate Link" for a specific appointment.</p>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-primary-brown">What should I do if a patient doesn't show up for an appointment?</h3>
            <p className="mt-2 text-sm text-secondary-brown">If a patient doesn't show up, you can mark the appointment as "missed" in your appointment history. The system will automatically notify the patient and you can choose to reschedule if needed.</p>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-primary-brown">How do I create a new therapy group?</h3>
            <p className="mt-2 text-sm text-secondary-brown">Go to the Groups page and click on "Create New Group". Fill in the required information such as group name, description, and add patients. You can also set a schedule for regular group sessions.</p>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-primary-brown">How are my services billed through the platform?</h3>
            <p className="mt-2 text-sm text-secondary-brown">The platform handles all billing automatically. Patients are charged based on your set rates and the type of session (individual or group). You can view your earnings and upcoming payments in the Billing section.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistSupport;