import React from "react";

import { Link } from "react-router-dom";

import { NewsType } from "../types";
import {
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
type NewsCardProps = NewsType & {
  url: string;
  newsTitle: string;
};
const NewsCard = ({
  image_url,
  title,
  source,
  uuid,
  published_at,
  snippet,
  url,
  newsTitle,
}: NewsCardProps) => {
  function convertTimestampToDate(timestamp: any) {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  return (
    <div className="w-full sm:h-[580px] h-fit shadow-2xl  max-w-[400px] sm:m-0 mx-auto my-3 rounded-md   bg-white">
      <Link to={url} target="_blank" className="sm:w-[370px] w-[85%]">
        <img
          alt="news-img"
          className="w-full h-[200px] object-cover "
          src={image_url}
        />
        <div className="w-full flex flex-col sm:h-[320px]  gap-4 px-4 mt-2">
          <h1 className="text-lg font-bold ">{title}</h1>
          <p className="font-medium ">
            Published at:{" "}
            <span className="ml-2 font-normal ">
              {convertTimestampToDate(published_at)}
            </span>{" "}
          </p>
          <p>
            <span>{snippet}</span>
          </p>
          <button className="bg-red-600 p-2 hover:scale-110 mt-auto text-white rounded-md font-medium mb-6 tracking-[1px] w-[80%] mx-auto ">
            View Full Article
          </button>
        </div>
      </Link>
      <div className="w-full border-t-[0.1px] h-[50px] border-[#b5b5b5] flex items-center justify-center">
        <div className="share-buttons flex gap-4 items-center justify-center">
          <TwitterShareButton url={url} title={newsTitle}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <LinkedinShareButton url={url} title={newsTitle}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <WhatsappShareButton url={url} title={newsTitle}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <EmailShareButton
            url={url}
            subject={newsTitle}
            body="Check this out!"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
