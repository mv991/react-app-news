export interface  NewsType {
      title: string;
  description: string;
  source_url: string;
  image_url: string;
  content:string
  uuid:string
}

export interface HaedlineType {
  title:string
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