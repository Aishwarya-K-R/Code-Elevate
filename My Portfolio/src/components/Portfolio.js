import HomeSection from "./HomeSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import ContactsSection from "./ContactsSection";

function Portfolio() {


  return (
    <div className="h-screen overflow-y-auto scroll-smooth">
      <nav className="fixed top-0 left-0 w-full z-10 bg-white shadow-md h-16 md:h-20 flex justify-between items-center px-4 md:px-10">
        <h1 className="font-semibold text-2xl sm:text-3xl mx-auto md:mx-0">
          Aishwarya K R
        </h1>
        <ul className="hidden md:flex gap-6 text-base sm:text-xl">
          <li><a href="#home" className="hover:text-gray-500 hover:underline">Home</a></li>
          <li><a href="#about" className="hover:text-gray-500 hover:underline">About</a></li>
          <li><a href="#experience" className="hover:text-gray-500 hover:underline">Experience</a></li>
          <li><a href="#projects" className="hover:text-gray-500 hover:underline">Projects</a></li>
          <li><a href="#contact" className="hover:text-gray-500 hover:underline">Contact</a></li>
        </ul>
      </nav>

      <HomeSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactsSection />

    </div>
  );
}

export default Portfolio;
