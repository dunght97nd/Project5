import React, { useState } from "react";
import "./Filter.scss";

const Filter = ({
  cat,
  setSort,
  color,
  setFilterColor,
  size,
  setFilterSize,
  setPage,
}) => {
  const handleSort = (e) => {
    if (e.target.value === "price-asc") {
      setSort({ sort: e.target.value.split("-")[0], order: 1 });
    } else {
      setSort({ sort: e.target.value, order: -1 });
    }
    setPage(1);
  };
  const handleFilterColor = (e) => {
    setFilterColor([e.target.value]);
    setPage(1);

    // if (input.checked) {
    // 	const state = [...filterGenre, input.value];
    // 	setFilterGenre(state);
    // } else {
    // 	const state = filterGenre.filter((val) => val !== input.value);
    // 	setFilterGenre(state);
    // }
  };

  const handleFilterSize = (e) => {
    setFilterSize([e.target.value]);
    setPage(1);
  };
  return (
    <div className="filterList">
      <div className="filterItem">
        <span className="filterText">Bộ lọc sản phẩm:</span>
        <select name="color" defaultValue="" onChange={handleFilterColor}>
          <option value="">All Color</option>
          {color?.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>

        <select name="size" onChange={handleFilterSize}>
          <option value="">All Size</option>
          {cat === "shirts" || cat === "shirt" || cat === "sweater"
            ? size?.sizeShirt?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))
            : size?.sizePants?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
        </select>
      </div>
      <div className="filterItem">
        <span className="filterText">Sắp xếp sản phẩm:</span>
        <select onChange={handleSort}>
          <option value="createdAt">Mới nhất</option>
          <option value="sold">Bán nhiều nhất</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price">Giá giảm dần</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
