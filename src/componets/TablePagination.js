import React, { useState, useEffect } from "react";
import "./pagination.css";

const TablePagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);
  

  const numberOfButtons = Math.ceil(total / showPerPage);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };

  return (
    <nav className="container">
      <ul>
        <li>
          <button onClick={() => onButtonClick("prev")}>Previous</button>
        </li>
        {new Array(numberOfButtons).fill("").map((el, index) => (
          <li className={`${index + 1 === counter ? "active" : null}`}>
            <button onClick={() => setCounter(index + 1)}>{index + 1}</button>
          </li>
        ))}
        <li>
          <button onClick={() => onButtonClick("next")}>Next</button>
        </li>
      </ul>
      <div className="pageNumber">
          {`Page ${counter} of ${numberOfButtons}`}
      </div>
    </nav>
  );
};

export default TablePagination;
