import { Newspaper, Clock, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

const translations = {
    en: {
        text1: "BuzzByte brings you the best news from across the web, providing insightful analysis, and trending stories. Stay informed with the most relevant and compelling content!",
        text2: "BuzzByte's intuitive functionality streamlines your news consumption, by delivering the most important headlines and updates directly to your fingertips.",
        text3: "Stay tuned! Soon we will update this project with a subscription-based service that helps you keep track of any news you might want to read."
    },
    de: {
        text1: "BuzzByte bringt Ihnen die besten Nachrichten aus dem ganzen Web, bietet fundierte Analysen und aktuelle Geschichten. Bleiben Sie informiert mit den relevantesten und überzeugendsten Inhalten!",
        text2: "Die intuitive Funktionalität von BuzzByte vereinfacht Ihren Nachrichtenkonsum, indem sie Ihnen die wichtigsten Schlagzeilen und Updates direkt auf Ihre Fingerspitzen liefert.",
        text3: "Bleiben Sie dran! Bald werden wir dieses Projekt mit einem abonnementbasierten Service aktualisieren, der Ihnen hilft, alle Nachrichten im Blick zu behalten, die Sie lesen möchten."
    },
    fr: {
        text1: "BuzzByte vous apporte les meilleures nouvelles du Web, en fournissant des analyses approfondies et des histoires à la mode. Restez informé avec le contenu le plus pertinent et le plus convaincant!",
        text2: "La fonctionnalité intuitive de BuzzByte simplifie votre consommation de nouvelles, en vous fournissant les manchettes et les mises à jour les plus importantes directement à portée de main.",
        text3: "Restez à l'écoute! Bientôt, nous mettrons à jour ce projet avec un service basé sur l'abonnement qui vous aide à suivre toutes les nouvelles que vous pourriez vouloir lire."
    }
};

const HomePageInfo = () => {
    const [language, setLanguage] = useState("en");
    const [text1, setText1] = useState("en");
    const [text2, setText2] = useState("en");
    const [text3, setText3] = useState("en");

    useEffect(() => {
        const storedLanguage = sessionStorage.getItem("language");
        setText1((translations[language as keyof typeof translations] as { text1: string } | undefined)?.text1 || "");
        setText2((translations[language as keyof typeof translations] as { text2: string } | undefined)?.text2 || "");
        setText3((translations[language as keyof typeof translations] as { text3: string} | undefined)?.text3 || "");
        if (storedLanguage && translations.hasOwnProperty(storedLanguage)) {
            setLanguage(storedLanguage);
        }
    }, [language]);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
                <Newspaper size="48" />
                <p className="mt-5 text-indigo-900 text-lg text-center">{text1}</p>
            </div>
            <div className="flex flex-col items-center">
                <Clock size="48" />
                <p className="mt-5 text-indigo-900 text-lg text-center">{text2}</p>
            </div>
            <div className="flex flex-col items-center">
                <Calendar size="48" />
                <p className="mt-5 text-indigo-900 text-lg text-center">{text3}</p>
            </div>
        </div>
    );
};

export default HomePageInfo;
