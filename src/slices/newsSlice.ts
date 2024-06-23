// src/features/news/newsSlice.js
import { createSlice } from '@reduxjs/toolkit';

import { fetchLatestNews } from '../reducers/getLatestNews';
import { getAllNews } from '../reducers/GetCatlNews';
import { NewsType ,HaedlineType} from '../types';
import { searchNews } from '../reducers/SearchNews';






interface NewsArticle {
  newsData:NewsType[]
  error:null | string,
  
}
interface Headlines {
  headlineData :HaedlineType[]
  error:  null | string;
 
}
interface NewsState {
news: NewsArticle;
headlines:Headlines,
loading: boolean,
currPage:number
country:string
totalResults:number | null
searching:boolean
searchTerm:string
saved:NewsArticle[]

}
const initialState: NewsState = {
  news: { error: null, newsData: [] },
  headlines: { error: null, headlineData: [] },
  loading:true,
  currPage:1,
  country:"in",
  totalResults:null,
  searching:false,
  searchTerm:"",
    saved: (() => {
    try {
      const savedNews = localStorage.getItem("news");
      return savedNews ? JSON.parse(savedNews) : [];
    } catch (error) {
      console.error("Failed to parse saved news from localStorage:", error);
      return [];
    }
  })()

 
};
const newsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSearch: (state, action) => {
       state.searching = action.payload.searching;
       state.searchTerm = action.payload.searchTerm;
       state.currPage = 1

    },
    saveArticles:(state, action) => {
      // @ts-ignore
     let existingEntries = JSON.parse(localStorage.getItem("news"));
    if(existingEntries == null) existingEntries = [];
      existingEntries.push(action.payload);

       localStorage.setItem("news", JSON.stringify(existingEntries));

    },
    setCurrPage:(state, action) => {
      state.currPage = action.payload
    }

  },
  extraReducers: (builder) => {

      builder.addCase(fetchLatestNews.pending,(state,action) => {
         state.loading = true;
      });
      builder.addCase(fetchLatestNews.fulfilled,(state,action) => {
        state.loading = false;
        state.headlines.headlineData = action.payload
  
      });
      builder.addCase(fetchLatestNews.rejected,(state,action) => {
         state.loading = false;
         state.headlines.error = action.error.message || 'Something went wrong'
          ;
      })
      builder.addCase(getAllNews.fulfilled,(state,action) => {
         state.loading = false;
         state.news.newsData = action.payload.data;
         state.totalResults = action.payload.meta.found
      
      })
      builder.addCase(getAllNews.pending,(state,action) => {
         state.loading = true;
       
      })
      builder.addCase(getAllNews.rejected,(state,action) => {
         state.loading = false;
         state.news.error = action.error.message || 'Something went wrong'
 
      })

        builder.addCase(searchNews.fulfilled,(state,action) => {
   
         state.loading = false;
         state.news.newsData = action.payload.data;
         state.totalResults = action.payload.meta.found
    
      
      })
      builder.addCase(searchNews.pending,(state,action) => {
         state.loading = true;
         
       
      })
      builder.addCase(searchNews.rejected,(state,action) => {
         state.loading = false;
         state.news.error = action.error.message || 'Something went wrong'
 
      })
      
  },
});

 export const {setSearch,saveArticles,setCurrPage} =  newsSlice.actions;
 export default newsSlice.reducer;
