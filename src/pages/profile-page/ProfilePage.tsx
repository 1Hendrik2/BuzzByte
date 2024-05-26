import { Link } from "react-router-dom";
import profileImg from "../../assets/profile.jpg";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const translations = {
    en: {
        logoutB: "Logout"
    },
    de: {
        logoutB: "Abmelden"
    },
    fr: {
        logoutB: "Déconnexion"
    }
};

const ProfilePage = () => {

    const { logout } = useAuth();
    const [language, setLanguage] = useState("en");
    const [logoutB, setLogoutB] = useState("en");

    useEffect(() => {
        const storedLanguage = sessionStorage.getItem("language");
        setLogoutB(translations[language as keyof typeof translations]?.logoutB || translations.en.logoutB);
        if (storedLanguage && translations.hasOwnProperty(storedLanguage)) {
            setLanguage(storedLanguage);
        }
    }, [language]);

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return (
        <div className="flex flex-col items-center justify-center my-24">
            <img
                src={profileImg}
                alt="Profile"
                className="rounded-full h-32 w-32 mb-4" />
            <div className="text-center">
                <p className="text-lg font-semibold mb-2">Email: {user?.email}</p>
                <label className="text-lg font-semibold mb-2">Api Key:</label>
                <textarea
                    className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none"
                    value={user?.token}
                    readOnly
                />
            </div>
            <Link to="/" className="bg-indigo-950 hover:bg-indigo-800 h-8 mt-5 flex items-center justify-center font-semibold text-white text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white" onClick={logout}>{logoutB}</Link>
        </div>
    );
};

export default ProfilePage;