export interface  NewsType {
      title: string;
  published_at: string;
  source: string;
  image_url: string;
  content:string
  uuid:string
  snippet:string
  url:string
}

export interface HaedlineType {
  articles:[{
   title:string
  }]
}


export interface stateInterface {
  data: {
    news: {
      newsData: NewsType[];
      error: null | string;
    };
    loading: string;
    totalResults: number;
    currPage: number;
    searching: boolean;
    searchTerm: string;
  };
}
export interface  AllNewsInterface {
  data:[{
    title: string;
  published_at: string;
  source: string;
  image_url:string
  content:string
  uuid:string
  snippet:string
  url:string
  }]
  meta:{
    found:number
  }
  
}