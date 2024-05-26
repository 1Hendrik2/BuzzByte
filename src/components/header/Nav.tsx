import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import HeaderDropdown from "./HeaderDropdown";

const translations = {
    en: {
        home: "Home",
        sources: "Sources",
        profile: "Profile",
        languageDd: "Language",
        logoutB: "Logout",
        login: "Login"
    },
    de: {
        home: "Startseite",
        sources: "Quellen",
        profile: "Profil",
        languageDd: "Sprache",
        logoutB: "Abmelden",
        login: "Anmelden"
    },
    fr: {
        home: "Accueil",
        sources: "Sources",
        profile: "Profil",
        languageDd: "Langue",
        logoutB: "Déconnexion",
        login: "Connexion"
    }
};

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const [language, setLanguage] = useState("en");
    const [login, setLogin] = useState("en");
    const [home, setHome] = useState("en");
    const [sources, setSources] = useState("en");
    const [profile, setProfile] = useState("en");
    const [languageDd, setLanguageDd] = useState("en");
    const [logoutB, setLogoutB] = useState("en");

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguage = (language: string) => {
        sessionStorage.setItem("language", language)
    };

    const closeNavbarOnResize = useCallback(() => {
        if (window.innerWidth >= 768 && isOpen) {
            setIsOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        window.addEventListener('resize', closeNavbarOnResize);
        const storedLanguage = sessionStorage.getItem("language");
        setLogin((translations[language as keyof typeof translations] as { login: string } | undefined)?.login || "");
        setHome((translations[language as keyof typeof translations] as { home: string } | undefined)?.home || "");
        setSources((translations[language as keyof typeof translations] as { sources: string} | undefined)?.sources || "");
        setProfile((translations[language as keyof typeof translations] as { profile: string} | undefined)?.profile || "");
        setLanguageDd((translations[language as keyof typeof translations] as { languageDd: string} | undefined)?.languageDd || "");
        setLogoutB((translations[language as keyof typeof translations] as { logoutB: string} | undefined)?.logoutB || "");
        if (storedLanguage && translations.hasOwnProperty(storedLanguage)) {
            setLanguage(storedLanguage);
        }
        return () => {
            window.removeEventListener('resize', closeNavbarOnResize);
        };
    }, [isOpen, closeNavbarOnResize, language]);

    return (
        <>
            {isLoggedIn() ? (
                <>
                    <nav className="w-1/3 flex justify-end">
                        <div className="hidden w-full md:flex justify-between">
                            <Link to="/" className="text-lg mx-2 hover:text-indigo-800">{home}</Link>
                            <Link to="/sources" className="text-lg mx-2 hover:text-indigo-800">{sources}</Link>
                            <Link to="/my-profile" className="text-lg mx-2 hover:text-indigo-800">{profile}</Link>
                            <HeaderDropdown title={languageDd} buttons={[{name: "English", language: "en"},{name: "German", language: "de"}, {name: "French", language: "fr"}]} onChange={(value) => handleLanguage(value)} />
                            <Link to="/" className="bg-indigo-950 h-8 w-full flex items-center justify-center font-semibold text-white rounded-lg tracking-wider border-4 border-transparent hover:bg-indigo-800 active:border-white duration-300 active:text-white" onClick={logout}>{logoutB}</Link>
                        </div>
                        <div className="md:hidden">
                            <button onClick={toggleNavbar}>
                                {isOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </nav>
                    {isOpen && (
                        <div className="flex flex-col items-center basis-full">
                            <Link to="/" className="text-lg my-2">{home}</Link>
                            <Link to="/sources" className="text-lg my-2">{sources}</Link>
                            <Link to="/my-profile" className="text-lg my-2">{profile}</Link>
                            <HeaderDropdown title={languageDd} buttons={[{name: "English", language: "en"},{name: "German", language: "de"}, {name: "French", language: "fr"}]} onChange={(value) => handleLanguage(value)} />
                            <Link to="/" className=" my-2 bg-indigo-950 h-8 w-full flex items-center justify-center font-semibold text-white rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white" onClick={logout}>{logoutB}</Link>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <nav className="w-1/4 flex justify-end">
                        <div className="hidden w-full md:flex justify-between">
                            <Link to="/" className="my-2 text-lg hover:text-indigo-800">{home}</Link>
                            <HeaderDropdown title={languageDd} buttons={[{name: "English", language: "en"},{name: "German", language: "de"}, {name: "French", language: "fr"}]} onChange={(value) => handleLanguage(value)} />
                            <Link to="/login" className="my-2 bg-indigo-950 h-8 w-full flex items-center justify-center font-semibold text-white rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white">{login}</Link>
                        </div>
                        <div className="md:hidden">
                            <button onClick={toggleNavbar}>
                                {isOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </nav>
                    {isOpen && (
                        <div className="flex flex-col items-center basis-full">
                            <Link to="/" className="my-2 text-lg">{home}</Link>
                            <HeaderDropdown title={languageDd} buttons={[{name: "English", language: "en"},{name: "German", language: "de"}, {name: "French", language: "fr"}]} onChange={(value) => handleLanguage(value)} />
                            <Link to="/login" className="my-2 bg-indigo-950 h-8 w-full flex items-center justify-center font-semibold text-white rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white">{login}</Link>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Nav;