import React from "react";

function AboutSection() {
    return (
        <section
            id="about"
            className="min-h-screen scroll-mt-24 pt-24 flex flex-col items-center bg-gray-50 w-full px-4 sm:px-6 lg:px-16"
        >
            <div className="text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
                    About Me
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl">
                <div className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6 border-t-4 border-blue-500">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-blue-600">
                        🎓 Education
                    </h3>
                    <ul className="space-y-4 text-sm sm:text-base">
                        <li>
                            <p className="font-medium">B.E. in Computer Science</p>
                            <p className="text-gray-600">Bangalore Institute of Technology, 2021-25</p>
                        </li>
                        <li>
                            <p className="font-medium">Secondary Education</p>
                            <p className="text-gray-600">RNS Composite PU College, 2019-21</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6 border-t-4 border-green-500">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-green-600">
                        ⚙️ Primary Skills
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <span className="px-3 sm:px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium">
                            React
                        </span>
                        <span className="px-3 sm:px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-xs sm:text-sm font-medium">
                            Flutter
                        </span>
                        <span className="px-3 sm:px-4 py-1 bg-green-100 text-green-600 rounded-full text-xs sm:text-sm font-medium">
                            Tailwind CSS
                        </span>
                        <span className="px-3 sm:px-4 py-1 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-medium">
                            .NET
                        </span>
                        <span className="px-3 sm:px-4 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs sm:text-sm font-medium">
                            Spring Boot
                        </span>
                        <span className="px-3 sm:px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-xs sm:text-sm font-medium">
                            MySQL
                        </span>
                        <span className="px-3 sm:px-4 py-1 bg-green-100 text-green-600 rounded-full text-xs sm:text-sm font-medium">
                            Java
                        </span>
                        <span className="px-3 sm:px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-xs sm:text-sm font-medium">
                            C++
                        </span>
                        <span className="px-3 sm:px-4 py-1 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-medium">
                            DSA
                        </span>
                        <span className="px-3 sm:px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium">
                            CP
                        </span>
                    </div>
                </div>

                <div className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6 border-t-4 border-purple-500">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-purple-600">
                        💼 Experience
                    </h3>
                    <ul className="space-y-4 text-sm sm:text-base">
                        <li>
                            <p className="font-medium">Associate Software Engineer</p>
                            <p className="text-gray-600">LeadSquared, July 2025 - Present</p>
                        </li>
                        <li>
                            <p className="font-medium">Intern - Software Engineering</p>
                            <p className="text-gray-600">LeadSquared, Jan 2025 - July 2025</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default AboutSection