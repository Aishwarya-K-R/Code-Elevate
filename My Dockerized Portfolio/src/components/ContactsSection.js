import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

function ContactsSection() {
    return (
        <section
            id="contact"
            className="min-h-screen pt-20 -mt-16 flex flex-col items-center justify-center w-full px-4 lg:px-10"
        >
            <h2 className="text-4xl font-bold mb-8 text-black text-center">Let's Connect</h2>
            <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
                <span className="block text-2xl font-bold text-gray-500 mb-8 text-center">akr28921@gmail.com</span>
                <div className="flex flex-row justify-center items-center gap-10 mb-8">
                    <a
                        href="tel:+916363520157"
                        className="text-green-600 hover:text-green-800 transition"
                        title="Call"
                    >
                        <FaPhone className="w-12 h-12" />
                    </a>
                    <a
                        href="mailto:akr28921@gmail.com"
                        className="text-purple-600 hover:text-purple-900 transition"
                        title="Email"
                    >
                        <FaEnvelope className="w-12 h-12" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/aishwarya-k-r-b9b0b4295/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900 transition"
                        title="LinkedIn"
                    >
                        <FaLinkedin className="w-12 h-12" />
                    </a>
                    <a
                        href="https://github.com/Aishwarya-K-R/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-700 transition"
                        title="GitHub"
                    >
                        <FaGithub className="w-12 h-12" />
                    </a>
                </div>
                <div className="mt-2 text-base text-gray-400 text-center">
                    Based in Bangalore, India
                </div>
            </div>
        </section>
    )
}

export default ContactsSection