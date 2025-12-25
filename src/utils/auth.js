const AUTH_KEY = "auth";

export const saveAuth = ({ token, user }) => {
    localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
            token,
            user,
            isLoggedIn: true,
        })
    );
    window.dispatchEvent(new Event("storage"));
};

export const getToken = () => {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth).token : null;
};

export const getUser = () => {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth).user : null;
};

export const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event("storage"));
};