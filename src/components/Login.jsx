import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log("res>>>", res.data);
    } catch (err) {
      console.error("login error ", err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="floating-label my-2">
              <span>Email ID</span>
              <input
                type="text"
                placeholder="mail@site.com"
                className="input input-md outline outline-1 outline-neutral text-base-content"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="floating-label my-5">
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-md outline outline-1 outline-neutral text-base-content"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
