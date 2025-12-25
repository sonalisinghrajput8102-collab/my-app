import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const useOrganizationInfo = () => {
    const [orgData, setOrgData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganization = async() => {
            try {
                const token = getToken();
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const res = await axios.get(
                    "https://developer.bitmaxtest.com/api/organization", { headers }
                );

                // Log response for debugging
                console.debug("useOrganizationInfo: API response:", res && res.data);

                const data = res && res.data && res.data.data;

                if (data) {
                    const mapped = {
                        name: data.hospital_name,
                        logo: "/assest/image/logo.png",
                        favicon: data.favicon,
                        address: data.company_address,
                        phone: data.company_contact,
                        email: data.company_email,
                        website: data.company_website,
                    };
                    console.debug("useOrganizationInfo: mapped orgData:", mapped);
                    setOrgData(mapped);
                } else {
                    console.warn("useOrganizationInfo: no data in response", res);
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

export default useOrganizationInfo;