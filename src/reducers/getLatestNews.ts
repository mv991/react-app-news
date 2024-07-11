import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { HaedlineType } from "../types";

export const fetchLatestNews = createAsyncThunk(
  'news/fetchLatest',
  async  ({ country }: { country: string; }) => {
 
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=e79d1410944f480283cb89096ee03791`);

    return response.data.articles as HaedlineType[];
  }
);