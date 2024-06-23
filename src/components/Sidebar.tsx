import React from "react";
import { Categories } from "../config/config";
import { Link, useLocation } from "react-router-dom";
interface props {
  setShow: Function;
}
const Sidebar = ({ setShow }: props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const Heading = [
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];
  return (
    <div className="fixed left-0 h-screen flex flex-col gap-4 items-center pt-12 w-[200px] bg-white z-[4] top-0">
      <img
        src={"/cross.svg"}
        alt="cross"
        className="absolute w-[20px] right-3 top-3"
        onClick={() => setShow(false)}
      ></img>
          <Link
          to={`/`}
          
        >
          <p
            className={`${
              pathname==="/" ? "underline" : ""
            } text-lg text-[#C31815] font-[500]`}
          >
            {"Top Stories"}
          </p>
        </Link>
      {Categories.map((cat, index) => (
        <Link
          to={`/${Categories[index]}`}
          state={{ category: Categories[index] }}
        >
          <p
            className={`${
              "/" + Categories[index] === pathname ? "underline" : ""
            } text-lg text-[#C31815] font-[500]`}
          >
            {Heading[index]}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
