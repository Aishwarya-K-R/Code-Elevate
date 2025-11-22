import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function HomeSection() {
  return (
      <section
        id="home"
        className="flex flex-col lg:flex-row items-center justify-center min-h-screen pt-20 -mt-16 px-4 lg:px-10 w-full bg-gray-50 gap-y-10 lg:gap-x-10"
      >
        <div className="flex-shrink-0 flex justify-center">
          <img
            src="/images/profile.png"
            alt="Profile Picture"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 max-w-full rounded-full object-cover shadow-xl mt-6 sm:mt-8 md:mt-10"
          />
        </div>

        <div className="flex flex-col items-center text-center px-4 max-w-sm sm:max-w-md lg:max-w-lg">
          <p className="text-gray-600 text-xl md:text-2xl lg:text-3xl mb-2">Hello, I'm</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2">
            Aishwarya K R
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl lg:text-3xl mb-6">
            Associate Software Engineer
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a
              href="/AISHWARYA K R -RESUME.pdf"
              download
              className="px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition text-lg sm:text-xl inline-block text-center"
            >
              Download CV
            </a>
            <a href="#contact" className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition text-lg sm:text-xl inline-block text-center">
              Contact Info
            </a>
          </div>

          <div className="flex gap-6 mt-6 justify-center">
            <a href="https://www.linkedin.com/in/aishwarya-k-r-b9b0b4295/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition text-3xl">
              <FaLinkedin />
            </a>
            <a href="https://github.com/Aishwarya-K-R/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition text-3xl">
              <FaGithub />
            </a>
          </div>
        </div>
      </section>
  );
}

export default HomeSection;