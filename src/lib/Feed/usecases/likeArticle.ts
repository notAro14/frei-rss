import { createAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "src/thunk";

export const articleLikedOrUnliked = createAction<{
  id: string;
}>("article/likedOrUnliked");

export const likeOrUnlikeArticle = createAppAsyncThunk<{ id: string }, string>(
  "article/likeOrUnlike",
  async function (id, { extra, rejectWithValue, getState, dispatch }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;

    const isCurrentlyLiked =
      getState().getFeeds.entities?.feedItems[id].favorite;
    dispatch(articleLikedOrUnliked({ id }));
    try {
      if (isCurrentlyLiked) return await feedReaderGateway.unlikeArticle(id);
      else return await feedReaderGateway.likeArticle(id);
    } catch (e) {
      return rejectWithValue(
        isCurrentlyLiked
          ? "Could not unlike article"
          : "Could not like article",
      );
    }
  },
);
