import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../apiService";

const defaultData = {
  books: [],
  book: {},
  status: "idle",
  pageNum: 1,
  limit: 10,
  totalPage: 10,
};

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async ({ pageNum, query }) => {
    console.log("pageNum", pageNum);
    console.log("query", query);
    let url = `/books?_page=${pageNum}&_limit=${defaultData.limit}`;
    if (query) url += `&q=${query}`;
    console.log(url);
    const res = await api.get(url);
    return res.data;
  }
);

export const getBookDetail = createAsyncThunk(
  "book/getBookDetail",
  async (bookId) => {
    let url = `/books/${bookId}`;
    const res = await api.get(url);
    return res.data;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: defaultData,
  reducers: {
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getBookDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = "idle";
        state.book = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setPageNum } = bookSlice.actions;
export default bookSlice;
