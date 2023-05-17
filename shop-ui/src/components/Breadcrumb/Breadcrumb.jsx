import React from "react";
import "./Breadcrumb.scss";

const Breadcrumb = ({ crumbs, selected }) => {
  const isLast = (index) => {
    return index === crumbs.length - 1;
  };
  return (
    <div className="breadcrumb">
      <ol>
        {crumbs.map((crumb, ci) => {
          const disabled = isLast(ci) ? "disabled" : "";
          return (
            <li key={ci}>
              <button
                className={`btn ${disabled}`}
                onClick={() => selected(crumb)}
              >
                {crumb}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumb;
