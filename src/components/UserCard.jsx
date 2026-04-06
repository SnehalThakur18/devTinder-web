import React from "react";

const UserCard = ({ user }) => {
  console.log("user data: ", user);
  const { firstName, lastName, about, gender, age, photoUrl } = user;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Profile Picture" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age || gender ? <p>{age + ", " + gender}</p> : null}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ingnore</button>
          <button className="btn btn-secondary">Interesed</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
