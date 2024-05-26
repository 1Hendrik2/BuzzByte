import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface DataState {
    loading: boolean,
    data: Article[],
    error: string,
    filter: Filter[],
    currentPage: number,
    totalResults: number,
    articlesPerPage: number,
}

interface Article {
    source: Source,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
};

interface Source {
    id: string,
    name: string
}

interface Filter {
    key: string;
    value: string;
}

export const getNews = createAsyncThunk("news/getNews", async ({ page, pageSize, source }: { page: number; pageSize: number; source: string }, {rejectWithValue, getState}) => {
    try {
        const token = sessionStorage.getItem('token');
        const language = sessionStorage.getItem('language');
        const state = getState() as RootState;
        const filters = state.news.filter;
        if(page === 7) {
            pageSize = 10;
        }

        const params: string[] = filters
                .filter(filter => filter.value)
                .map(filter => `${filter.key}=${filter.value}`);

        const response = await axios.get("https://newsapi.org/v2/everything", {
            params: {
              apiKey: token,
              page: page,
              pageSize: pageSize,
              language: language,
              sources: source,
              ...Object.fromEntries(params.map(param => param.split('=')))
            },
        });
        if(response.status === 200) {
            const filteredArticles = filterArticles(response.data.articles);
            return filteredArticles;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});

const filterArticles = (articles: Article[]): Article[] => {
    return articles.filter(article => !article.url.includes("https://removed.com"));
  };

const initialState: DataState = {
    loading: false,
    data: [],
    error: "",
    filter: [],
    currentPage: 1,
    totalResults: 100,
    articlesPerPage: 15,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        updateFilter: (state, action: PayloadAction<Filter>) => {
            const index = state.filter.findIndex(filter => filter.key === action.payload.key);
            if (index !== -1) {
                state.filter[index] = action.payload;
            } else {
                state.filter.push(action.payload);
            }
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getNews.pending, (state) => {
            state.loading = true;
          })
          .addCase(getNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
            state.data = action.payload;
            state.loading = false;
          })
          .addCase(getNews.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
});


export const { updateFilter, setCurrentPage } = newsSlice.actions;
export default newsSlice.reducer;