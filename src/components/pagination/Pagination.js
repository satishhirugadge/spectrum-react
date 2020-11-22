

function Pagination({ total, perPage, handlePageClick }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <button key={number} href='!#' onClick={() => handlePageClick(number)}>
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
