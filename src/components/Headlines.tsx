import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLatestNews } from "../reducers/getLatestNews";
import { useAppSelector, useAppDispatch } from "../hooks";
import { HaedlineType } from "../types";
import { useSelector } from "react-redux";

interface stateInterface {
  data: {
    headlines: {
      headlineData: HaedlineType[];
      error: null | string;
    };
    loading: string;
  };
}
const Headlines = () => {
  const dispatch = useAppDispatch();
  const { headlines, loading } = useSelector(
    (state: stateInterface) => state.data
  );
  useEffect(() => {
    if (headlines.error === null && !loading) {
      // dispatch(fetchLatestNews({ country: "in" }));
    }
  }, [dispatch, fetchLatestNews]);
  console.log(headlines, "haedline");
  if (loading) return <div>Loading .....</div>;
  if (headlines.error) return <div>{headlines.error}</div>;
  return (
    <div className="w-full h-[70px] bg-[#C31815] text-white mt-[60px] ">
      {headlines?.headlineData[0]?.title}
    </div>
  );
};

export default Headlines;
