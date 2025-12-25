// src/components/OrganizationInfo.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const OrganizationInfo = () => {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const res = await axios.get(
          "http://developer.bitmaxtest.com/api/organization"
        );

        // ✅ Actual data API ke andar `data` me hai
        const data = res?.data?.data;

        if (data) {
          setOrgData({
            name: data.hospital_name,   // 👉 Navbar / Footer ke liye
            logo: data.logo,            // 👉 already full URL
            address: data.company_address,
            phone: data.company_contact,
            email: data.company_email,
            website: data.company_website,
          });
        }
      } catch (error) {
        console.error("Organization API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, []);

  return { orgData, loading };
};

export default OrganizationInfo;
