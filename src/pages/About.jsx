import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const AboutUs = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Counter animation component
  const Counter = ({ end, suffix = "" }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    useEffect(() => {
      if (inView) {
        controls.start({ num: end });
      }
    }, [controls, inView, end]);

    return (
      <motion.span
        ref={ref}
        animate={controls}
        initial={{ num: 0 }}
        variants={{
          num: { num: end },
        }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        {({ num }) => Math.round(num) + suffix}
      </motion.span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B717A] to-teal-800 py-40 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative container mx-auto px-6 text-center text-white z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto opacity-95 leading-relaxed"
          >
            We are a passionate team dedicated to building innovative solutions that make a real difference in the world.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Founded with a simple idea — to simplify lives through technology — we have grown into a leading team that blends creativity, innovation, and excellence.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every project we take on is driven by a commitment to quality, customer satisfaction, and pushing the boundaries of what's possible.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="/assest/image/AboutUs4.webp"
                alt="Our Team Collaborating"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-28 bg-gradient-to-r from-[#0B717A] to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20"
          >
            Our Achievements
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-5xl md:text-7xl font-extrabold mb-4">
                <Counter end={500} suffix="+" />
              </h3>
              <p className="text-xl opacity-90">Happy Clients</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-5xl md:text-7xl font-extrabold mb-4">
                <Counter end={1200} suffix="+" />
              </h3>
              <p className="text-xl opacity-90">Projects Delivered</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-5xl md:text-7xl font-extrabold mb-4">
                <Counter end={50} suffix="+" />
              </h3>
              <p className="text-xl opacity-90">Team Members</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-5xl md:text-7xl font-extrabold mb-4">
                <Counter end={10} suffix="+" />
              </h3>
              <p className="text-xl opacity-90">Years of Excellence</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeInUp}
              className="bg-white p-14 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#0B717A] mb-8">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To deliver world-class, innovative, and reliable solutions that drive success for our clients and create lasting impact.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="bg-white p-14 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#0B717A] mb-8">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A future where technology transforms every challenge into an opportunity for growth and innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-20"
          >
            Meet Our Amazing Team
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", img: "/assest/image/AboutUs1.webp" },
              { name: "Michael Chen", role: "CTO", img: "/assest/image/Aboutus2.jpg" },
              { name: "Emma Rodriguez", role: "Lead Designer", img: "/assest/image/AboutUs3.webp" },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl overflow-hidden shadow-2xl mb-8"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
                <h4 className="text-2xl font-semibold text-gray-800 text-center">{member.name}</h4>
                <p className="text-[#0B717A] font-medium text-center mt-2">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;