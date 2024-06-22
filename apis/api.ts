import axios from "axios"
export const getNews = async({country,category,page,pageSize}:{country:string,category:string,page:number,pageSize:number}) => {
   const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize} `);
   return response;
}
