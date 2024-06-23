import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
  interface GetSearchNews {
    data:[{
    title: string;
  description: string;
  source_url: string;
  image_url:string
  content:string,
  uuid:string
  }]
  meta:{
    found:number
  }
  
}
export const searchNews = createAsyncThunk(
  'news/searchNews',
  async  ({  searchWord,page }: { searchWord:string,page:number}) => {
    console.log(searchWord,"SEARCH WORD")
     const response = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=1l8kgz0ykdPSpkkQQkna7XJ81m1V0yPtht8OzWxi&limit=3&search=${searchWord}&page=${page}`);
  
    return response.data as GetSearchNews
  }
);