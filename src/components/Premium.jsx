import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const PremiumCard = ({
  title,
  price,
  badge,
  features,
  unavailableFeatures,
  buttonText,
  onBuyClick,
}) => (
  <div className="card w-96 bg-base-100 shadow-sm h-full min-h-[500px] flex flex-col">
    <div className="card-body flex flex-col flex-1">
      {badge && <span className="badge badge-xs badge-warning">{badge}</span>}
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <span className="text-xl">{price}</span>
      </div>
      <ul className="mt-6 flex flex-col gap-2 text-xs flex-1">
        {features.map((feature) => (
          <li key={feature}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 me-2 inline-block text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
        {unavailableFeatures &&
          unavailableFeatures.map((feature) => (
            <li className="opacity-50" key={feature}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">{feature}</span>
            </li>
          ))}
      </ul>
      <div className="mt-6">
        <button className="btn btn-primary btn-block" onClick={onBuyClick}>
          {buttonText}
        </button>
      </div>
    </div>
  </div>
);

const premiumData = [
  {
    title: "Silver Membership",
    price: "INR300/mo",
    badge: "Popular",
    features: [
      "View unlimited developer profiles",
      "Send up to 10 connection requests per day",
      "Access to basic chat features",
      "See who viewed your profile",
      "Save favorite profiles",
    ],
    unavailableFeatures: [
      "Priority profile boosting",
      "Advanced search filters",
      "Unlimited connection requests",
      "Access to exclusive developer events",
      "Profile verification badge",
    ],
    buttonText: "Buy Silver",
    membershipType: "Silver",
  },
  {
    title: "Gold Membership",
    price: "INR700/mo",
    badge: "Best Value",
    features: [
      "All Silver features included",
      "Unlimited connection requests",
      "Priority profile boosting",
      "Advanced search filters (by skills, location, etc.)",
      "Access to exclusive developer events",
      "Profile verification badge",
      "Direct messaging without connection",
      "Early access to new features",
    ],
    unavailableFeatures: ["Personalized career coaching"],
    buttonText: "Buy Gold",
    membershipType: "Gold",
  },
];

const handleBuyClick = async (membershipType) => {
  // Replace this with your payment or navigation logic
  alert(`You have selected the ${membershipType} membership!`);
  const order = await axios.post(
    BASE_URL + "/payment/create",
    { membershipType },
    { withCredentials: true },
  );
  const { amount, keyId, currency, notes, orderId } = order.data;
  const options = {
    key: keyId,
    amount,
    currency,
    name: "DevTinder Premium",
    description: "Purchase " + membershipType + " Membership",
    order_id: orderId,
    prefill: {
      name: notes.firstName + " " + notes.lastName,
      email: notes.email,
      contact: 23232323,
    },
    theme: {
      color: "#f37254",
    },
  };

  const rzp = new window.Razorpay(options);

  rzp.open();
};

const Premium = () => {
  return (
    <div className="flex flex-row justify-center gap-8 mt-16 mb-16 items-stretch">
      {premiumData.map((data) => (
        <PremiumCard
          key={data.title}
          {...data}
          onBuyClick={() => handleBuyClick(data.membershipType)}
        />
      ))}
    </div>
  );
};

export default Premium;
