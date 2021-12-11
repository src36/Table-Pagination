import React, { useState, useEffect } from "react";
import "./table.css";
import TablePagination from "./TablePagination";

const Table = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [showPerPage, setShowPerPage] = useState(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const getData = async () => {
    let response = await fetch("MOCK_DATA.json");
    let result = await response.json();
    setList(result);
  };

  useEffect(() => {
    getData();
  }, []);

  const currentData = list.slice(pagination.start, pagination.end);

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Search Name....."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Country</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentData
            .filter((value) => {
              if (search === "") {
                return value;
              } else if (
                value.first_name
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase())
              ) {
                return value;
              }
            })
            .map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
                <td>{item.country}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <TablePagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={list.length}
        />
      </div>
    </>
  );
};

export default Table;
