

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


export interface  AllNewsInterface {
  data:[{
    title: string;
  description: string;
  source_url: string;
  image_url:string
  content:string
  uuid:string
  }]
  meta:{
    found:number
  }
  
}
export const getAllNews = createAsyncThunk(
  'news/fetchCategory',
  async  ({  country,page,category }: {  country: string,page:number,category:string}) => {
    console.log(category,"CATRGORY")
     const response = await axios.get(`https://api.thenewsapi.com/v1/news/top?api_token=EJaDyBnUilJ5irQJxSNhsBlSg3EExpiR3qjmeokM&locale=${country}&limit=3&categories=${category}&page=${page}`);
    console.log(response,"response")
    return response.data as AllNewsInterface;
  }
);