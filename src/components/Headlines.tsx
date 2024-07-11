import React, { useEffect, useState } from "react";
import { setInterval } from "timers/promises";

interface props {
  headlines: [{ title: string }];
}
const Headlines = ({ headlines }: props) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval: any = window.setInterval(() => {
      if (index < 19) {
        console.log("ran", index);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setIndex(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);
  useEffect(() => {
    console.log(index);
  }, [index]);

  return (
    <div className="w-full sm:h-[70px] h-fit bg-[#C31815] text-white mt-[60px] flex items-center justify-start gap-4 ">
      <button className="bg-white py-3 px-4 w-[200px] text-black ml-8">
        Breaking News
      </button>{" "}
      {headlines[index]?.title}
    </div>
  );
};

export default Headlines;
