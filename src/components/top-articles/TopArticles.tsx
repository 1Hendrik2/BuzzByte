import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { DataState, getNews } from "../../redux/top-headlines/top-headlines.slice";
import { useEffect, useState } from "react";
import headlineImg from "../../assets/headline_img.webp";

const translations = {
    en: {
        title: "Top Headlines"
    },
    de: {
        title: "Top-Schlagzeilen"
    },
    fr: {
        title: "Titres Principaux"
    }
};

const TopArticles = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, data, error } = useSelector<RootState, DataState>((state) => state.topHeadlines);
    const [language, setLanguage] = useState("en");
    const [title, setTitle] = useState("en");
    
    useEffect(() => {
        dispatch(getNews());
        const storedLanguage = sessionStorage.getItem("language");
        setTitle((translations[language as keyof typeof translations] as { title: string } | undefined)?.title || "");
        if (storedLanguage && translations.hasOwnProperty(storedLanguage)) {
            setLanguage(storedLanguage);
        }
    }, [dispatch, language]);

    return (
        <div className="container my-10 mx-auto md:px-6">
            <section className="mb-32">
                <h2 className="mb-12 text-center text-indigo-900 text-3xl font-bold">{title}</h2>

                {loading && <div className="text-center text-lg text-indigo-900">Loading...</div>}
                {error && <div className="text-center text-lg text-indigo-900">Error: {error}</div>}

                {!loading && !error && (
                    <div className="grid gap-6 lg:grid-cols-3">
                        {data.map((headline, index) => (
                            <div key={index} className="zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg shadow-black/20">
                                <img src={headlineImg} alt={headline.title} className="w-full align-middle transition duration-300 ease-linear" />
                                <a href={headline.url} target="_blank" rel="noopener noreferrer">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
                                        <div className="flex h-full items-end justify-start">
                                            <div className="m-6 text-white">
                                                <h5 className="mb-3 text-lg font-bold">{headline.title}</h5>
                                                <p>
                                                    <small>Published <u>{headline.publishedAt}</u> by {headline.author}</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-15"></div>
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default TopArticles;