import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../reducers/GetCatlNews";
import { AppDispatch } from "../store";
import { NewsType } from "../types";
import { Link, useLocation } from "react-router-dom";
import MainNews from "../components/MainNews";
import NewsCard from "../components/NewsCard";
import { searchNews } from "../reducers/SearchNews";
import { setCurrPage } from "../slices/newsSlice";
import { useParams } from "react-router-dom";
interface stateInterface {
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
const CategoryNews = () => {
  const dispatch = useDispatch<AppDispatch>();

  const data = useParams();

  const [pages, setPages] = useState<null | number>(null);

  const { news, loading, totalResults, currPage, searching, searchTerm } =
    useSelector((state: stateInterface) => state.data);

  useEffect(() => {
    console.log("ran")
    if (!searching && data.category)
      dispatch(getAllNews({ page: 1, country: "in", category: data.category }));
  }, [dispatch,data.category]);

  useEffect(() => {
    if (totalResults) {
      const noOfPages = Math.ceil(totalResults / 3);
      setPages(noOfPages);
    }
  }, [totalResults]);

  const handlePageClick = useCallback(
    (page: number) => {
      searching
        ? dispatch(searchNews({ searchWord: searchTerm, page: page }))
        : data.category &&
          dispatch(getAllNews({ page, country: "in", category: data.category }));

      dispatch(setCurrPage(page));
    },
    [dispatch, searching, currPage]
  );

  const renderNumbers = useCallback(() => {
    let elements = [];
    if (pages !== null) {
      for (let i = 1; i <= 10; i++) {
        elements.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`px-2 py-1 m-1 bg-gray-200 rounded ${
              currPage === i && "text-red-700 underline"
            }`}
          >
            {i}
          </button>
        );
      }
    }
    return elements;
  }, [pages, handlePageClick]);
  if(loading)
    return (
      <div className="w-screen h-screen text-2xl font-bold flex items-center justify-center">
        Loading...
      </div>
    );
  if (news.error && !searching) return <p>{news.error}</p>;

  return (
    <div>
      <div className="w-full gap-12  h-fit mt-8 font-poppins">
        <h1 className="text-2xl font-bold mb-4 ml-[10%]">
          {searching ? "Search Results" : data.category}
        </h1>
        {news.newsData.length > 0 ? (
          <>
            <MainNews
              title={news.newsData[0]?.title}
              description={news.newsData[0]?.description}
              urlToImage={news.newsData[0]?.image_url}
              source={news.newsData[0]?.source_url}
            />

            <div className="w-full flex flex-wrap gap-4 justify-center mt-12">
              {news.newsData.map((article, index) => {
                return (
                  <NewsCard
                    key={index}
                    title={article.title}
                    urlToImage={article.image_url}
                    source={article?.source_url}
                    uuid={article?.uuid}
                    description={article?.description}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <h1 className="w-screen h-screen text-2xl font-bold flex items-center justify-center">
            No Data Available
          </h1>
        )}
        <div className="w-[80%] gap-x-12 max-w-[80%] h-fit mx-auto flex-wrap mt-12 justify-center flex md:mb-12 mb-3">
          {renderNumbers()}
        </div>
      </div>
    </div>
  );
};

export default CategoryNews;
