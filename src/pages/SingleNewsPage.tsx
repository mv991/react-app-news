import React from "react";
import { useLocation } from "react-router-dom";

const SingleNewsPage = () => {
  const location = useLocation();
  const data = location.state.state;
  console.log(data);
  return (
    <div className="w-[87%] h-fit mx-auto my-[100px]">
      <img
        src={data.urlToImage}
        alt="news-img"
        className="w-full min-h-[300px] max-w-full"
      />
      <h1 className="mt-8 font-poppins text-4xl mb-8">{data.title}</h1>
      <p className="my-3">{data.description}</p>
      <p>{data.snippet}</p>
    </div>
  );
};

export default SingleNewsPage;
