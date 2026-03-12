import React from "react";

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-black text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        {/* Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {/* {["Dashboard", "Courses", "Grades"].map((link) => ( */}
                <li>
                  <a
                    href={`/my-learning`}
                    className="text-white hover:text-blue-600 transition-colors duration-300 no-underline"
                  >
                    My Learning
                  </a>
                </li>
                <li>
                  <a
                    href={`/profile`}
                    className="text-white hover:text-blue-600 transition-colors duration-300 no-underline"
                  >
                    Edit Profile
                  </a>
                </li>
                <li>
                  <a
                    href={`/course/search?query`}
                    className="text-white hover:text-blue-600 transition-colors duration-300 no-underline"
                  >
                    Explore Courses
                  </a>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {["Help Center", "Documentation", "FAQs"].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-white hover:text-blue-600 transition-colors duration-300 no-underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-white hover:text-blue-600 transition-colors duration-300 no-underline"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-3 rounded bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              required
            />
            <textarea
              placeholder="Your message"
              rows="4"
              className="w-full p-3 rounded bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              required
            />
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 transform hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 pt-5 border-t border-gray-800 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} TechNite Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
