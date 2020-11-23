/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import RestroTable from '../components/table/RestroTable';
import SPagination from './../components/pagination/Pagination';
import StateFilter from './../components/StateFilter';
import GenreFilter from './../components/GenreFilter';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Restro() {
  const cols = [
    { header: 'Name', name: 'name' },
    { header: 'City', name: 'city' },
    { header: 'State', name: 'state' },
    { header: 'Phone Number', name: 'telephone' },
    { header: 'Genre', name: 'genre' },
  ];
  const [searchText, setSearchText] = useState('');
  const [searchButtonClick, setSearchButtonClick] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [filterState, setFilterState] = useState([]);
  const [filterGenre, setFilterGenre] = useState([]);

  useEffect(() => {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        json = json.map((v) => {
          let genreArray = v.genre.split(',');
          return { ...v, genreArray: genreArray };
        });
        setData(json);
        setFilteredData(json);
      });
  }, []);

  useEffect(() => {
    const indexOfLastData = currentPage * perPage;
    const indexOfFirstData = indexOfLastData - perPage;
    let slicedData = filteredData.slice(indexOfFirstData, indexOfLastData);
    setPaginatedData(slicedData);
  }, [currentPage, perPage, filteredData]);

  useEffect(() => {
    let finalData = data;
    let searchTextLower = searchButtonClick.toLowerCase();
    if (searchButtonClick !== '') {
      finalData = finalData.filter((v) => {
        return (
          v.city.toLowerCase().includes(searchTextLower) ||
          v.name.toLowerCase().includes(searchTextLower) ||
          v.genre.toLowerCase().includes(searchTextLower)
        );
      });
    }
    if (filterState.length !== 0) {
      finalData = finalData.filter((v) => {
        return filterState.includes(v.state);
      });
    }
    if (filterGenre.length !== 0) {
      finalData = finalData.filter((v) => {
        let common = v.genreArray.filter((value) =>
          filterGenre.includes(value)
        );
        return common.length > 0;
      });
    }
    setCurrentPage(1);
    setFilteredData(finalData);
  }, [filterState, data, filterGenre, searchButtonClick]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStateChecked = (state, checked) => {
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

  const handleGenreChecked = (genre, checked) => {
    let filter = [];
    if (checked) {
      filter = [...filterGenre, genre];
    } else {
      filter = filterGenre.filter((i) => {
        return i !== genre;
      });
    }
    setFilterGenre(filter);
  };
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchButtonClick(searchText);
  };

  const handleClearStateFilter = () => {
    setFilterState([]);
  };
  const style = {
    filter: {
      marginTop: 100,
    },
  };
  return (
    <Container>
      <Row>
        <Col md={4} style={style.filter}>
          <Row>
            <StateFilter
              handleStateChecked={handleStateChecked}
              handleClearStateFilter={handleClearStateFilter}
              filteredApplied={filterState}
            />
          </Row>
          <Row style={{ width: 250 }}>
            <Row>Filter by Genre:</Row>
            <GenreFilter handleGenreChecked={handleGenreChecked}></GenreFilter>
          </Row>
        </Col>
        <Col>
          <Row style={{ justifyContent: 'flex-end', margin: 10 }}>
            <input type='text' onChange={handleInputChange}></input>
            <Button onClick={handleSearchButtonClick}> Search</Button>
          </Row>
          <Row>
            <RestroTable cols={cols} rows={paginatedData} />
            {paginatedData.length < 1 && (
              <Row
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: 760,
                  height: 300,
                  marginLeft: 2,
                }}>
                {' '}
                <div>NO DATA</div>
              </Row>
            )}
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            <SPagination
              total={filteredData.length}
              perPage={10}
              currentPageNumber={currentPage}
              handlePageClick={handlePageClick}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
