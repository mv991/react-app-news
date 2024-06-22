import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { HaedlineType } from "../types";
interface NewsArticle {
  title: string;
  description: string;
  url: string;
  
  // Add other fields as needed
}
export const fetchLatestNews = createAsyncThunk(
  'news/fetchLatest',
  async  ({ country }: { country: string; }) => {
    const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=pub_4706571eac9dbe9ed1524cb28323b59c82545&country=${country}`);
    console.log(response,"hradline response")
    return response.data.results as HaedlineType[];
  }
);