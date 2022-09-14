import React from "react";
import { Link } from "react-router-dom";

const PaginationRestaurant = (props) => {
  const { page, pages, keyword = "" } = props;
  return (
    pages > 1 && (
      <nav className="float-end mt-4" aria-label="Page navigation">
        <ul className="pagination">
          {[...Array(pages).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === page ? "active" : ""}`}
              key={x + 1}
            >
              <Link
                className="page-link"
                to={
                  keyword
                    ? `/search-restaurant/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                }
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default PaginationRestaurant;
