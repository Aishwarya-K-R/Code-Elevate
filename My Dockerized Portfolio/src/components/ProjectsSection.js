import React from "react";
import { FaGithub, FaYoutube, FaExternalLinkAlt, FaImages } from "react-icons/fa";

function ProjectsSection() {
    return (
        <section
            id="projects"
            className="min-h-screen pt-28 mt-0 flex flex-col items-center bg-gray-50 w-full px-4 lg:px-10"
        >
            <h2 className="text-4xl font-bold mb-6 text-center">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                {[
                    {
                        img: "/images/project1.png",
                        title: "VizAI – A Natural Language Interface for Automated Data Visualization",
                        github: "https://github.com/Aishwarya-K-R/Code-Voyage/tree/main/AI-ML/VizAI%20-%20A%20Natural%20Language%20Interface%20for%20Automated%20Data%20Visualization",
                        video: "",
                        live: "",
                        output: "https://github.com/Aishwarya-K-R/Code-Voyage/tree/main/AI-ML/VizAI%20-%20A%20Natural%20Language%20Interface%20for%20Automated%20Data%20Visualization/Output%20Screenshots%20of%20VizAI"
                    },
                    {
                        img: "/images/project2.png",
                        title: "My Portfolio",
                        github: "https://github.com/Aishwarya-K-R/Code-Elevate/tree/main/My%20Portfolio",
                        video: "https://www.loom.com/share/2fe3a57f03564b2faf8a7a50ba706ba9",
                        live: "https://aishwaryakr-portfolio.netlify.app",
                        output: ""
                    },
                    {
                        img: "/images/project3.png",
                        title: "Chatbot-Enabled Pet Shop Management System",
                        github: "https://github.com/Aishwarya-K-R/Code-Elevate/tree/main/n8n%20Chatbot-Enabled%20Pet%20Shop%20Management%20System%20-%20Full%20Stack",
                        video: "https://www.loom.com/share/bba3770f594e472d904c13d94a0e8eca?sid=3c08feda-1f30-4759-b75d-95cc60169bec",
                        live: "",
                        output: ""
                    },
                ].map((project, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow-lg border p-6 flex flex-col items-center hover:shadow-xl transition"
                    >
                        <img
                            src={project.img}
                            alt={project.title}
                            className="rounded-xl mb-4 w-full h-64 object-cover"
                        />
                        <h3 className="text-2xl font-bold mb-4 text-center">{project.title}</h3>

                        <div className="flex flex-wrap justify-center gap-4 mb-6">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-100 transition text-gray-700"
                            >
                                <FaGithub className="mr-2 text-xl" /> GitHub
                            </a>
                            {project.output && (
                                <a
                                    href={project.output}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-100 transition text-gray-700"
                                >
                                    <FaImages className="mr-2 text-xl text-purple-600" /> View Outputs
                                </a>
                            )}
                            {project.video && (
                                <a
                                    href={project.video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-100 transition text-gray-700"
                                >
                                    <FaYoutube className="mr-2 text-xl text-red-600" /> Video Demo
                                </a>
                            )}
                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-100 transition text-gray-700"
                                >
                                    <FaExternalLinkAlt className="mr-2 text-xl text-green-600" /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProjectsSection