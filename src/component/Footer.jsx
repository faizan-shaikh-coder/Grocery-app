import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-sm">&copy; {new Date().getFullYear()} Grocery App. All rights reserved.</p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
