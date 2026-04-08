import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    if (requests) return;
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    await axios.post(
      BASE_URL + "/request/review/" + status + "/" + requestId,
      {},
      { withCredentials: true },
    );
    dispatch(removeRequest(requestId));
  };

  if (loading || !requests) {
    return (
      <div className="flex flex-col gap-4 my-10 px-4 items-center">
        {[1,2,3].map((i) => (
          <div key={i} className="flex flex-col sm:flex-row justify-between m-4 p-4 rounded-lg bg-base-200 w-full sm:w-3/4 lg:w-2/3 mx-auto items-center gap-4 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-base-300" />
            <div className="flex-1 mx-4">
              <div className="h-6 bg-base-300 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-base-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
            </div>
            <div className="flex gap-2">
              <div className="btn btn-primary btn-disabled w-20 h-10"></div>
              <div className="btn btn-secondary btn-disabled w-20 h-10"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (requests.length === 0)
    return <h1 className="text-center my-10">No Requests Found</h1>;

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-black text-xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row justify-between m-4 p-4 rounded-lg bg-base-300 w-full sm:w-3/4 lg:w-2/3 mx-auto items-center gap-4"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl || null}
              />
            </div>
            <div className="text-center sm:text-left mx-4 flex-1">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
