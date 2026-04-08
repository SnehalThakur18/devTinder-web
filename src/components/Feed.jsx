import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { addFeed } from "../utils/feedSlice";

const Spinner = () => (
  <div className="flex justify-center items-center h-40">
    <span className="loading loading-spinner loading-lg text-primary" aria-label="Loading"></span>
  </div>
);

const CardSkeleton = () => (
  <div className="card bg-base-200 w-96 shadow-sm h-auto min-h-[220px] animate-pulse">
    <div className="h-[200px] bg-base-300 rounded-t"></div>
    <div className="card-body">
      <div className="h-6 bg-base-300 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-base-300 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-base-300 rounded w-full mb-4"></div>
      <div className="flex gap-4 justify-center">
        <div className="btn btn-primary btn-disabled w-20 h-10"></div>
        <div className="btn btn-secondary btn-disabled w-24 h-10"></div>
      </div>
    </div>
  </div>
);

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getFeed = async () => {
    if (feed) return;
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Error fetching feed: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line
  }, []);

  if (loading || !feed) {
    return (
      <div className="flex justify-center my-10 px-4">
        <CardSkeleton />
      </div>
    );
  }
  if (feed.length <= 0)
    return <h1 className="text-center my-10">No new users found!</h1>;
  return (
    <div className="flex justify-center my-10 px-4">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
