import { Link } from "react-router-dom";
import Searchbar from "../search-bar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useCallback, useEffect, useState } from "react";
import { fetchNewsSources, filterSources, setCurrentPage } from "../../redux/sources/sources.slice";
import { toast } from "react-toastify";
import Pagination from "../pagination/Pagination";
import Button from "../button/Button";

const translations = {
    en: {
        title: "Source",
        noSources: "There are no sources with this filter or language."
    },
    de: {
        title: "Quelle",
        noSources: "Es gibt keine Quellen mit diesem Filter oder dieser Sprache."
    },
    fr: {
        title: "Source",
        noSources: "Il n'y a pas de sources avec ce filtre ou cette langue."
    }
};

const SourcesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { sources, loading, error, currentPage, sourcesPerPage } = useSelector((state: RootState) => state.sources);
    const [language, setLanguage] = useState("en");
    const [title, setTitle] = useState(translations.en.title);
    const [noSourcesMessage, setNoSourcesMessage] = useState(translations.en.noSources);

    const handleSearchChange = useCallback((value: string) => {
        dispatch(filterSources(value));
        toast.success("Search has been applied");
    }, [dispatch]);

    const handleSearch = (searchValue: string) => {
        handleSearchChange(searchValue);
    };

    useEffect(() => {
        const storedLanguage = sessionStorage.getItem("language");
        dispatch(fetchNewsSources("en"));
        setTitle(translations[language as keyof typeof translations]?.title || translations.en.title);
        setNoSourcesMessage(translations[language as keyof typeof translations]?.noSources || translations.en.noSources);
        if (storedLanguage && translations.hasOwnProperty(storedLanguage)) {
            setLanguage(storedLanguage);
        }
    }, [dispatch, language]);

    const currentSources = sources.slice(
        (currentPage - 1) * sourcesPerPage,
        currentPage * sourcesPerPage
    );

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const handleFilterReset = () => {
        window.location.reload();
        toast.success("Filters have been reset");
    }

    return (
        <div className="container mx-auto md:px-6">
            <section className="mb-32 text-center">
                <h2 className="mt-10 text-3xl text-indigo-900 font-bold">{title}</h2>
                <div className="grid lg:grid-cols-4 xl:gap-x-12 gap-4 my-6">
                    <div className="lg:col-span-1" />
                    <div className="lg:col-span-1" />
                    <div className="mb-6 lg:mb-0">
                        <Searchbar onSearch={handleSearch} />
                    </div>
                    <div className="mb-6 lg:mb-0">
                        <Button title="Reset filter" onClick={handleFilterReset} />
                    </div>
                </div>
                <hr className="mb-12" />
                {loading && <div className="text-center text-lg text-indigo-900">Loading...</div>}
                {error && <div className="text-center text-lg text-indigo-900">Error: {error}</div>}
                {!loading && !error && currentSources.length === 0 && (
                    <div className="text-center text-lg text-indigo-900">{noSourcesMessage}</div>
                )}
                {!loading && !error && currentSources.length > 0 && (
                    <>
                        <div className="grid gap-6 lg:grid-cols-3 xl:gap-x-12">
                            {currentSources.map(source => (
                                <div key={source.id} className="mb-6 lg:mb-0">
                                    <div className="relative block rounded-lg bg-indigo-300 shadow-lg">
                                        <div className="p-6">
                                            <h5 className="mb-3 text-lg font-semibold">{source.name}</h5>
                                            <p className="text-white">
                                                <a href={source.url} target="_blank" rel="noopener noreferrer">{source.url}</a>
                                            </p>
                                            <p className="mt-4 pb-2">{source.description}</p>
                                            <h6 className="text-lg mb-2">Country: {source.country}</h6>
                                            <Link to={`/news/${source.id}`} className="inline-block rounded-md bg-indigo-950 px-6 py-2 text-xs font-medium text-white shadow-lg hover:bg-indigo-700">NEWS</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-24">
                            <Pagination currentPage={currentPage} articlesPerPage={sourcesPerPage} totalResults={sources.length} onPageChange={handlePageChange} />
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}

export default SourcesList;
