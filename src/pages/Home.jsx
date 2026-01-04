import React from "react";
import ScrollingText from "../HomeComponent/ScrollingText";
import HeroSection from "../HomeComponent/HeroSection";
import HealthGateway from "../HomeComponent/HealthGateway";
import AboutSection from "../HomeComponent/AboutSection";
import WhyChoose from "../HomeComponent/WhyChoose";
import Gallery from "../HomeComponent/Gallery";
import NewSection from "../HomeComponent/NewsSection";
import PatientStories from "../HomeComponent/PatientStories";

// import HeroSection from "../Home Component/HeroSection";
// import AboutSection from "../Home Component/AboutSection";
// import ProjectsSection from "../Home Component/ProjectsSection";
// import ContactSection from "../Home Component/ContactSection";




const Home = () => {
    return (
        <div>
            <ScrollingText />
            <HeroSection />
            <HealthGateway />
            <AboutSection />
            <WhyChoose />
            <Gallery />
            <NewSection />
            <PatientStories />
         {/* <HeroSection />
         <AboutSection />
         <ProjectsSection />
         <ContactSection /> */}
         
        </div>
    );
};

export default Home;