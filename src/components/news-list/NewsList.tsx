import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getNews, setCurrentPage, updateFilter } from "../../redux/news/news.slice";
import Dropdown from "../dropdown/Dropdown";
import Searchbar from "../search-bar/Searchbar";
import DateInput from "../date-input/DateInput";
import Banner from "../banner/Banner";
import { toast } from "react-toastify";
import Pagination from "../pagination/Pagination";
import Button from "../button/Button";

interface NewsListProps {
    source: string
}

const translations = {
    en: {
        dateFromTranslation: "Date From",
        dateToTranslation: "Date To",
        sortByTranslation: "Sort By",
        searchTranslation: "Search",
        resetFilter: "Reset Filter",
        noNewsMessage: "No news with this filter or language.",
    },
    de: {
        dateFromTranslation: "Datum Von",
        dateToTranslation: "Datum Bis",
        sortByTranslation: "Sortieren Nach",
        searchTranslation: "Suchen",
        resetFilter: "Zurücksetzen",
        noNewsMessage: "Keine Nachrichten mit diesem Filter oder dieser Sprache.",
    },
    fr: {
        dateFromTranslation: "Date De",
        dateToTranslation: "Date À",
        sortByTranslation: "Trier Par",
        searchTranslation: "Rechercher",
        resetFilter: "Réinitialiser",
        noNewsMessage: "Aucune nouvelle avec ce filtre ou cette langue.",
    }
};

const NewsList: React.FC<NewsListProps> = ({ source }) => {
    const [language, setLanguage] = useState("en");
    const [dateFromTranslation, setDateFromTranslation] = useState("en");
    const [dateToTranslation, setDateToTranslation] = useState("en");
    const [sortByTranslation, setSortByTranslation] = useState("en");
    const [searchTranslation, setSearchTranslation] = useState("en");
    const [resetFilter, setResetFilter] = useState("en");
    const [noNewsMessage, setNoNewsMessage] = useState("en");
    const dispatch = useDispatch<AppDispatch>();
    const articles = useSelector((state: RootState) => state.news.data);
    const loading = useSelector((state: RootState) => state.news.loading);
    const error = useSelector((state: RootState) => state.news.error);
    const currentPage = useSelector((state: RootState) => state.news.currentPage);
    const articlesPerPage = useSelector((state: RootState) => state.news.articlesPerPage);
    const totalResults = useSelector((state: RootState) => state.news.totalResults);

    const sortByButtons = ["relevancy", "popularity", "publishedAt"];

    const handleFilterChange = useCallback((key: string, value: string) => {
        dispatch(updateFilter({ key, value }));
        dispatch(getNews({ page: currentPage, pageSize: articlesPerPage, source: source }));
        toast.success("Filter has been changed");
    }, [dispatch, currentPage, articlesPerPage, source]);

    const handleSearch = (searchValue: string) => {
        handleFilterChange("q", searchValue);
    };

    useEffect(() => {
        const storedLanguage = sessionStorage.getItem("language");
        setDateFromTranslation((translations[language as keyof typeof translations] as { dateFromTranslation: string } | undefined)?.dateFromTranslation || "");
        setDateToTranslation((translations[language as keyof typeof translations] as { dateToTranslation: string } | undefined)?.dateToTranslation || "");
        setSortByTranslation((translations[language as keyof typeof translations] as { sortByTranslation: string} | undefined)?.sortByTranslation || "");
        setSearchTranslation((translations[language as keyof typeof translations] as { searchTranslation: string} | undefined)?.searchTranslation || "");
        setResetFilter((translations[language as keyof typeof translations] as { resetFilter: string} | undefined)?.resetFilter || "");
        setNoNewsMessage((translations[language as keyof typeof translations] as { noNewsMessage: string } | undefined)?.noNewsMessage || "");
        dispatch(getNews({ page: currentPage, pageSize: articlesPerPage, source: source }));
        if (storedLanguage && translations.hasOwnProperty(storedLanguage)) {
            setLanguage(storedLanguage);
        }
    }, [dispatch, currentPage, articlesPerPage, source, language]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
        dispatch(getNews({ page, pageSize: articlesPerPage, source: source }));
    };

    const handleFilterReset = () => {
        window.location.reload();
        toast.success("Filters have been reset");
    }

    return (
        <div className="container mx-auto md:px-6">
            <section className="mb-32 text-center">
                <Banner title={source.toUpperCase()} description="" />
                <div className="grid lg:grid-cols-5 xl:gap-x-12 gap-4 mb-6">
                    <div className="mb-6 lg:mb-0">
                        <label>{dateFromTranslation}</label>
                        <DateInput onChange={(value) => handleFilterChange("from", value)} />
                    </div>
                    <div className="mb-6 lg:mb-0">
                        <label>{dateToTranslation}</label>
                        <DateInput onChange={(value) => handleFilterChange("to", value)} />
                    </div>
                    <div className="mb-6 lg:mb-0">
                        <label>{sortByTranslation}</label>
                        <Dropdown title={sortByTranslation} buttons={sortByButtons} onChange={(value) => handleFilterChange("sortBy", value)} />
                    </div>
                    <div className="mb-6 lg:mb-0">
                        <label>{searchTranslation}</label>
                        <Searchbar onSearch={handleSearch} />
                    </div>
                    <div className="mb-6 lg:mb-0">
                        <label>{resetFilter}</label>
                        <Button title={resetFilter} onClick={handleFilterReset} />
                    </div>
                </div>
                <hr className="mb-24" />
                {loading && <div className="text-center text-lg text-indigo-900">Loading...</div>}
                {error && <div className="text-center text-lg text-indigo-900">Error: {error}</div>}
                {!loading && !error && (
                    <>
                        {articles.length === 0 ? (
                            <div className="text-center text-lg text-indigo-900">{noNewsMessage}</div>
                        ) : (
                            <>
                                <div className="grid gap-6 mb-24 lg:grid-cols-3 xl:gap-x-12">
                                    {articles.map(article => (
                                        <div key={article.url} className="mb-6 lg:mb-0">
                                            <div className="relative block rounded-lg bg-indigo-300 shadow-lg">
                                                <div className="flex">
                                                    <div className="relative mx-4 -mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg">
                                                        <img src={article.urlToImage} alt={article.title} className="w-full" />
                                                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                                                            <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h5 className="mb-3 text-lg font-semibold">{article.title}</h5>
                                                    <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                                                        <small>Published <u>{article.publishedAt}</u> by {article.author}</small>
                                                    </p>
                                                    <p className="mb-4 pb-2">{article.description}</p>
                                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-block rounded-md bg-indigo-950 px-6 py-2 text-xs font-medium text-white shadow-lg hover:bg-indigo-700">READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <Pagination currentPage={currentPage} articlesPerPage={articlesPerPage} totalResults={totalResults} onPageChange={handlePageChange} />
                                </div>
                            </>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default NewsList;
