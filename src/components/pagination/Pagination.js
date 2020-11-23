import Pagination from 'react-bootstrap/Pagination'

function SPagination({ total, perPage, currentPageNumber, handlePageClick }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination >
      {pageNumbers.map((number) => (
        <Pagination.Item key={number} active={number === currentPageNumber} onClick={() => handlePageClick(number)}>
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}

export default SPagination;
