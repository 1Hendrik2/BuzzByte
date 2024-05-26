import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Source {
  id: string;
  name: string;
  description: string,
  url: string,
  language: string,
  country: string,

}

interface NewsSourcesState {
  loading: boolean;
  sources: Source[];
  allSources: Source[];
  error: string;
  currentPage: number;
  sourcesPerPage: number;
}

const initialState: NewsSourcesState = {
  loading: false,
  sources: [],
  allSources: [],
  error: "",
  currentPage: 1,
  sourcesPerPage: 15,
};

export const fetchNewsSources = createAsyncThunk("newsSources/fetchNewsSources", async (language: string | null, { rejectWithValue }) => {
    try {
      const lang = sessionStorage.getItem("language");
      const response = await axios.get(
        "https://newsapi.org/v2/sources?apiKey=0e77f11cdcac4201a97245341e493e68",
        {
          params: {
            language: lang,
          },
        }
      );
      return response.data.sources;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const newsSourcesSlice = createSlice({
  name: "newsSources",
  initialState,
  reducers: {
    filterSources: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.toLowerCase();
      state.sources = state.allSources.filter(
        (source) =>
          source.name.toLowerCase().includes(keyword) ||
          source.description.toLowerCase().includes(keyword)
      );
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSourcesPerPage: (state, action: PayloadAction<number>) => {
      state.sourcesPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsSources.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsSources.fulfilled, (state, action) => {
        state.loading = false;
        state.sources = action.payload;
        state.allSources = action.payload;
      })
      .addCase(fetchNewsSources.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { filterSources, setCurrentPage, setSourcesPerPage } = newsSourcesSlice.actions;
export default newsSourcesSlice.reducer;