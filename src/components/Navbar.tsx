import React, { useCallback, useEffect, useState } from "react";
import { Categories } from "../config/config";
import { getAllNews } from "../reducers/GetCatlNews";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchComponent from "./SearchComponent";
import { searchNews } from "../reducers/SearchNews";
import { setSearch } from "../slices/newsSlice";
// @ts-ignore
import debounce from "lodash/debounce";
const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = location.pathname;
  const Heading = [
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  // Debounced fetch function
  const debouncedFetchArticles = useCallback(
    debounce(async (term: any) => {
      if (!term) {
        dispatch(setSearch({ searching: false, term }));
        dispatch(getAllNews({ page: 1, country: "in", category: pathname }));
        return;
      }

      dispatch(searchNews({ searchWord: term, page: 0 }));
    }, 1000),
    [] // Use an empty array to ensure the debounced function is only created once
  );
  useEffect(() => {
    // Call the debounced function with the current search term
    debouncedFetchArticles(searchTerm);

    // Cleanup function to cancel debounce if component unmounts or term changes
    return () => {
      debouncedFetchArticles.cancel();
    };
  }, [searchTerm, debouncedFetchArticles]);
  return (
    <>
      <div className="flex gap-8 w-full text-white h-[100px] items-center font-poppins bg-[#C31815] z-[2] px-8 ">
        <div className=" flex-wrap  lg:justify-evenly  justify-center w-[80%] text-lg font-semibold lg:flex hidden">
          {Categories.map((cat, index) => (
            <Link
              to={`/${Categories[index]}`}
              state={{ category: Categories[index] }}
            >
              <p
                className={`${
                  "/" + Categories[index] === pathname ? "underline" : ""
                }`}
              >
                {Heading[index]}
              </p>
            </Link>
          ))}
        </div>

        <svg
          width="32"
          height="36"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="lg:hidden block"
          onClick={() => setShow(true)}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.02453 1.69231H22.4259C22.8803 1.69231 23.249 1.31323 23.249 0.846154C23.249 0.379077 22.8803 0 22.4259 0H1.02453C0.571813 0 0.201405 0.379077 0.201405 0.846154C0.201405 1.31323 0.571813 1.69231 1.02453 1.69231ZM22.4259 6.76923H7.60957C7.15685 6.76923 6.78644 7.14831 6.78644 7.61538C6.78644 8.08246 7.15685 8.46154 7.60957 8.46154H22.4259C22.8803 8.46154 23.249 8.08246 23.249 7.61538C23.249 7.14662 22.8803 6.76923 22.4259 6.76923ZM22.4259 13.5367H1.02453C0.571813 13.5367 0.201405 13.9158 0.201405 14.3829C0.201405 14.8499 0.571813 15.229 1.02453 15.229H22.4259C22.8803 15.229 23.249 14.8499 23.249 14.3829C23.249 13.9158 22.8803 13.5367 22.4259 13.5367ZM22.4259 20.3077H10.079C9.62623 20.3077 9.25583 20.6868 9.25583 21.1538C9.25583 21.6209 9.62623 22 10.079 22H22.4259C22.8803 22 23.249 21.6209 23.249 21.1538C23.249 20.6868 22.8803 20.3077 22.4259 20.3077Z"
            fill="#F7F4F4"
          />
        </svg>

        <div className=" ml-auto flex items-center justify-end lg:w-[20%] w-fit">
          <svg
            width="20"
            height="26"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 shrink-0"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5 12L0 16V1C0 0.447715 0.447715 0 1 0H9C9.55228 0 10 0.447715 10 1V16L5 12ZM9 2C9 1.44772 8.55228 1 8 1H2C1.44772 1 1 1.44772 1 2V14L5 10.5L9 14V2Z"
              fill="white"
            />
          </svg>

          {showSearch ? (
            <input
              onChange={(e: any) =>
                //@ts-ignore

                {
                  setSearchTerm(e.target.value);
                  dispatch(
                    setSearch({ searching: true, searchTerm: searchTerm })
                  );
                }
              }
              className="p-2 rounded-md text-black"
              value={searchTerm}
            />
          ) : (
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-8"
              onClick={(e: any) => {
                setShowSearch(true);
              }}
            >
              <path
                d="M11.2923 20.2211C6.24673 20.2211 2.16223 16.127 2.16223 11.0911C2.16223 6.04553 6.24673 1.96105 11.2923 1.96105C16.3378 1.96105 20.4223 6.04553 20.4223 11.0911C20.4223 16.127 16.3378 20.2211 11.2923 20.2211ZM25.0642 24.1901L18.7501 17.8762C20.3839 16.079 21.3834 13.7051 21.3834 11.0911C21.3834 5.51695 16.8664 1 11.2923 1C5.71815 1 1.20117 5.51695 1.20117 11.0911C1.20117 16.6652 5.71815 21.1821 11.2923 21.1821C13.9064 21.1821 16.2802 20.173 18.0774 18.5489L24.3915 24.863C24.5741 25.0456 24.8816 25.0456 25.0642 24.863C25.2468 24.6708 25.2468 24.3727 25.0642 24.1901Z"
                fill="#F7F4F4"
                stroke="white"
                stroke-width="0.5"
              />
            </svg>
          )}
        </div>
      </div>
      {show && <Sidebar setShow={setShow} />}
    </>
  );
};

export default Navbar;
