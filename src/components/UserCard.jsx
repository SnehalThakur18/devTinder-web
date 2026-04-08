import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = React.memo(({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, about, gender, age, photoUrl } = user;

  const handleSendRequest = async (status, userId) => {
    await axios.post(
      BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true },
    );
    dispatch(removeUserFromFeed(userId));
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm h-auto min-h-[220px]">
      <figure>
        <img
          src={photoUrl || null}
          alt="Profile"
          loading="lazy"
          decoding="async"
          style={{
            objectFit: "cover",
            maxHeight: 320,
            width: "100%",
            borderRadius: "0.5rem",
            filter: "brightness(0.98)",
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age || gender ? (
          <p className="mb-0 leading-tight">{age + ", " + gender}</p>
        ) : null}
        <p className="mt-1">{about}</p>
        <div className="card-actions justify-center my-3">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
});

export default UserCard;
