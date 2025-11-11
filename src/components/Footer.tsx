import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start">
                {/* Left Section */}
                <div className="flex flex-col items-start">
                    <h2 className="text-2xl font-bold text-white mb-3">AF Vehicle Services</h2>
                    {/* <p className="text-sm leading-relaxed">
                        Reliable vehicle maintenance and repair services that ensure your
                        ride stays smooth and safe on every journey.
                    </p> */}
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-start md:items-end">
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex space-x-4 justify-end">
                        <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-400 transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition">
                            <FaInstagram />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-700 transition">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Navigation Links */}
                {/* <div className="flex flex-col md:items-center">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div> */}
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} AF Vehicle Services. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;