import { useState } from 'react';

export default function TerminalContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Form submitted:', formData);
  };

  const handleRestart = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', description: '' });
  };

  return (
    <div className=" flex items-center justify-center p-4 ">
      <div className=" pb-10 w-full max-w-lg bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Window Header */}
        <div className="bg-black px-4 py-2 flex items-center justify-between rounded-t-lg">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-300 text-sm">contact@terminal.dev</div>
          <div className="w-12"></div> {/* Spacer for balance */}
        </div>

        {/* Form Content */}
        <div className="p-6 font-mono pl-16 pr-16">
          <div className="text-gray-100 mb-6">
            <div className="text-green-400 mb-4">Let's connect! Please fill in the details below 😊</div>
            
            <form onSubmit={handleSubmit} className="text-gray-100">
              {/* Name Field */}
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">→</span>
                  <span className="text-blue-400">~</span>
                  <span>Enter name:</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-blue-400 mr-2">~</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-transparent border-none focus:outline-none text-gray-100 w-full caret-green-500 placeholder-gray-500"
                    placeholder="John Doe"
                    required
                    disabled={submitted}
                  />
                  <div className={`ml-2 ${!submitted && 'animate-blink'}`}>_</div>
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">→</span>
                  <span className="text-blue-400">~</span>
                  <span>Enter email:</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-blue-400 mr-2">~</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-transparent border-none focus:outline-none text-gray-100 w-full caret-green-500 placeholder-gray-500"
                    placeholder="john@example.com"
                    required
                    disabled={submitted}
                  />
                  <div className={`ml-2 ${!submitted && 'animate-blink'}`}>_</div>
                </div>
              </div>

              {/* Description Field */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">→</span>
                  <span className="text-blue-400">~</span>
                  <span>Enter description:</span>
                </div>
                <div className="flex items-start mt-2">
                  <span className="text-blue-400 mr-2 mt-1">~</span>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-transparent border-none focus:outline-none text-gray-100 w-full caret-green-500 placeholder-gray-500 resize-none"
                    placeholder="Describe your project..."
                    rows={3}
                    required
                    disabled={submitted}
                  />
                  <div className={`ml-2 ${!submitted && 'animate-blink'}`}>_</div>
                </div>
              </div>

              {/* Submit/Restart Button */}
              <div className="flex items-center space-x-2">
                <span className="text-green-400">→</span>
                <span className="text-blue-400">~</span>
                <button
                  type={submitted ? 'button' : 'submit'}
                  onClick={submitted ? handleRestart : undefined}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-sm transition-colors duration-200"
                >
                  {submitted ? 'Restart' : 'Send'}
                </button>
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="mt-4 text-green-400">
                  Message sent! We'll get back to you soon ⚡
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}