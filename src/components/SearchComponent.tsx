import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { searchNews } from "../reducers/SearchNews";

const SearchComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="backdrop bg-pink fixed w-screen h-screen ">
      <input
        /* @ts-ignore */
        onChange={(e) => dispatch(searchNews({ searchWord: e.target.value }))}
      />
    </div>
  );
};

export default SearchComponent;
