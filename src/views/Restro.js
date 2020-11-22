import React, { useEffect, useState } from 'react';
import Table from './../components/table/Table';
import Pagination from './../components/pagination/Pagination';
export default function Restro() {
  const cols = [
    { header: 'Name', name: 'name' },
    { header: 'City', name: 'city' },
    { header: 'State', name: 'state' },
    { header: 'Phone Number', name: 'telephone' },
    { header: 'genre', name: 'genre' },
  ];
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);


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

  useEffect(()=>{
    const indexOfLastData = currentPage * perPage;
    const indexOfFirstData = indexOfLastData - perPage;
    setPaginatedData(filteredData.slice(indexOfFirstData, indexOfLastData));
  },[currentPage, perPage, filteredData])

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <Table cols={cols} rows={paginatedData} />
      <Pagination
        total={data.length}
        perPage={10}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}
