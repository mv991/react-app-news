import React from "react";
interface props {
  title: string;
  description: string;
  source: string;
  urlToImage: string;
}
const MainNews = ({ urlToImage, title, description, source }: props) => {
  return (
    <div>
      <div className="w-[80%] gap-12 m-auto flex md:flex-row flex-col h-fit mt-8 font-poppins">
        <div className="md:w-[45%] w-full h-fit min-h-[330px] flex ">
          <img
            src={urlToImage}
            className="bg-cover w-full h-auto object-center object-cover"
            alt="news-img"
          />
        </div>
        <div className="md:w-[55%] w-full flex flex-col  justify-center">
          <p className="text-[#C31815] mb-3 font-bold font-poppins leading-2">
            Trending
          </p>
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <h1 className="tracking-[2px]">{description}</h1>
          <p className="text-[#2A2A2A] font-light mt-6">Source: {source}</p>
          <p className="text-[#2A2A2A] font-light mt-1">Date: {source}</p>
        </div>
      </div>
    </div>
  );
};

export default MainNews;
