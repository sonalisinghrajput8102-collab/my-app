import React, { useState } from "react";
import { 
  FaHeartbeat, 
  FaStethoscope, 
  FaUserMd, 
  FaBaby, 
  FaTooth, 
  FaEye, 
  FaBrain, 
  FaXRay, 
  FaAmbulance,
  FaCalendarCheck,
  FaPhoneAlt,
  FaStar
} from "react-icons/fa";
import { MdHealthAndSafety, MdEmergency } from "react-icons/md";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const services = [
    {
      id: 1,
      title: "Emergency Care",
      description: "24/7 emergency services with rapid response teams, fully equipped emergency rooms, and immediate critical care.",
      icon: <MdEmergency />,
      category: "emergency",
      featured: true,
      details: ["Trauma Center", "Cardiac Emergency", "Pediatric Emergency", "Stroke Care"]
    },
    {
      id: 2,
      title: "Cardiology",
      description: "Comprehensive heart care including diagnostic tests, interventional procedures, and cardiac rehabilitation.",
      icon: <FaHeartbeat />,
      category: "specialty",
      featured: true,
      details: ["Echocardiography", "Angioplasty", "Pacemaker Implantation", "Cardiac Surgery"]
    },
    {
      id: 3,
      title: "General Medicine",
      description: "Primary healthcare services for all age groups with preventive care and chronic disease management.",
      icon: <FaStethoscope />,
      category: "general",
      featured: false,
      details: ["Health Check-ups", "Chronic Disease Management", "Vaccinations", "Preventive Care"]
    },
    {
      id: 4,
      title: "Pediatrics",
      description: "Specialized medical care for infants, children, and adolescents in a child-friendly environment.",
      icon: <FaBaby />,
      category: "specialty",
      featured: false,
      details: ["Neonatal Care", "Vaccination", "Growth Monitoring", "Child Nutrition"]
    },
    {
      id: 5,
      title: "Dentistry",
      description: "Complete dental care including routine check-ups, cosmetic dentistry, and oral surgery.",
      icon: <FaTooth />,
      category: "specialty",
      featured: false,
      details: ["Dental Implants", "Orthodontics", "Root Canal Treatment", "Teeth Whitening"]
    },
    {
      id: 6,
      title: "Ophthalmology",
      description: "Advanced eye care services from routine vision tests to complex surgical procedures.",
      icon: <FaEye />,
      category: "specialty",
      featured: false,
      details: ["Cataract Surgery", "LASIK", "Glaucoma Treatment", "Retina Care"]
    },
    {
      id: 7,
      title: "Neurology",
      description: "Diagnosis and treatment of disorders affecting the brain, spinal cord, and nervous system.",
      icon: <FaBrain />,
      category: "specialty",
      featured: false,
      details: ["EEG/EMG", "Stroke Management", "Epilepsy Care", "Neuro-rehabilitation"]
    },
    {
      id: 8,
      title: "Radiology & Imaging",
      description: "State-of-the-art diagnostic imaging including MRI, CT scan, ultrasound, and digital X-ray.",
      icon: <FaXRay />,
      category: "diagnostics",
      featured: false,
      details: ["MRI Scan", "CT Scan", "Ultrasound", "Digital X-ray"]
    },
    {
      id: 9,
      title: "Ambulance Services",
      description: "24/7 ambulance services with advanced life support and trained paramedical staff.",
      icon: <FaAmbulance />,
      category: "emergency",
      featured: false,
      details: ["Advanced Life Support", "Neonatal Ambulance", "Air Ambulance", "Critical Care Transport"]
    },
    {
      id: 10,
      title: "Preventive Health",
      description: "Comprehensive health check-up packages and wellness programs for disease prevention.",
      icon: <MdHealthAndSafety />,
      category: "general",
      featured: true,
      details: ["Executive Health Check", "Diabetes Screening", "Cancer Screening", "Wellness Programs"]
    },
    {
      id: 11,
      title: "Orthopedics",
      description: "Treatment for musculoskeletal injuries and disorders including joint replacement surgeries.",
      icon: <FaUserMd />,
      category: "specialty",
      featured: false,
      details: ["Joint Replacement", "Arthroscopy", "Fracture Management", "Sports Injury"]
    },
    {
      id: 12,
      title: "Maternity Care",
      description: "Comprehensive prenatal, delivery, and postnatal care for mothers and newborns.",
      icon: <FaBaby />,
      category: "specialty",
      featured: true,
      details: ["Prenatal Care", "Normal & C-Section Delivery", "Postnatal Care", "Neonatal ICU"]
    }
  ];

  const categories = [
    { id: "all", name: "All Services" },
    { id: "emergency", name: "Emergency" },
    { id: "specialty", name: "Specialty Care" },
    { id: "general", name: "General Medicine" },
    { id: "diagnostics", name: "Diagnostics" }
  ];

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const featuredServices = services.filter(service => service.featured);

  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>Our Medical Services</h1>
          <p style={styles.heroSubtitle}>
            Comprehensive healthcare services with cutting-edge technology and compassionate care
          </p>
          <div style={styles.heroStats}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>200+</span>
              <span style={styles.statLabel}>Expert Doctors</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>50+</span>
              <span style={styles.statLabel}>Medical Departments</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>24/7</span>
              <span style={styles.statLabel}>Emergency Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Featured Services</h2>
          <p style={styles.sectionSubtitle}>Our most sought-after medical services</p>
        </div>
        
        <div style={styles.featuredGrid}>
          {featuredServices.map(service => (
            <div key={service.id} style={styles.featuredCard}>
              <div style={styles.featuredIcon}>
                {service.icon}
              </div>
              <h3 style={styles.featuredTitle}>{service.title}</h3>
              <p style={styles.featuredDescription}>{service.description}</p>
              <div style={styles.detailsList}>
                {service.details.map((detail, index) => (
                  <span key={index} style={styles.detailItem}>{detail}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Services with Filter */}
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Our Medical Services</h2>
          <p style={styles.sectionSubtitle}>Browse our comprehensive range of healthcare services</p>
        </div>
        
        {/* Category Filter */}
        <div style={styles.categoryFilter}>
          {categories.map(category => (
            <button
              key={category.id}
              style={
                selectedCategory === category.id 
                  ? {...styles.categoryButton, ...styles.activeCategoryButton}
                  : styles.categoryButton
              }
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div style={styles.servicesGrid}>
          {filteredServices.map(service => (
            <div key={service.id} style={styles.serviceCard}>
              <div style={styles.cardHeader}>
                <div style={styles.serviceIcon}>
                  {service.icon}
                </div>
                <h3 style={styles.serviceTitle}>{service.title}</h3>
              </div>
              <p style={styles.serviceDescription}>{service.description}</p>
              
              <div style={styles.detailsList}>
                {service.details.map((detail, index) => (
                  <span key={index} style={styles.detailItem}>{detail}</span>
                ))}
              </div>
              
              <div style={styles.cardFooter}>
                <button style={styles.learnMoreButton}>
                  Learn More
                </button>
                <button style={styles.appointmentButton}>
                  <FaCalendarCheck style={styles.buttonIcon} /> Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Need Immediate Medical Assistance?</h2>
          <p style={styles.ctaText}>
            Our emergency department is staffed 24/7 with expert medical professionals ready to handle any medical crisis.
          </p>
          <div style={styles.ctaButtons}>
            <button style={styles.emergencyButton}>
              <MdEmergency style={styles.buttonIcon} /> Emergency: 108
            </button>
            <button style={styles.callButton}>
              <FaPhoneAlt style={styles.buttonIcon} /> Call Now: 1800-HEALTH
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Patient Experiences</h2>
          <p style={styles.sectionSubtitle}>What our patients say about our services</p>
        </div>
        
        <div style={styles.testimonialsGrid}>
          <div style={styles.testimonialCard}>
            <div style={styles.testimonialHeader}>
              <div style={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} style={styles.starIcon} />
                ))}
              </div>
              <p style={styles.testimonialText}>
                "The cardiology department saved my life. The doctors were not only skilled but also incredibly compassionate."
              </p>
            </div>
            <div style={styles.patientInfo}>
              <span style={styles.patientName}>Rajesh Kumar</span>
              <span style={styles.patientTreatment}>Cardiac Surgery Patient</span>
            </div>
          </div>
          
          <div style={styles.testimonialCard}>
            <div style={styles.testimonialHeader}>
              <div style={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} style={styles.starIcon} />
                ))}
              </div>
              <p style={styles.testimonialText}>
                "The maternity care was exceptional. From prenatal classes to delivery, everything was perfectly managed."
              </p>
            </div>
            <div style={styles.patientInfo}>
              <span style={styles.patientName}>Priya Sharma</span>
              <span style={styles.patientTreatment}>Maternity Care</span>
            </div>
          </div>
          
          <div style={styles.testimonialCard}>
            <div style={styles.testimonialHeader}>
              <div style={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} style={styles.starIcon} />
                ))}
              </div>
              <p style={styles.testimonialText}>
                "Emergency services responded within minutes. The quick action of the trauma team made all the difference."
              </p>
            </div>
            <div style={styles.patientInfo}>
              <span style={styles.patientName}>Amit Patel</span>
              <span style={styles.patientTreatment}>Emergency Care Patient</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    backgroundColor: "#f8f9fa",
  },
  heroSection: {
    backgroundImage: "linear-gradient(rgba(11, 113, 122, 0.85), rgba(11, 113, 122, 0.9)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "80px 20px",
    textAlign: "center",
    position: "relative",
  },
  heroOverlay: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "700",
    marginBottom: "20px",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  heroSubtitle: {
    fontSize: "1.4rem",
    maxWidth: "800px",
    margin: "0 auto 40px",
    fontWeight: "300",
    lineHeight: "1.6",
  },
  heroStats: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "40px",
    marginTop: "40px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statNumber: {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "5px",
  },
  statLabel: {
    fontSize: "1.1rem",
    fontWeight: "300",
  },
  sectionContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 20px",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#0B717A", // Changed to premium color
    marginBottom: "15px",
  },
  sectionSubtitle: {
    fontSize: "1.2rem",
    color: "#666",
    maxWidth: "700px",
    margin: "0 auto",
  },
  featuredGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginBottom: "40px",
  },
  featuredCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center",
    borderTop: "5px solid #0B717A", // Changed to premium color
  },
  featuredIcon: {
    fontSize: "3rem",
    color: "#0B717A", // Changed to premium color
    marginBottom: "20px",
  },
  featuredTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#0B717A", // Changed to premium color
    marginBottom: "15px",
  },
  featuredDescription: {
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  categoryFilter: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "50px",
  },
  categoryButton: {
    padding: "12px 28px",
    backgroundColor: "white",
    border: "2px solid #e0e0e0",
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#555",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  activeCategoryButton: {
    backgroundColor: "#0B717A", // Changed to premium color
    color: "white",
    borderColor: "#0B717A", // Changed to premium color
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "30px",
  },
  serviceCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    border: "1px solid #f0f0f0",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  serviceIcon: {
    fontSize: "2.2rem",
    color: "#0B717A", // Changed to premium color
    marginRight: "15px",
    backgroundColor: "#E8F7F9", // Changed to lighter shade of premium color
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#0B717A", // Changed to premium color
  },
  serviceDescription: {
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "20px",
    flexGrow: "1",
  },
  detailsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "25px",
  },
  detailItem: {
    backgroundColor: "#E8F7F9", // Changed to lighter shade of premium color
    color: "#0B717A", // Changed to premium color
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "500",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  learnMoreButton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    border: "2px solid #0B717A", // Changed to premium color
    borderRadius: "6px",
    color: "#0B717A", // Changed to premium color
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  appointmentButton: {
    padding: "10px 20px",
    backgroundColor: "#0B717A", // Changed to premium color
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  buttonIcon: {
    marginRight: "8px",
    fontSize: "1rem",
  },
  ctaSection: {
    backgroundColor: "#0B717A", // Changed to premium color
    color: "white",
    padding: "80px 20px",
    textAlign: "center",
  },
  ctaContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "20px",
  },
  ctaText: {
    fontSize: "1.2rem",
    marginBottom: "40px",
    lineHeight: "1.6",
  },
  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  emergencyButton: {
    padding: "18px 30px",
    backgroundColor: "#FF3B30",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 4px 15px rgba(255, 59, 48, 0.3)",
    transition: "all 0.3s ease",
  },
  callButton: {
    padding: "18px 30px",
    backgroundColor: "white",
    border: "none",
    borderRadius: "8px",
    color: "#0B717A", // Changed to premium color
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  testimonialCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.05)",
  },
  testimonialHeader: {
    marginBottom: "25px",
  },
  rating: {
    display: "flex",
    marginBottom: "15px",
  },
  starIcon: {
    color: "#FFC107",
    fontSize: "1.2rem",
    marginRight: "3px",
  },
  testimonialText: {
    fontStyle: "italic",
    lineHeight: "1.6",
    color: "#555",
  },
  patientInfo: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid #eee",
    paddingTop: "15px",
  },
  patientName: {
    fontWeight: "700",
    color: "#0B717A", // Changed to premium color
    fontSize: "1.1rem",
  },
  patientTreatment: {
    color: "#888",
    fontSize: "0.9rem",
  },
};

export default Services;