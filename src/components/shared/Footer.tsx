import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      {/* Company Info */}
      <div>
        <h2 className="text-xl font-semibold">Investment</h2>
        <p className="mt-2 text-gray-400">
          Empowering investors with the best financial insights and services.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <ul className="mt-2 space-y-2">
          <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
          {/* <li><a href="/portfolio" className="text-gray-400 hover:text-white">Portfolio</a></li> */}
          <li><a href="/contact-us" className="text-gray-400 hover:text-white">Contact</a></li>
          {/* <li><a href="/admin" className="text-gray-400 hover:text-white">Admin</a></li> */}
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h2 className="text-xl font-semibold">Follow Us</h2>
        <div className="mt-2 flex justify-center md:justify-start space-x-4">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white text-2xl">
            {/* <FaFacebook /> */}
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white text-2xl">
            {/* <FaTwitter /> */}
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-white text-2xl">
            {/* <FaInstagram /> */}
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-white text-2xl">
            {/* <FaLinkedin /> */}
          </a>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="mt-8 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} . All rights reserved.
    </div>
  </footer>
  )
}

export default Footer