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
} from "lucide-react";

import useOrganizationInfo from "../hooks/useOrganizationInfo";

const Footer = () => {
  const orgHook = useOrganizationInfo();
  const orgData = orgHook ? orgHook.orgData : null;
  const loading = orgHook ? orgHook.loading : false;

  return (
    <footer className="bg-teal-600 text-white py-12 mt-0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Logo + About */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-32 h-16 flex items-center justify-center overflow-hidden bg-white rounded">
              {loading ? (
                <Heart className="w-6 h-6 text-teal-600 fill-teal-600" />
              ) : orgData && orgData.logo ? (
                <img
                  src={orgData.logo}
                  alt="Hospital Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Heart className="w-6 h-6 text-teal-600 fill-teal-600" />
              )}
            </div>

            <h3 className="text-2xl font-bold">
              {loading
                ? "Loading..."
                : (orgData && orgData.hospital_name) || "Hospital"}
            </h3>
          </div>

          <p className="text-teal-100 text-sm leading-relaxed max-w-xs">
            Your trusted healthcare partner. We provide quality medical
            services with compassion, care, and modern technology.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center hover:bg-cyan-400 transition"
                >
                  <Icon size={18} />
                </a>
              )
            )}
          </div>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="text-xl font-bold mb-6">Our Services</h4>
          <ul className="space-y-3 text-teal-100">
            {[
              "Emergency Care",
              "Cardiology",
              "Neurology",
              "Pediatrics",
              "Orthopedics",
              "Laboratory",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 hover:text-white transition"
              >
                <span className="text-cyan-300 text-lg">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-xl font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-teal-100">

            {/* Address */}
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-cyan-300 mt-0.5" />
              <span className="leading-tight">
                {(orgData && orgData.address) ||
                  "Address not available"}
              </span>
            </li>

            {/* Phone */}
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-cyan-300" />
              <span>
                {(orgData && orgData.phone) ||
                  "+91 XXXXX XXXXX"}
              </span>
            </li>

            {/* Email */}
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-cyan-300" />
              <span>
                {(orgData && orgData.email) ||
                  "info@hospital.com"}
              </span>
            </li>

            {/* Website */}
            <li className="flex items-center gap-3">
              <Globe size={20} className="text-cyan-300" />
              <span>
                {(orgData && orgData.website) ||
                  "Website not available"}
              </span>
            </li>

            {/* Timing */}
            <li className="flex items-center gap-3">
              <Clock size={20} className="text-cyan-300" />
              <span>24/7 Emergency Support</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xl font-bold mb-6">Stay Healthy</h4>
          <p className="text-teal-100 mb-5 text-sm">
            Subscribe to get health tips, updates & emergency alerts.
          </p>

          <p className="text-teal-200 text-xs mt-3 flex items-center gap-1">
            <span className="text-cyan-300">Shield</span>
            We respect your privacy.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-teal-500 text-center text-teal-200 text-sm">
        © 2025{" "}
        {(orgData && orgData.hospital_name) || "Hospital"}.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
