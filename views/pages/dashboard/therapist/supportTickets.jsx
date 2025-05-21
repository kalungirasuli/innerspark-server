import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Technical Issue',
    message: '',
    attachment: ''
  });

  // Get user info from local storage or context
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const token = localStorage.getItem('token');

  // Set auth header
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  };

  // Fetch user's support tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/support/user/${user._id}/${user.userType}`,
          config
        );
        setTickets(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching tickets');
        setLoading(false);
      }
    };

    if (token && user._id) {
      fetchTickets();
    }
  }, [user._id, user.userType, token]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const ticketData = {
        ...formData,
        submittedBy: user._id,
        submitterModel: user.userType === 'therapist' ? 'Therapist' : 'User'
      };

      const res = await axios.post('/api/support', ticketData, config);
      
      // Add new ticket to state
      setTickets([res.data, ...tickets]);
      
      // Reset form
      setFormData({
        subject: '',
        category: 'Technical Issue',
        message: '',
        attachment: ''
      });
      
    } catch (err) {
      setError(err.response?.data?.msg || 'Error creating ticket');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // View ticket details
  const viewTicketDetails = async (ticketId) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/support/${ticketId}`, config);
      setSelectedTicket(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error fetching ticket details');
      setLoading(false);
    }
  };

  // Handle response submission
  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    
    if (!responseMessage.trim()) {
      setError('Response message cannot be empty');
      return;
    }
    
    try {
      const res = await axios.post(
        `/api/support/${selectedTicket._id}/response`,
        { message: responseMessage },
        config
      );
      
      // Update the selected ticket with the new response
      setSelectedTicket(res.data);
      
      // Clear the response message
      setResponseMessage('');
      
      // Update the ticket in the tickets list
      setTickets(tickets.map(ticket => 
        ticket._id === res.data._id ? res.data : ticket
      ));
    } catch (err) {
      setError(err.response?.data?.msg || 'Error submitting response');
    }
  };

  // Close ticket detail view
  const closeTicketDetails = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-brown">Support Tickets</h1>

      {/* Create Ticket Form */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-lg font-medium">Create New Support Ticket</h2>
        </div>
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary-brown mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                placeholder="Enter subject"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-secondary-brown mb-1">Category</label>
              <select 
                id="category" 
                name="category"
                value={formData.category}
                onChange={handleChange}
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
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6" 
                className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                placeholder="Describe your issue or question"
                required
              ></textarea>
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown transition-all duration-300"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-brown text-primary-cream">
          <h2 className="text-lg font-medium">Your Support Tickets</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-secondary-brown">Loading tickets...</div>
          ) : tickets.length === 0 ? (
            <div className="p-6 text-center text-secondary-brown">No support tickets found</div>
          ) : (
            <table className="min-w-full divide-y divide-secondary-cream">
              <thead className="bg-primary-cream">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Ticket ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Subject</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-cream">
                {tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">{ticket.ticketId || ticket._id.substring(0, 8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-brown">{ticket.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">{ticket.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' : ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-brown">{formatDate(ticket.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => viewTicketDetails(ticket._id)}
                        className="text-primary-brown hover:text-secondary-brown focus:outline-none"
                      >
                        <span className="material-icons text-sm">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 bg-primary-brown text-primary-cream flex justify-between items-center">
              <h2 className="text-lg font-medium">Ticket: {selectedTicket.subject}</h2>
              <button 
                onClick={closeTicketDetails}
                className="text-primary-cream hover:text-white focus:outline-none"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="mb-6 pb-6 border-b border-secondary-cream">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-primary-brown">{selectedTicket.subject}</h3>
                    <div className="flex items-center mt-1 space-x-4">
                      <div className="flex items-center">
                        <span className="material-icons text-secondary-brown text-sm mr-1">label</span>
                        <span className="text-sm text-secondary-brown">{selectedTicket.category}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-secondary-brown text-sm mr-1">schedule</span>
                        <span className="text-sm text-secondary-brown">{formatDate(selectedTicket.createdAt)}</span>
                      </div>
                      <div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedTicket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : selectedTicket.status === 'Resolved' ? 'bg-green-100 text-green-800' : selectedTicket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                          {selectedTicket.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-secondary-brown">
                    Ticket ID: {selectedTicket.ticketId || selectedTicket._id.substring(0, 8)}
                  </div>
                </div>
                <div className="bg-primary-cream p-4 rounded-lg">
                  <p className="text-primary-brown whitespace-pre-wrap">{selectedTicket.message}</p>
                </div>
              </div>
              
              {/* Responses */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-primary-brown mb-4">Responses</h4>
                {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                  <div className="space-y-4">
                    {selectedTicket.responses.map((response, index) => (
                      <div key={index} className="bg-white border border-secondary-cream rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium text-primary-brown">{response.responder}</div>
                          <div className="text-xs text-secondary-brown">{formatDate(response.createdAt)}</div>
                        </div>
                        <p className="text-secondary-brown">{response.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-secondary-brown py-4">No responses yet</div>
                )}
              </div>
              
              {/* Add Response Form */}
              <div>
                <h4 className="text-lg font-medium text-primary-brown mb-4">Add Response</h4>
                <form onSubmit={handleResponseSubmit}>
                  <div className="mb-4">
                    <textarea
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                      placeholder="Type your response..."
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-primary-cream bg-primary-brown hover:bg-secondary-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brown transition-all duration-300"
                    >
                      Send Response
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;