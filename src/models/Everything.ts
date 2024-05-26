export type Everything = {
    status: string;
    totalResults: number;
    articles: Article[];
}

export type Article = {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type Source = {
    id: string;
    name: string;
}