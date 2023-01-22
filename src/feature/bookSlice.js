import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../apiService";

export const AddBook = "AddBook";
export const RemoveBook = "RemoveBook";

const defaultData = {
  books: [],
  bookDetail: {},
  favoritesBook: [],
  query: "",
  status: "idle",
  pageNum: 1,
  limit: 10,
  totalPage: 10,
};

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async ({ pageNum, query }) => {
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

export const getFavoritesBooks = createAsyncThunk(
  "favorites/getFavoritesBooks",
  async () => {
    const res = await api.get("/favorites");
    return res.data;
  }
);

export const addBookToFav = createAsyncThunk(
  "favorites/addingBook",
  async (addingBook) => {
    const res = await api.post(`/favorites`, addingBook);
    return res.data;
  }
);

export const removeBookFromFav = createAsyncThunk(
  "favorites/removeBook",
  async (removedBookId) => {
    await api.delete(`/favorites/${removedBookId}`);
    return removedBookId;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: defaultData,
  reducers: {
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    setBookStatus: (state, action) => {
      switch (action.payload.type) {
        case AddBook:
          state.status = AddBook;
          break;
        case RemoveBook:
          state.status = RemoveBook;
          state.bookDetail = action.payload.book;
          break;
        default:
          console.log("Cannot set bookStatus");
          break;
      }
    },
    setQuery: (state, action) => {
      state.query = action.payload;
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
        state.bookDetail = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getFavoritesBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavoritesBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(getFavoritesBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(addBookToFav.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBookToFav.fulfilled, (state, action) => {
        state.status = "idle";
        state.books.push(action.payload);
      })
      .addCase(addBookToFav.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(removeBookFromFav.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeBookFromFav.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = state.books.filter((i) => i.id !== action.payload);
      })
      .addCase(removeBookFromFav.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setPageNum, setBookStatus, setQuery } = bookSlice.actions;
export default bookSlice;
