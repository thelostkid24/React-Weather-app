import React from "react";

const Forecast = ({ title, data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div>
        <p className="font-medium uppercase">{title}</p>
        <hr className="my-1" />
        <p className="text-center">No forecast data available.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />

      <div className="flex items-center justify-between">
        {data.map((d, index) => (
          <div
            key={d.time || index} // Use a unique key if available
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light text-sm">{d.title}</p>
            <img
              src={d.icon}
              alt={`${d.title} weather icon`} // More descriptive alt text
              className="w-12 my-1"
            />
            <p className="font-medium">{`${d.temp?.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;