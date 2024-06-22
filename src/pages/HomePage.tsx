import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import MainNews from "../components/MainNews";
import NewsCard from "../components/NewsCard";
import Headlines from "../components/Headlines";
import { NewsType } from "../types";
import { getAllNews } from "../reducers/GetCatlNews";

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
  };
}

const GeneralPage = () => {
  const [pages, setPages] = useState<null | number>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { news, loading, totalResults, currPage, searching } = useSelector(
    (state: stateInterface) => state.data
  );

  useEffect(() => {
    if (!searching) {
      dispatch(getAllNews({ page: 1, country: "in", category: "general" }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (totalResults) {
      const noOfPages = Math.ceil(totalResults / 3);
      setPages(noOfPages);
    }
  }, [totalResults]);

  const handlePageClick = useCallback(
    (page: number) => {
      dispatch(getAllNews({ page, country: "in", category: "general" }));
    },
    [dispatch]
  );

  const renderNumbers = useCallback(() => {
    let elements = [];
    if (pages !== null) {
      for (let i = 1; i <= 10; i++) {
        elements.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className="px-2 py-1 m-1 bg-gray-200 rounded"
          >
            {i}
          </button>
        );
      }
    }
    return elements;
  }, [pages, handlePageClick]);
  if (loading) {
    <div className="w-screen h-screen text-2xl font-bold flex items-center justify-center">
      Loading...
    </div>;
  }

  if (news.error && !searching) return <p>{news.error}</p>;

  return (
    <div className="w-full gap-12 h-fit mt-8 font-poppins">
      <h1 className="text-2xl font-bold mb-4 ml-[10%]">Top Stories</h1>
      {news.newsData.length > 0 && (
        <MainNews
          title={news.newsData[0]?.title}
          description={news.newsData[0]?.description}
          urlToImage={news.newsData[0]?.image_url}
          source={news.newsData[0]?.source_url}
        />
      )}
      <Headlines />
      <div className="w-full flex flex-wrap gap-4 justify-center mt-12">
        {news.newsData.length > 0 &&
          news.newsData.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              urlToImage={article.image_url}
              source={article?.source_url}
              uuid={article.uuid}
              description={article?.description}
            />
          ))}
      </div>
      <div className="w-[80%] gap-12 max-w-[80%] mx-auto flex-wrap mt-12 justify-center flex mb-12">
        {renderNumbers()}
      </div>
    </div>
  );
};

export default GeneralPage;
