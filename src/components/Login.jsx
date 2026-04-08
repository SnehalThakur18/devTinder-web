import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontawesome';

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10 px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="floating-label my-4">
                  <span>First Name</span>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="input input-md w-full text-base-content focus:outline-none"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="floating-label my-4">
                  <span>Last Name</span>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="input input-md w-full text-base-content focus:outline-none"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="floating-label my-4">
              <span>Email ID</span>
              <input
                type="text"
                placeholder="mail@site.com"
                className="input input-md w-full text-base-content focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="floating-label my-4">
              <span>Password</span>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-md w-full text-base-content focus:outline-none pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <FontAwesomeIcon icon={showPassword ? 'eye-slash' : 'eye'} className="w-5 h-5" />
                </button>
              </div>
            </label>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => (isLoginForm ? handleLogin() : handleSignUp())}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
