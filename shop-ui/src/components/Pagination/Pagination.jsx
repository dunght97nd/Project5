import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import React from "react";
import "./pagination.scss";

const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => {
    page > 1 ? setPage(page - 1) : setPage(1);
    window.scroll(0, 0);
  };
  const handleNext = () => {
    page < totalPages ? setPage(page + 1) : setPage(totalPages);
    window.scroll(0, 0);
  };
  return (
    <div className="pagination">
      <NavigateBefore
        className={`btn ${page === 1 ? "disabled" : ""}`}
        onClick={handlePrev}
      >
        Prev
      </NavigateBefore>
      <ul className="list">
        {totalPages > 0 &&
          [...Array(totalPages)].map((item, index) => (
            <li
              key={index}
              className={`item ${index + 1 === page ? "active" : ""}`}
              onClick={() => {
                setPage(index + 1);
                window.scroll(0, 0);
              }}
            >
              {index + 1}
            </li>
          ))}
      </ul>
      <NavigateNext
        className={`btn ${page === totalPages ? "disabled" : ""}`}
        onClick={handleNext}
      >
        Next
      </NavigateNext>
    </div>
  );
};

export default Pagination;
