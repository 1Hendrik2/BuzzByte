import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import newsReducer from "./news/news.slice";
import sourcesReducer from "./sources/sources.slice";
import topHeadlinesReducer from "./top-headlines/top-headlines.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        news: newsReducer,
        sources: sourcesReducer,
        topHeadlines: topHeadlinesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;