import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import NavBar from "./NavBar";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const location = useLocation();

  const fetchUserData = async () => {
    // if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      if (res.data.status === "success") {
        dispatch(addUser(res.data.data));
      } else {
        console.error("Failed to fetch user data: ", res.data.message);
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user data: ", err);
    }
  };

  useEffect(() => {
    if (
      !userData &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      fetchUserData();
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
