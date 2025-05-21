import React from "react";

const TherapistMessages = () => {
  // Mock data for demonstration
  const conversations = [
    { id: 1, name: "John Doe", lastMessage: "Thank you for your help today", time: "10:30 AM", unread: true },
    { id: 2, name: "Jane Smith", lastMessage: "I'll see you at our next appointment", time: "Yesterday", unread: false },
    { id: 3, name: "Michael Johnson", lastMessage: "Can we reschedule for next week?", time: "Yesterday", unread: true },
    { id: 4, name: "Emily Wilson", lastMessage: "The exercises are really helping", time: "Monday", unread: false },
    { id: 5, name: "Support Team", lastMessage: "Your new group has been created", time: "Last week", unread: false },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-brown">Messages</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex h-[600px]">
          {/* Conversation List */}
          <div className="w-1/3 border-r border-secondary-cream">
            <div className="p-4 border-b border-secondary-cream">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search messages..." 
                  className="w-full pl-10 pr-4 py-2 border border-secondary-brown/30 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent bg-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-secondary-brown">search</span>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(600px-73px)]">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id} 
                  className={`p-4 border-b border-secondary-cream hover:bg-primary-cream cursor-pointer ${conversation.id === 1 ? 'bg-primary-cream' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-brown text-primary-cream flex items-center justify-center">
                        <span className="material-icons text-sm">{conversation.name === "Support Team" ? "support_agent" : "person"}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-primary-brown">{conversation.name}</p>
                        <p className="text-xs text-secondary-brown truncate max-w-[180px]">{conversation.lastMessage}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-xs text-secondary-brown">{conversation.time}</p>
                      {conversation.unread && (
                        <span className="h-2 w-2 rounded-full bg-primary-brown mt-1"></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="w-2/3 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-secondary-cream flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-brown text-primary-cream flex items-center justify-center">
                  <span className="material-icons text-sm">person</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-primary-brown">John Doe</p>
                  <p className="text-xs text-secondary-brown">Online</p>
                </div>
              </div>
              <div>
                <button className="p-2 rounded-full text-secondary-brown hover:text-primary-brown focus:outline-none">
                  <span className="material-icons">more_vert</span>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-secondary-cream">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary-brown text-primary-cream flex items-center justify-center mr-2">
                    <span className="material-icons text-xs">person</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow max-w-xs">
                    <p className="text-sm text-primary-brown">Hello Dr. Johnson, I wanted to thank you for your help today.</p>
                    <p className="text-xs text-secondary-brown mt-1">10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-primary-brown rounded-lg p-3 shadow max-w-xs">
                    <p className="text-sm text-primary-cream">You're welcome, John. How are you feeling after our session?</p>
                    <p className="text-xs text-primary-cream/80 mt-1">10:32 AM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary-brown text-primary-cream flex items-center justify-center mr-2">
                    <span className="material-icons text-xs">person</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow max-w-xs">
                    <p className="text-sm text-primary-brown">Much better. The breathing exercises really helped with my anxiety.</p>
                    <p className="text-xs text-secondary-brown mt-1">10:35 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
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
      </div>
    </div>
  );
};

export default TherapistMessages;