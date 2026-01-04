import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const API_BASE = "https://developer.bitmaxtest.com";

const useOrganizationInfo = () => {
    const [orgData, setOrgData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganization = async() => {
            try {
                const token = getToken();

                const res = await axios.get(
                    API_BASE + "/api/organization", {
                        headers: {
                            Authorization: "Bearer " + token,
                            Accept: "application/json",
                        },
                    }
                );

                // ✅ NO optional chaining
                if (res && res.data && res.data.data) {
                    const data = res.data.data;

                    setOrgData({
                        name: data.hospital_name,
                        logo: data.logo,
                        favicon: data.favicon,
                        address: data.company_address,
                        phone: data.company_contact,
                        email: data.company_email,
                        website: data.company_website,
                    });
                }
            } catch (error) {
                // ✅ SAFE error handling
                if (error && error.response && error.response.status === 401) {
                    console.warn("Organization API unauthorized (401)");
                } else {
                    console.error("Organization API error:", error);
                }
                setOrgData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchOrganization();
    }, []);

    return { orgData, loading };
};

export default useOrganizationInfo;