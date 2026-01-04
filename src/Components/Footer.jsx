import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Globe,
  Shield,
} from "lucide-react";

import useOrganizationInfo from "../hooks/useOrganizationInfo";

const Footer = () => {
  const orgHook = useOrganizationInfo();
  const orgData = orgHook ? orgHook.orgData : null;
  const loading = orgHook ? orgHook.loading : false;

  // Social links with fallbacks
  const socialLinks = {
    facebook: orgData?.social_facebook || "https://facebook.com",
    twitter: orgData?.social_twitter || "https://twitter.com",
    instagram: orgData?.social_instagram || "https://instagram.com",
    linkedin: orgData?.social_linkedin || "https://linkedin.com",
    youtube: orgData?.social_youtube || "https://youtube.com",
  };

  const socialIcons = [
    { Icon: Facebook, link: socialLinks.facebook },
    { Icon: Twitter, link: socialLinks.twitter },
    { Icon: Instagram, link: socialLinks.instagram },
    { Icon: Linkedin, link: socialLinks.linkedin },
    { Icon: Youtube, link: socialLinks.youtube },
  ];

  // Services with optional links (you can customize)
  const services = [
    { name: "Emergency Care", href: "/services/emergency" },
    { name: "Cardiology", href: "/services/cardiology" },
    { name: "Neurology", href: "/services/neurology" },
    { name: "Pediatrics", href: "/services/pediatrics" },
    { name: "Orthopedics", href: "/services/orthopedics" },
    { name: "Laboratory", href: "/services/laboratory" },
  ];

  // Generate Google Maps link from address
  const googleMapsLink = orgData?.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(orgData.address)}`
    : "#";

  return (
    <footer className="bg-teal-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-32 h-16 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden">
              {loading ? (
                <Heart className="w-8 h-8 text-teal-600 fill-teal-600 animate-pulse" />
              ) : orgData && orgData.logo ? (
                <img
                  src={orgData.logo}
                  alt="Hospital Logo"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <Heart className="w-8 h-8 text-teal-600 fill-teal-600" />
              )}
            </div>

            <h3 className="text-2xl font-bold tracking-tight">
              {loading
                ? "Loading..."
                : (orgData && orgData.hospital_name) || "Hospital"}
            </h3>
          </div>

          <p className="text-teal-100 text-sm leading-relaxed max-w-xs">
            Your trusted healthcare partner. We provide quality medical services
            with compassion, care, and cutting-edge technology.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {socialIcons.map(({ Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-teal-800 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition-all duration-300 shadow-md"
                aria-label={`Follow us on ${Icon.name}`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="text-xl font-bold mb-7 text-cyan-200">Our Services</h4>
          <ul className="space-y-4">
            {services.map((service) => (
              <li key={service.name}>
                <a
                  href={service.href}
                  className="flex items-center gap-3 text-teal-100 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="text-cyan-400 text-lg group-hover:text-cyan-300">
                    ›
                  </span>
                  <span className="cursor-pointer">{service.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-xl font-bold mb-7 text-cyan-200">Contact Us</h4>
          <ul className="space-y-5 text-teal-100">

            {/* Address */}
            <li className="flex items-start gap-4 group">
              <MapPin size={22} className="text-cyan-300 mt-0.5 flex-shrink-0" />
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-tight hover:text-white transition cursor-pointer"
              >
                {orgData?.address || "Address not available"}
              </a>
            </li>

            {/* Phone */}
            <li className="flex items-center gap-4 group">
              <Phone size={22} className="text-cyan-300 flex-shrink-0" />
              <a
                href={`tel:${orgData?.phone || ''}`}
                className="hover:text-white transition cursor-pointer"
              >
                {orgData?.phone || "+91 XXXXX XXXXX"}
              </a>
            </li>

            {/* Email */}
            <li className="flex items-center gap-4 group">
              <Mail size={22} className="text-cyan-300 flex-shrink-0" />
              <a
                href={`mailto:${orgData?.email || ''}`}
                className="hover:text-white transition cursor-pointer"
              >
                {orgData?.email || "info@hospital.com"}
              </a>
            </li>

            {/* Website */}
            <li className="flex items-center gap-4 group">
              <Globe size={22} className="text-cyan-300 flex-shrink-0" />
              <a
                href={orgData?.website?.startsWith("http") ? orgData.website : `https://${orgData?.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition cursor-pointer"
              >
                {orgData?.website || "www.hospital.com"}
              </a>
            </li>

            {/* Timing */}
            <li className="flex items-center gap-4">
              <Clock size={22} className="text-cyan-300 flex-shrink-0" />
              <span>24/7 Emergency Support</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xl font-bold mb-7 text-cyan-200">Stay Healthy</h4>
          <p className="text-teal-100 mb-6 text-sm leading-relaxed">
            Subscribe to get latest health tips, medical updates & emergency alerts.
          </p>

          <div className="mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 rounded-lg bg-teal-800 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full"
              />
              <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-medium transition">
                Subscribe
              </button>
            </div>
          </div>

          <p className="text-teal-200 text-xs mt-6 flex items-center gap-2">
            <Shield size={16} className="text-cyan-300" />
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 pt-8 border-t border-teal-600 text-center text-teal-200 text-sm">
        © {new Date().getFullYear()} {" "}
        <span className="font-medium">
          {(orgData && orgData.hospital_name) || "Hospital"}
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;