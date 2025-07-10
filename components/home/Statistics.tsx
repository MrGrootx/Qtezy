import React from "react";
import CountUp from "../reactbits/CountUp";

const Statistics = () => {
  const statistics = [
    { label: "Quotes", value: 10 },
    { label: "Users", value: 100 },
    { label: "Likes", value: 200 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center p-6">
      {statistics.map((stat) => (
        <div key={stat.label}>
          <h3 className="text-5xl font-semibold" style={{ fontFamily: "Pacifico, cursive" }}>
            <CountUp
              from={0}
              to={stat.value}
              separator=","
              direction="up"
              duration={1}
              startWhen={true}
              className="count-up-text"
            />+
          </h3>
          <span className="text-md text-gray-300/50" style={{
            fontFamily: "Pacifico, cursive"
          }}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
