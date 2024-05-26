import { useParams } from "react-router-dom";
import NewsList from "../../components/news-list/NewsList";
import React from "react";

const NewsPage: React.FC = () => {
    const { source } = useParams();
    return (
        <>
            <NewsList source={source || "abc-news"} />
        </>
    );
}

export default NewsPage;