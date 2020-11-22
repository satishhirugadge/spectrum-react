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

  const [data, setData] = useState([])
  
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
      });
  }, []);

  return (
    <div>
      <Table cols={cols} rows={data} />
    </div>
  );
}
