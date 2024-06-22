import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { saveArticles } from "../slices/newsSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
interface props {
  title: string;
  source: string;
  urlToImage: string;
  uuid: string;
  description: string;
}

const NewsCard = ({ urlToImage, title, source, uuid, description }: props) => {
  const dispatch = useDispatch<AppDispatch>();
  // @ts-ignore
  const { saved } = useSelector((state) => state.data);
  const [save, setSave] = useState(false);
  console.log(saved);
  return (
    <div className="w-full-[430px] max-w-[400px] sm:m-0 mx-auto my-3 rounded-md  shadow-md bg-white">
      <Link
        to={"/news/id"}
        state={{ state: { urlToImage, title, source, description } }}
        className="sm:w-[370px] w-[85%]"
      >
        <img
          alt="news-img"
          className="w-full h-[200px] object-cover "
          src={urlToImage}
        />
        <div className="w-full  h-[170px] px-4 mt-2">
          <h1 className="text-lg font-bold ">{title}</h1>
          <p>Source: {source}</p>
        </div>
      </Link>
      <div className="w-full border-t-[0.1px] h-[50px] border-[#b5b5b5] flex gap-4 items-center justify-center">
        <svg
          width="28"
          height="24"
          viewBox="0 0 13 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 16H1C0.447 16 0 15.553 0 15.001V5C0 4.448 0.447 4 1 4H2.5V5H1.5C1.224 5 1 5.225 1 5.5V14.5C1 14.777 1.224 15.001 1.5 15.001H11.5C11.775 15.001 12 14.777 12 14.5V5.5C12 5.225 11.775 5 11.5 5H10.5V4H12C12.552 4 13 4.448 13 5V15.001C13 15.553 12.552 16 12 16ZM8.66602 3.35693L7 1.69092V11.5C7 11.776 6.775 12 6.5 12C6.224 12 6 11.776 6 11.5V1.69092L4.33301 3.35693C4.14301 3.54793 3.83294 3.54793 3.64294 3.35693C3.45294 3.16793 3.45294 2.85697 3.64294 2.66797L6.11304 0.196899C6.11604 0.192899 6.122 0.191012 6.125 0.187012C6.136 0.174012 6.13204 0.154968 6.14404 0.141968C6.16304 0.123968 6.18996 0.129967 6.20996 0.115967C6.28396 0.0559668 6.36995 0.0149346 6.47095 0.00793457C6.47895 0.00793457 6.48604 0.00292969 6.49304 0.00292969C6.49604 0.00292969 6.49798 0 6.50098 0C6.50398 0 6.50603 0.00192969 6.50903 0.00292969C6.51503 0.00192969 6.51902 0.00598145 6.52502 0.00598145C6.64402 0.0119814 6.75196 0.0589346 6.83496 0.132935C6.84196 0.139935 6.85301 0.136944 6.85901 0.142944C6.86501 0.150944 6.86202 0.161969 6.86902 0.167969C6.87302 0.171969 6.87198 0.179937 6.87598 0.184937L9.35803 2.66797C9.54903 2.85697 9.54903 3.16793 9.35803 3.35693C9.16603 3.54893 8.85702 3.54893 8.66602 3.35693Z"
            fill="#2A2A2A"
          />
        </svg>
        {/* @ts-ignore */}

        {saved.some((item) => item.data.uuid === uuid) || save ? (
          <svg
            width="28"
            height="20"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 16C9 16 0 7.64952 0 4.68445C0 1.52744 1.64587 0 5.0625 0C6.75 0 9 2.5811 9 2.5811C9 2.5811 11.25 0 12.9375 0C16.3541 0 18 1.52644 18 4.68445C18 7.64952 9 16 9 16Z"
              fill="#C31815"
            />
          </svg>
        ) : (
          <svg
            width="28"
            height="23"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1"
            onClick={() => {
              setSave(true);
              dispatch(
                saveArticles({ data: { urlToImage, title, source, uuid } })
              );
            }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5 12L0 16V1C0 0.447715 0.447715 0 1 0H9C9.55228 0 10 0.447715 10 1V16L5 12ZM9 2C9 1.44772 8.55229 1 8 1H2C1.44772 1 1 1.44772 1 2V14L5 10.5L9 14V2Z"
              fill="#2A2A2A"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
