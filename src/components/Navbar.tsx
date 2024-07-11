import React, { useCallback, useEffect, useState } from "react";
import { Categories } from "../config/config";
import { getAllNews } from "../reducers/GetCatlNews";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { searchNews } from "../reducers/SearchNews";
import { setSearch } from "../slices/newsSlice";
import { stateInterface } from "../types";
// @ts-ignore
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { category } = useParams();
  const { searching } = useSelector((state: stateInterface) => state.data);
  const Heading = [
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  const debouncedFetchArticles = useCallback(
    debounce(async (term: any) => {
      if (term.length === 0 && searching) {
        dispatch(setSearch({ searching: false, searchTerm: "" }));
        category &&
          dispatch(getAllNews({ page: 1, country: "in", category: category }));
        return;
      }

      term.length > 0 && dispatch(searchNews({ searchWord: term, page: 0 }));
    }, 1000),
    [searchTerm, searching] // Use an empty array to ensure the debounced function is only created once
  );
  useEffect(() => {
    // Call the debounced function with the current search term
    debouncedFetchArticles(searchTerm);

    // Cleanup function to cancel debounce if component unmounts or term changes
    return () => {
      debouncedFetchArticles.cancel();
    };
  }, [searchTerm, debouncedFetchArticles, searching]);
  return (
    <>
      <div className="flex gap-8 w-full text-white h-[100px] items-center font-poppins bg-[#C31815] z-[2] px-8 ">
        <div className=" flex-wrap  lg:justify-evenly  justify-center w-[80%] text-lg font-semibold lg:flex hidden">
          {Categories.map((cat, index) => (
            <Link
              to={`/${Categories[index]}`}
              onClick={() => {
                dispatch(setSearch({ searching: false }));
                setSearchTerm("");
              }}
            >
              <p
                className={`${
                  Categories[index] === category ? "underline" : ""
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

        <div className=" ml-auto flex items-center justify-end lg:w-[22%] w-fit">
          <input
            onChange={(e: any) =>
              //@ts-ignore

              {
                setSearchTerm(e.target.value);
                dispatch(
                  setSearch({ searching: true, searchTerm: e.target.value })
                );
              }
            }
            className="p-2 rounded-md text-black w-full pl-3"
            value={searchTerm}
            placeholder="Search News Stories"
          />
        </div>
      </div>
      {show && <Sidebar setShow={setShow} />}
    </>
  );
};

export default Navbar;
