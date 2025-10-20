import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Plus, Minus } from "lucide-react";
import { FiExternalLink } from "react-icons/fi";

function ExperienceSection() {

    const [openIndexes, setOpenIndexes] = useState([]);

    const toggleCard = (index) => {
        setOpenIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        )
    }

    const experiences = [
        {
            title: "Associate Software Engineer @ LeadSquared",
            company: "LeadSquared",
            logo: "/images/lsqlogo.png",
            duration: "July 2025 – Present",
            location: "Bangalore",
            website: "https://leadsquared.com",
            websiteLabel: "https://leadsquared.com",
            details: [
                "Automated 50+ APIs using the Java Rest Assured framework to streamline the Windows-to-Linux migration process and ensure cross-platform compatibility.",
                "Developed and automated 35+ end-to-end test scripts using Playwright, significantly improving testing efficiency and reliability.",
                "Debugged and resolved multiple UI issues in React.js, enhancing user interface stability and responsiveness.",
                "Identified and fixed several backend schema inconsistencies to maintain data integrity and optimize API functionality."
            ],
            tech: "Java, .NET, React JS, MySQL, Playwright"
        },
        {
            title: "Intern – Software Engineer @ LeadSquared",
            company: "LeadSquared",
            logo: "/images/lsqlogo.png",
            duration: "Jan 2025 – July 2025",
            location: "Bangalore",
            website: "https://leadsquared.com",
            websiteLabel: "https://leadsquared.com",
            details: [
                "Designed and developed a production-ready backend tool tailored to customer requirements, focusing on caching, efficiency, and performance optimization.",
                "Implemented an automated partition cleanup service to efficiently remove stale records older than 400 days, improving database performance and maintenance.",
                "Debugged and optimized a complex distributed codebase spanning multiple repositories to ensure seamless functionality.", "Resolved several customer-reported issues and UI bugs by analyzing and debugging JavaScript components.",
                "Identified and eliminated redundant database settings to reduce CPU usage and prevent configuration duplication.",
                "Enhanced data security by implementing encryption for sensitive information, addressing key security compliance concerns."
            ],
            tech: "C#, .NET 6, SQLyog, REST APIs, Postman, Swagger, Javascript, Git, Jira, Bitbucket",
        }
    ];


    return (
        <section
            id="experience"
            className="min-h-screen pt-16 sm:pt-20 md:pt-24 flex flex-col items-center bg-gray-50 w-full px-4 sm:px-6 lg:px-16"
        >
            <div className="text-center px-2 sm:px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10">
                    Experience
                </h2>
            </div>

            <div className="w-full max-w-2xl space-y-6">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md hover:shadow-lg transition rounded-2xl border border-gray-300 p-4 sm:p-6 cursor-pointer"
                        onClick={() => toggleCard(index)}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl font-semibold text-purple-600">
                                {exp.title}
                            </h3>
                            <div className="ml-2 sm:ml-4">
                                {openIndexes.includes(index) ? (
                                    <Minus className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
                                ) : (
                                    <Plus className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
                                )}
                            </div>
                        </div>

                        {openIndexes.includes(index) && (
                            <div className="mt-4 flex flex-col-reverse lg:flex-row lg:items-start lg:gap-8">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <FaMapMarkerAlt className="text-gray-600" />
                                        <span className="font-medium text-sm sm:text-base">
                                            {exp.location}
                                        </span>
                                        <a
                                            href={exp.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-700 hover:underline text-sm sm:text-base"
                                        >
                                            <FiExternalLink />
                                            <span>{exp.websiteLabel}</span>
                                        </a>
                                    </div>
                                    <div className="mb-2 text-gray-500 font-medium text-sm sm:text-base">
                                        {exp.duration}
                                    </div>
                                    <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                                        {exp.details.map((point, i) => (
                                            <li key={i} className="leading-relaxed">
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-2 text-gray-500 italic text-xs sm:text-sm">
                                        Tech: {exp.tech}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mb-4 lg:mb-0">
                                    <img
                                        src={exp.logo}
                                        alt={`${exp.company} logo`}
                                        className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain rounded-xl border border-gray-200 bg-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ExperienceSection;
