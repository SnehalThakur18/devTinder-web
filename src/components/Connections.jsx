import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const fetchConnections = async () => {
    if (connections) return;
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading || !connections) {
    return (
      <div className="flex flex-col gap-4 my-10 px-4 items-center">
        {[1,2,3].map((i) => (
          <div key={i} className="flex flex-col sm:flex-row m-4 p-4 rounded-lg bg-base-200 w-full sm:w-3/4 lg:w-1/2 mx-auto items-center gap-4 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-base-300" />
            <div className="flex-1 mx-4">
              <div className="h-6 bg-base-300 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-base-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
            </div>
            <div className="btn btn-primary btn-disabled w-20 h-10"></div>
          </div>
        ))}
      </div>
    );
  }

  if (connections.length === 0) return <h1 className="text-center my-10"> No Connections Found</h1>;

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-black text-xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row m-4 p-4 rounded-lg bg-base-300 w-full sm:w-3/4 lg:w-1/2 mx-auto items-center gap-4"
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
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
