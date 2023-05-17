import React from "react";
import "./CategoryItem.scss";

import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="categoryItem">
      <Link to={`/`}>
        <img src={item.img} alt="" />
        <div className="info">
          <h1 className="title">{item.title}</h1>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
