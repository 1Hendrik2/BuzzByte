import { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import TopArticles from "../../components/top-articles/TopArticles";
import { useAuth } from "../../hooks/useAuth";
import HomePageInfo from "./HomepageInfo";

const translations = {
    en: {
        banner: "Stay informed, Byte by Byte!",
        welcome: "Welcome to BuzzByte!",
        description1: "Whether you're interested in breaking news, insightful analysis, or trending stories, BuzzByte has you covered.",
        description2: "With a diverse range of topics spanning politics, technology, entertainment, health, and more,",
        description3: "there's something for everyone at BuzzByte.",
    },
    de: {
        banner: "Bleiben Sie informiert, Byte für Byte!",
        welcome: "Willkommen bei BuzzByte!",
        description1: "Ob Sie sich für aktuelle Nachrichten, fundierte Analysen oder trendige Geschichten interessieren, BuzzByte hat alles, was Sie brauchen.", 
        description2: "Mit einer vielfältigen Auswahl an Themen von Politik über Technologie, Unterhaltung,",
        description3: "Gesundheit und mehr ist für jeden etwas dabei bei BuzzByte.",
    },
    fr: {
        banner: "Restez informé, octet par octet!",
        welcome: "Bienvenue sur BuzzByte!",
        description1: "Que vous soyez intéressé par les dernières nouvelles, des analyses approfondies ou des histoires tendances, BuzzByte a tout ce qu'il vous faut.",
        description2: "Avec une gamme diversifiée de sujets allant de la politique à la technologie, en passant par le divertissement, la santé,",
        description3: "et plus encore, il y en a pour tous les goûts sur BuzzByte."
    }
};

const HomePage = () => {
    const [language, setLanguage] = useState("en");
    const [banner, setBanner] = useState("en");
    const [description1, setDescription1] = useState("en");
    const [description2, setDescription2] = useState("en");
    const [description3, setDescription3] = useState("en");
    const [welcome, setWelcome] = useState("en");
    const { isLoggedIn } = useAuth();
    
    useEffect(() => {
        const storedLanguage = sessionStorage.getItem("language");
        setBanner((translations[language as keyof typeof translations] as { banner: string } | undefined)?.banner || "");
        setWelcome((translations[language as keyof typeof translations] as { welcome: string } | undefined)?.welcome || "");
        setDescription1((translations[language as keyof typeof translations] as { description1: string} | undefined)?.description1 || "");
        setDescription2((translations[language as keyof typeof translations] as { description2: string} | undefined)?.description2 || "");
        setDescription3((translations[language as keyof typeof translations] as { description3: string} | undefined)?.description3 || "");
        if (storedLanguage && translations.hasOwnProperty(storedLanguage)) {
            setLanguage(storedLanguage);
        }
    }, [language]);

    return (
        <>
            <Banner title="BuzzByte" description={banner} />
            <div className="text-center text-indigo-900 mt-10">
                <h2 className="text-3xl font-bold mb-4">{welcome}</h2>
                <p className="text-xl">{description1}</p>
                <p className="text-xl">{description2}</p>
                <p className="text-xl">{description3}</p>
            </div>
            <hr className="my-12" />
            <div>
                {isLoggedIn() ? <TopArticles /> : <HomePageInfo />}
            </div>
        </>
    );
}
 
export default HomePage;