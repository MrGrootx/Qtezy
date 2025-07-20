
import React from 'react'
import { BarChart2, CheckCircle2, Clock } from "lucide-react";




const DashboardStatitics = ({
  totalQuotes = 0,
  totalApproved = 0,
  totalPending = 0,
}: {
  totalQuotes?: number;
  totalApproved?: number;
  totalPending?: number;
}) => {
  const stats = [
    {
      label: "My Quotes",
      value: totalQuotes,
      icon: <BarChart2 className="w-6 h-6 text-blue-400" />,
      description: "Total quotes created",
    },
    {
      label: "Approved",
      value: totalApproved,
      icon: <CheckCircle2 className="w-6 h-6 text-green-400" />,
      description: "Total quotes approved",
    },
    {
      label: "Pending",
      value: totalPending,
      icon: <Clock className="w-6 h-6 text-yellow-400" />,
      description: "Quotes pending approval",
    },
  ];
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={[
            "relative w-full overflow-hidden rounded-lg border p-4 group transition-all duration-300   backdrop-blur-sm flex flex-col items-center justify-center",
            "border-gray-950/[.1] bg-gray-950/[.10] hover:bg-gray-950/[.05] shadow-md",
            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] dark:shadow-lg",
          ].join(" ")}
        >
          <div className="flex items-center gap-2 mb-2">
            {stat.icon}
            <span className="text-base font-medium text-gray-700 dark:text-gray-200">
              {stat.label}
            </span>
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">
            {stat.value}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStatitics