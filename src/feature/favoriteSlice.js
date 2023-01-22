import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../apiService";

const defaultData = {
  books: [],
  status: "idle",
};

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

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: defaultData,
  reducers: {},
  extraReducers: (builder) => {
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

export default favoritesSlice;
