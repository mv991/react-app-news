
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AllNewsInterface } from "../types";
import axios from "axios";




export const getAllNews = createAsyncThunk(
  'news/fetchCategory',
  async  ({  country,page,category }: {  country: string,page:number,category:string}) => {
   
     const response = await axios.get(`https://api.thenewsapi.com/v1/news/top?api_token=EJaDyBnUilJ5irQJxSNhsBlSg3EExpiR3qjmeokM&locale=${country}&limit=3&categories=${category}&page=${page}`);

    return response.data as AllNewsInterface;
  }
);