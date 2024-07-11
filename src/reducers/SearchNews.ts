import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AllNewsInterface } from "../types";

export const searchNews = createAsyncThunk(
  'news/searchNews',
  async  ({  searchWord,page }: { searchWord:string,page:number}) => {
   
     const response = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=EJaDyBnUilJ5irQJxSNhsBlSg3EExpiR3qjmeokM&limit=3&search=${searchWord}&page=${page}`);
  
    return response.data as AllNewsInterface
  }
);