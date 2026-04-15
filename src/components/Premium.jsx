import React from "react";

const PremiumCard = ({
  title,
  price,
  badge,
  features,
  unavailableFeatures,
  buttonText,
}) => (
  <div className="card w-96 bg-base-100 shadow-sm h-full">
    <div className="card-body flex flex-col h-full">
      {badge && <span className="badge badge-xs badge-warning">{badge}</span>}
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <span className="text-xl">{price}</span>
      </div>
      <ul className="mt-6 flex flex-col gap-2 text-xs flex-1">
        {features.map((feature, idx) => (
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
          unavailableFeatures.map((feature, idx) => (
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
        <button className="btn btn-primary btn-block">{buttonText}</button>
      </div>
    </div>
  </div>
);

const premiumData = [
  {
    title: "Premium",
    price: "$29/mo",
    badge: "Most Popular",
    features: [
      "High-resolution image generation",
      "Customizable style templates",
      "Batch processing capabilities",
      "AI-driven image enhancements",
    ],
    unavailableFeatures: [
      "Seamless cloud integration",
      "Real-time collaboration tools",
    ],
    buttonText: "Subscribe",
  },
  {
    title: "Basic",
    price: "$9/mo",
    badge: "Best Value",
    features: ["Standard image generation", "Basic style templates"],
    unavailableFeatures: [
      "Batch processing capabilities",
      "AI-driven image enhancements",
      "Seamless cloud integration",
      "Real-time collaboration tools",
    ],
    buttonText: "Get Started",
  },
];

const Premium = () => {
  return (
    <div className="flex flex-row justify-center gap-8 mt-16 items-stretch">
      {premiumData.map((data, idx) => (
        <PremiumCard key={data.title} {...data} />
      ))}
    </div>
  );
};

export default Premium;
