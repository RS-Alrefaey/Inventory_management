import type React from "react";

type kpiCard = {
    title : string,
    value : number,
    icon : React.ReactNode
}
const KpiCard = (
  {title,
  value,
  icon} : kpiCard
) => {
  return (
    <>
      <div className="rounded-lg bg-white p-6 shadow-md flex dark:shadow-sm gap-4 items-center dark:bg-slate-800 dark:shadow-slate-700">
        {icon}
        <div className="flex flex-col">
          <span className="text-xl font-medium dark:text-slate-300">{value}</span>
          <span className="dark:text-slate-300">{title}</span>
        </div>
      </div>
    </>
  );
};

export default KpiCard;
