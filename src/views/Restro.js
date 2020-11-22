/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Table from './../components/table/Table';
import Pagination from './../components/pagination/Pagination';
import StateFilter from './../components/StateFilter';
export default function Restro() {
  const cols = [
    { header: 'Name', name: 'name' },
    { header: 'City', name: 'city' },
    { header: 'State', name: 'state' },
    { header: 'Phone Number', name: 'telephone' },
    { header: 'Genre', name: 'genre' },
  ];
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [filterState, setFilterState] = useState([]);

  const genre = ['Steak', 'American', 'Contemporary', 'Seafood', 'Cafe'];

  useEffect(() => {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setData(json);
        setFilteredData(json);
      });
  }, []);

  useEffect(() => {
    const indexOfLastData = currentPage * perPage;
    const indexOfFirstData = indexOfLastData - perPage;
    setPaginatedData(filteredData.slice(indexOfFirstData, indexOfLastData));
  }, [currentPage, perPage, filteredData]);

  useEffect(() => {
    if (filterState.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((v) => {
          return filterState.includes(v.state);
        })
      );
    }
  }, [filterState, data]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStateChecked = (state, checked) => {
    console.log(state, checked);
    let filter = [];
    if (checked) {
      filter = [...filterState, state];
    } else {
      filter = filterState.filter((i) => {
        return i !== state;
      });
    }
    setFilterState(filter);
  };
  return (
    <div>
      <Table cols={cols} rows={paginatedData} />
      <Pagination
        total={filteredData.length}
        perPage={10}
        handlePageClick={handlePageClick}
      />
      <StateFilter handleStateChecked={handleStateChecked} />
    </div>
  );
}
