import Footer from '@/components/Footer';
import { useState } from 'react';
import UserCardCarousel from './UserCardCorousel';

export default function ContactUs() {
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
    <div>
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-8">
  {/* Background Image */}
  <div 
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/007/357/984/non_2x/colorful-abstract-circle-background-free-vector.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(0.4)'
    }}
  />

  {/* Contact Form Container */}
  <div className="relative z-10 w-full max-w-2xl">
    {/* Contact Us Title */}
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
      <span className="bg-gradient-to-r  bg-clip-text text-7xl font-extrabold text-white">
        Contact Us
      </span>
    </h2>

    {/* Glassmorphism Terminal */}
    <div className="w-full bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-2xl overflow-hidden border border-white/20">
      {/* Terminal Header */}
      <div className="bg-black/30 px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"/>
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer"/>
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer"/>
        </div>
        <div className="text-gray-300 text-sm font-mono">contact@terminal.dev</div>
        <div className="w-12"/>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono px-4 md:px-8">
        <div className="text-gray-100 mb-6">
          <div className="text-green-400 mb-4 text-lg">Let's connect! Please fill in the details below 😊</div>
          
          <form onSubmit={handleSubmit} className="text-gray-100 space-y-6">
            {/* Name Field */}
            <div className="mb-5">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-green-400">→</span>
                <span className="text-blue-400">~</span>
                <span>Enter name:</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-400 mr-2">~</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white/10 backdrop-blur-sm border-b-2 border-gray-600 focus:border-green-500 focus:outline-none text-gray-100 w-full caret-green-500 placeholder-gray-400 text-sm md:text-base py-1 px-2 rounded-t"
                  placeholder="John Doe"
                  required
                  disabled={submitted}
                />
                <div className={`ml-2 ${!submitted && 'animate-pulse'}`}>_</div>
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-5">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-green-400">→</span>
                <span className="text-blue-400">~</span>
                <span>Enter email:</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-400 mr-2">~</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white/10 backdrop-blur-sm border-b-2 border-gray-600 focus:border-green-500 focus:outline-none text-gray-100 w-full caret-green-500 placeholder-gray-400 text-sm md:text-base py-1 px-2 rounded-t"
                  placeholder="john@example.com"
                  required
                  disabled={submitted}
                />
                <div className={`ml-2 ${!submitted && 'animate-pulse'}`}>_</div>
              </div>
            </div>

            {/* Description Field */}
            <div className="mb-7">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-green-400">→</span>
                <span className="text-blue-400">~</span>
                <span>Enter description:</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">~</span>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-white/10 backdrop-blur-sm border-b-2 border-gray-600 focus:border-green-500 focus:outline-none text-gray-100 w-full caret-green-500 placeholder-gray-400 resize-none text-sm md:text-base py-1 px-2 rounded-t h-32"
                  placeholder="Describe your project..."
                  required
                  disabled={submitted}
                />
                <div className={`ml-2 ${!submitted && 'animate-pulse'}`}>_</div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center space-x-2">
              <span className="text-green-400">→</span>
              <span className="text-blue-400">~</span>
              <button
                type={submitted ? 'button' : 'submit'}
                onClick={submitted ? handleRestart : undefined}
                className="px-6 py-2 bg-blue-600/90 hover:bg-blue-700/90 text-white rounded-sm transition-all duration-200 text-sm md:text-base backdrop-blur-sm"
              >
                {submitted ? 'Restart' : 'Send Message'}
              </button>
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="mt-5 text-green-400 text-sm md:text-base backdrop-blur-sm p-2 rounded">
                🚀 Message sent! We'll get back to you within 24 hours!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<UserCardCarousel/>
    <Footer/>
    </div>
  );
}