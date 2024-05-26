import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export interface DataState {
    loading: boolean,
    data: Article[],
    error: string,
};

interface Article {
    author: string,
    title: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
};



export const getNews = createAsyncThunk("topHeadlines/getArticles", async (_, {rejectWithValue}) => {
    try {
        const token = sessionStorage.getItem('token');
        let language = sessionStorage.getItem('language');
        if(language === "en") {
            language = "gb";
        }
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                apiKey: token,
                country: language,
                page: 1,
                pagesize: 6
            },
        });
        if(response.status === 200) {
            return response.data.articles;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});


const initialState: DataState = {
    loading: false,
    data: [],
    error: ""
};

const newsSlice = createSlice({
    name: "topHeadlines",
    initialState,
    reducers: {},
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

export default newsSlice.reducer;